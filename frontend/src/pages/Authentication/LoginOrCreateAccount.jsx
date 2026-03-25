// import { useEffect } from "react";

// import { completeMagicLinkLogin} from "../../firebaseconfigurations/firebaseClient";
// function LoginOrCreateAccount() {

//   useEffect(() => {
//     const handleLogin = async () => {
//       try {
//         await completeMagicLinkLogin();
//         setStatus("Login successful! Redirecting to dashboard...");
        
//         setTimeout(() => {
//           navigate("/dashboard");   // Change to your home/dashboard route
//         }, 1500);
//       } catch (err) {
//         setStatus("Login failed. Please try again.");
//         console.error(err);
//       }
//     };

//     handleLogin();
//   }, [navigate]);
// }

// export default LoginOrCreateAccount;
