import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { completeMagicLinkLogin } from "../../firebaseconfigurations/firebaseClient";

function LoginOrCreateAccount() {

  const navigate = useNavigate();
  const [status, setStatus] = useState("Checking login...");

  useEffect(() => {

    const handleLogin = async () => {

      const success = await completeMagicLinkLogin();

      if (success) {

        setStatus("Login successful! Redirecting to dashboard...");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);

      } else {

        setStatus("Waiting for magic link...");

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
