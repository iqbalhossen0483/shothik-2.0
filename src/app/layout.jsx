
import Analytics from "../analysers/Analytics";
import { LoginModal, RegisterModal } from "../components/auth/AuthModal";
import { Login } from "../components/auth/components/Login";
import { Register } from "../components/auth/components/Register";
import Providers from "../config/Providers";

export const metadata = {
  title: "Shothik AI",
  description:
    "Shothik AI: Paraphrase, humanize, detect AI & translate text to bypass Turnitin & GPTZero. Get a 100% human score & better writing for students, academics & SEOs.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          {children}
          {/* login modal  */}
          <LoginModal>
            <Login />
          </LoginModal>
          <RegisterModal>
            <Register />
          </RegisterModal>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
