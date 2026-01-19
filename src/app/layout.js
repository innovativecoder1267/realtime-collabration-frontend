import "./global.css";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Providers } from "./provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "My App",
  description: "Collab platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white font-sans">
        <Providers>
        
          <GoogleOAuthProvider clientId="276718146617-ivj3e90nts8p9c4u00d0l59qb8mfrtso.apps.googleusercontent.com">
          
            {children}
          </GoogleOAuthProvider>
        
        </Providers>
      </body>
    </html>
  );
}
