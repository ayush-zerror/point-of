import ForgotPasswordForm from "@/components/brand-partners/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password",
  description: "Reset your Point Of brand partner account password.",
  keywords: ["Point Of", "Brand partners", "Forgot password", "Reset password"],
  alternates: { canonical: "/brand-partners/forgot-password" },
};

const ForgotPasswordPage = () => {
  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
