import { DevelopedBy } from "@/data/brand";
import Link from "next/link";

export default function CopyRigtBar() {
  return (
    <div className="text-center py-4 text-xs flex flex-col-reverse gap-3 md:flex-row justify-between text-[var(--main-text-light)]">
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <Link href={DevelopedBy.url} target="_blank" rel="noreferrer">
          Designed by {DevelopedBy.name}
        </Link>
      </p>
      <div>
        <Link href="/privacy" target="_blank" rel="noreferrer">
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link href="/terms-conditions" target="_blank" rel="noreferrer">
          Terms and Conditions
        </Link>
      </div>
    </div>
  );
}
