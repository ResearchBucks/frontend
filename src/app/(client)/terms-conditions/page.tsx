import Container from "@/components/layout/container";
import { BRAND } from "@/data/brand";

export default function TermsAndConditions() {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Welcome to {BRAND.name}
          </h2>
          <p>
            These terms and conditions outline the rules and regulations for the use
            of {BRAND.name}&apos;s Website, located at {BRAND.url}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Acceptance of Terms
          </h2>
          <p>
            By accessing this website, you accept these terms and conditions in
            full. Do not continue to use {BRAND.productName} if you do not accept
            all of the terms and conditions stated on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">License</h2>
          <p>
            Unless otherwise stated, {BRAND.name} and/or its licensors own the
            intellectual property rights for all material on {BRAND.productName}.
            All intellectual property rights are reserved.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            User Account
          </h2>
          <p>If you create an account on our website, you are responsible for:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Maintaining the confidentiality of your account</li>
            <li>All activities that occur under your account</li>
            <li>
              Ensuring your account information is accurate and up-to-date
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Limitations
          </h2>
          <p>
            In no event shall {BRAND.name} be liable for any damages arising out of
            the use or inability to use the materials on {BRAND.productName}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Content Updates
          </h2>
          <p>
            We reserve the right to modify or replace these terms at any time. By
            continuing to access or use our Service after any revisions become
            effective, you agree to be bound by the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Contact Information
          </h2>
          <p>
            If you have any questions about these Terms, please contact us at:{" "}
            <a
              href={`mailto:${BRAND.contactMail}`}
              className="text-primary hover:underline"
            >
              {BRAND.contactMail}
            </a>
          </p>
        </section>

        <footer className="pt-8 text-sm border-t">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </footer>
      </div>
    </Container>
  );
}