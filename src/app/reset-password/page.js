import ResetPasswordForm from "@/components/brand-partners/ResetPasswordForm";

export const metadata = {
  title: "Reset Password",
  description: "Choose a new password for your Point Of brand partner account.",
  alternates: { canonical: "/reset-password" },
};

const ResetPasswordPage = () => {
  return <ResetPasswordForm />;
};

export default ResetPasswordPage;
