import LoginContend from "../LoginContend";
import Auth from "./Auth";

export const Login = () => {
  return (
    <Auth
      title='Log in to your account'
      tag='Welcome back! Please enter your details.'
    >
      <LoginContend />
    </Auth>
  );
};
