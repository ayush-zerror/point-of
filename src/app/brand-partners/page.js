import RegisterForm from "@/components/brand-partners/RegisterForm";

export const metadata = {
  title: "Brand Partners",
  description:
    "Create a Point Of brand partner account to access partner resources and updates.",
  keywords: [
    "Point Of",
    "Brand partners",
    "Partner registration",
    "Design studio",
    "Mumbai",
  ],
  alternates: { canonical: "/brand-partners" },
};

const BrandPartnersRegisterPage = () => {
  return <RegisterForm />;
};

export default BrandPartnersRegisterPage;
