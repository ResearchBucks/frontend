import { BrandType } from "@/data/brand";
import { IMenueItem } from "@/types/navigation";
import CopyRigtBar from "./copyright-bar";
import Container from "../container";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

export default function Footer({
  footerRoutes,
  brand,
}: Readonly<{ footerRoutes: IMenueItem[]; brand: BrandType }>) {
  return (
    <footer className="border-t-2 py-3">
      <Container>
        <div className="flex flex-col-reverse md:flex-row justify-between items-center md:items-start">
          <div className="mb-4 md:mb-0">
            <Link href="/">
              <Image
                src={brand.logo}
                alt={`${brand.name} Logo`}
                width={150}
                height={150}
              />
            </Link>
            <div className="flex flex-col gap-2 items-center md:items-start">
              <p>Follow us on</p>
              <div className="flex gap-3">
                <Link href={brand.socialmedia.facebook}>
                  <Facebook />
                </Link>
                <Link href={brand.socialmedia.instagram}>
                  <Instagram />
                </Link>
              </div>
            </div>
          </div>
          {/* <nav className="flex flex-col md:flex-row gap-4 md:gap-20 text-center md:text-left">
            {footerRoutes.map((menu) => (
              <div key={"groupTitle" in menu ? menu.groupTitle : menu.title}>
                {"items" in menu ? (
                  <div>
                    <h4 className="font-semibold">{menu.groupTitle}</h4>
                    <ul className="space-y-2">
                      {menu.items.map((item) => (
                        <li key={item.title}>
                          <Link href={item.href}>{item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link href={menu.href}>{menu.title}</Link>
                )}
              </div>
            ))}
          </nav> */}
        </div>
        <CopyRigtBar />
      </Container>
    </footer>
  );
}
