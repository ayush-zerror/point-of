import { redirect } from "next/navigation";

export const metadata = {
  title: "Partner Login",
  alternates: { canonical: "/login" },
};

const BrandPartnersLoginRedirect = () => {
  redirect("/login");
};

export default BrandPartnersLoginRedirect;
