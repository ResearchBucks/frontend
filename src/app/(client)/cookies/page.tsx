import Container from "@/components/layout/container";
import { BRAND } from "@/data/brand";

export default function CookiePolicy() {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            What Are Cookies
          </h2>
          <p>
            Cookies are small text files that are stored on your computer or
            mobile device when you visit {BRAND.name}&apos;s website. They help
            us make your experience better by remembering your preferences and
            how you use our site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            How We Use Cookies
          </h2>
          <p>We use cookies for the following purposes:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Essential cookies - Required for the website to function properly
            </li>
            <li>Authentication cookies - Remember your login status</li>
            <li>Preference cookies - Remember your settings and choices</li>
            <li>
              Analytics cookies - Help us understand how visitors use our
              website
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Types of Cookies We Use
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-foreground">Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function and
                cannot be switched off.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">
                Performance Cookies
              </h3>
              <p>
                These cookies allow us to count visits and traffic sources to
                measure and improve site performance.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">
                Functional Cookies
              </h3>
              <p>
                These cookies enable enhanced functionality and personalization.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Managing Cookies
          </h2>
          <p>
            Most web browsers allow you to control cookies through their
            settings preferences. However, limiting cookies may affect the
            functionality of our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Your Consent
          </h2>
          <p>
            By using {BRAND.productName}, you consent to the use of cookies in
            accordance with this Cookie Policy. You can withdraw your consent at
            any time by adjusting your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Contact Us
          </h2>
          <p>
            If you have questions about our Cookie Policy, please contact us at:{" "}
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
        </footer>
      </div>
    </Container>
  );
}
