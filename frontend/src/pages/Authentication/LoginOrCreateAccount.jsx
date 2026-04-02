import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { completeMagicLinkLogin } from "../../firebaseconfigurations/firebaseClient";
import { isSignInWithEmailLink } from "firebase/auth";
import { auth } from "../../firebaseconfigurations/firebaseClient";

function LoginOrCreateAccount() {

  const navigate = useNavigate();
  const [status, setStatus] = useState("Checking login...");

 useEffect(() => {

  const handleLogin = async () => {

   
    const isMagicLink = isSignInWithEmailLink(auth, window.location.href);

    if (!isMagicLink) {
      setStatus("Waiting for magic link...");
      return;
    }

    const success = await completeMagicLinkLogin();

    if (success) {
      setStatus("Login successful! Redirecting to dashboard...");

      navigate("/dashboard"); 
    } else {
      setStatus("Login failed. Please try again.");
    }
  };

  handleLogin();

}, [navigate]);

  return (
    <div className="text-blue-600">
      <h2>{status}</h2>
    </div>
  );
}

export default LoginOrCreateAccount;