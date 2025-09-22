import RegisterContent from "../RegisterContent";
import Auth from "./Auth";

export const Register = () => {
  return (
    <Auth
      title='Create an account'
      tag='Sign up 100% free, no credit card required.'
    >
      <RegisterContent />
    </Auth>
  );
};
