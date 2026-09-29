import LoginForm from "@/components/brand-partners/LoginForm";

export const metadata = {
  title: "Partner Login",
  description: "Sign in to your Point Of brand partner account.",
  keywords: [
    "Point Of",
    "Brand partners",
    "Partner login",
    "Design studio",
    "Mumbai",
  ],
  alternates: { canonical: "/login" },
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
