import { useEffect } from "react";

import { completeMagicLinkLogin } from "../../firebaseconfigurations/config";

function LoginOrCreateAccount() {

  useEffect(() => {
    completeMagicLinkLogin();
  }, []);

  return <h2>Logging in...</h2>;
}

export default LoginOrCreateAccount;
