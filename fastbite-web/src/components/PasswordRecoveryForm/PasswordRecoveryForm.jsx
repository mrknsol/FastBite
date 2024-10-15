import { useState, useEffect } from "react";
import "./PasswordRecoveryForm.css";

export const PasswordRecoveryForm = ({ onClose, onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendTimeout, setResendTimeout] = useState(0);

  const handleSendCode = () => {
    if (email) {
      setCodeSent(true);
      setErrorMessage("");
      setResendTimeout(60);
    } else {
      setErrorMessage("Please enter a valid email.");
    }
  };

  const handleBack = () => {
    setCodeSent(false);
    setRecoveryCode(["", "", "", ""]);
    setResendTimeout(0);
  };

  const handleCodeChange = (index, value) => {
    let updatedCode = [...recoveryCode];
    updatedCode[index] = value.slice(0, 1);
    setRecoveryCode(updatedCode);

    if (value && index < recoveryCode.length - 1) {
      document.querySelector(`#code-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && recoveryCode[index] === "" && index > 0) {
      document.querySelector(`#code-input-${index - 1}`).focus();
    }
  };

  const handlePasswordReset = () => {
    if (newPassword === confirmPassword) {
      setSuccessMessage(
        "Your password has been successfully reset. A new password has been sent to your email."
      );
      setErrorMessage("");
    } else {
      setErrorMessage("Passwords do not match.");
    }
  };

  useEffect(() => {
    let timer;
    if (resendTimeout > 0) {
      timer = setInterval(() => {
        setResendTimeout((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimeout]);

  return (
    <div className="password-recovery-container">
      <h2>Recover Password</h2>
      {successMessage ? (
        <div className="s-message">
          <p>{successMessage}</p>
          <div className="button-group">
            <button className="button-group-close" onClick={onClose}>
              Close
            </button>
            <button
              className="button-group-back-to-login"
              onClick={onBackToLogin}
            >
              Back to Login
            </button>
          </div>
        </div>
      ) : (
        <div>
          {codeSent && (
            <button className="back-button" onClick={handleBack}>
              &#8592;
            </button>
          )}
          {!codeSent ? (
            <div>
              <p>Enter your email to receive a recovery code:</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <button className="send-code-button" onClick={handleSendCode}>
                Send Code
              </button>
            </div>
          ) : (
            <>
              <p>
                We have sent a 4-digit code to your email:{" "}
                <strong>{email}</strong>
              </p>
              <div className="recovery-code-inputs">
                {recoveryCode.map((code, index) => (
                  <input
                    key={index}
                    id={`code-input-${index}`}
                    type="text"
                    value={code}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength="1"
                    className="square-input"
                  />
                ))}
              </div>

              <div className="button-group">
                <button onClick={handlePasswordReset}>Confirm</button>
                <button onClick={handleSendCode} disabled={resendTimeout > 0}>
                  Resend Code {resendTimeout > 0 && `(${resendTimeout})`}
                </button>
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
};
