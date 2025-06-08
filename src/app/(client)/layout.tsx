import Header from "@/components/landing/header";
import Footer from "@/components/layout/footer/footer";
import NavBar from "@/components/layout/navbar/navbar";
import { Toaster } from "@/components/ui/sonner";
import { BRAND } from "@/data/brand";
import { useNavRoutes } from "@/hooks/use-nav-routes";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { navBarRoutes, footerRoutes } = useNavRoutes();

  return (
    <div>
      {/* <NavBar navBarRoutes={navBarRoutes} brand={BRAND} /> */}
      <Toaster richColors />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer footerRoutes={footerRoutes} brand={BRAND} />
    </div>
  );
}
