import Container from "@/components/layout/container";
import { BRAND } from "@/data/brand";

export default function PrivacyPolicy() {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Introduction
          </h2>
          <p>
            Welcome to {BRAND.name}&apos;s Privacy Policy. This Privacy Policy
            describes how we collect, use, and handle your personal information
            when you use our {BRAND.productName}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Information We Collect
          </h2>
          <p>When you use {BRAND.productName}, we may collect:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Personal identification information (Name, email address)</li>
            <li>Usage data and analytics</li>
            <li>Device and browser information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            How We Use Your Information
          </h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Provide and maintain our service</li>
            <li>Notify you about changes to our service</li>
            <li>Provide customer support</li>
            <li>Monitor the usage of our service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Data Security
          </h2>
          <p>
            The security of your data is important to us. We implement
            appropriate security measures to protect your personal information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:{" "}
            <a
              href={`mailto:${BRAND.contactMail}`}
              className="text-primary hover:underline"
            >
              {BRAND.contactMail}
            </a>
          </p>
        </section>

        <footer className="pt-8 text-sm">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </footer>
      </div>
    </Container>
  );
}
