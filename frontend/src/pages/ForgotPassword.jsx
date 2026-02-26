import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import "./Login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    // TEMP simulation
    alert(
      "If this email exists, a password reset link will be sent."
    );
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Forgot Password</h2>
      <p className="login-subtitle">
        Enter your registered email to reset password
      </p>

      <div className="login-field">
        <label>Email</label>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button className="login-btn" onClick={handleReset}>
        Send Reset Link
      </Button>
    </div>
  );
};

export default ForgotPassword;
