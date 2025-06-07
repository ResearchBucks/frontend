import { footerLogo } from "@/assests/assests";

export const BRAND = {
  name: "ResearchBucks",
  productName: "ResearchBucks",
  contactMail: "support@abc.example.com",
  url: "http://www.abc.example.com",
  productDescription: "ResearchBucks",
  socialmedia: {
    facebook: "https://www.facebook.com/abc",
    twitter: "https://www.twitter.com/abc",
    linkedin: "https://www.linkedin.com/abc",
    instagram: "https://www.instagram.com/abc",
  },
  logo: footerLogo,
  mobilelogo: footerLogo, //optional
} as const;

export const DevelopedBy = {
  name: "ResearchBucks",
  url: "/",
  logo: "https://www.iamdeveloper.com/images/logo.svg",
} as const;

export type BrandType = typeof BRAND;
export type DevelopedByType = typeof DevelopedBy;
