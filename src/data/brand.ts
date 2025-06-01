export const BRAND = {
  name: "ABC Brand",
  productName: "ABC Template",
  contactMail: "support@abc.example.com",
  url: "http://www.abc.example.com",
  productDescription: "A Next.js template for ABC Company",
  socialmedia: {
    facebook: "https://www.facebook.com/abc",
    twitter: "https://www.twitter.com/abc",
    linkedin: "https://www.linkedin.com/abc",
    instagram: "https://www.instagram.com/abc",
  },
  logo: "https://lh3.googleusercontent.com/d_S5gxu_S1P6NR1gXeMthZeBzkrQMHdI5uvXrpn3nfJuXpCjlqhLQKH_hbOxTHxFhp5WugVOEcl4WDrv9rmKBDOMExhKU5KmmLFQVg",
  mobilelogo:
    "https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA", //optional
} as const;

export const DevelopedBy = {
  name: "ResearchBucks",
  url: "/",
  logo: "https://www.iamdeveloper.com/images/logo.svg",
} as const;

export type BrandType = typeof BRAND;
export type DevelopedByType = typeof DevelopedBy;
