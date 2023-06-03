import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const navigate = useNavigate();
  const newPassInputRef = useRef();
  const newPassInputConfirmationRef = useRef();
  const authCtx = useContext(AuthContext);
  const guestUserId = "Sa7cCtzmBlTKHF2XMvo8YMWDa6B3";

  const [error, setError] = useState(false);
  let errorMessage = "Make sure your password is correct!";

  const removeErrorHandler = () => {
    setError(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPass = newPassInputRef.current.value;
    const enteredNewPassConfirmation =
      newPassInputConfirmationRef.current.value;

    if (enteredNewPass !== enteredNewPassConfirmation) {
      setError(true);
    } else {
      if (guestUserId === authCtx.localId) {
        alert("Unfortunately as a guest, you cannot change the password");
        navigate("/");
      } else {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAB7hPxJvzNlVlWeymHKTFPq3_a-_OGL88",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: authCtx.token,
              password: enteredNewPass,
              returnSecureToken: false,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            if (res.ok) {
              navigate("/");
              return res.json();
            } else {
              return res.json().then((data) => {
                let messageError = "Resseting failed!";
                console.log(data);
                if (data && data.error && data.error.message) {
                  messageError = data.error.message;
                }
                throw new Error(messageError);
              });
            }
          })
          .catch((err) => {
            alert(err);
          });
      }
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={newPassInputRef}
          onChange={removeErrorHandler}
        />
        <label htmlFor="confirm-new-password">Confirm new password</label>
        <input
          type="password"
          id="confirm-new-password"
          ref={newPassInputConfirmationRef}
          onChange={removeErrorHandler}
        ></input>
        {error && <p className="error">{errorMessage}</p>}
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
