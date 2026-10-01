import type { Metadata } from "next";
import DocPage from "@/components/site/DocPage";

export const metadata: Metadata = {
  title: "Terms and Conditions · PraiseLoop",
  description: "The terms that govern your use of the PraiseLoop platform and services.",
};

export default function TermsPage() {
  return (
    <DocPage
      eyebrow="Legal"
      title="PraiseLoop Terms and Conditions"
      meta="Effective Date: April 1st, 2026"
      sections={[
        { h: "1. Introduction", body: <p>These Terms and Conditions govern your use of the PraiseLoop platform and services. By accessing or using the platform, you agree to be bound by these Terms.</p> },
        {
          h: "2. Definitions",
          body: (
            <ul>
              <li>&ldquo;Platform&rdquo; refers to the PraiseLoop application.</li>
              <li>&ldquo;User&rdquo; refers to any individual accessing the platform.</li>
              <li>&ldquo;Customer&rdquo; refers to the organisation subscribing to PraiseLoop services.</li>
            </ul>
          ),
        },
        { h: "3. Use of Services", body: <p>Users agree to use the platform in compliance with all applicable laws and not to misuse the services or attempt to gain unauthorized access.</p> },
        { h: "4. Account Registration", body: <p>Users must provide accurate information when creating accounts and are responsible for maintaining the confidentiality of their login credentials.</p> },
        { h: "5. Intellectual Property", body: <p>All content, features, and functionality of the platform are the exclusive property of PraiseLoop and are protected by intellectual property laws.</p> },
        { h: "6. Data Protection", body: <p>PraiseLoop processes personal data in accordance with its Privacy Policy and applicable data protection laws.</p> },
        { h: "7. Payment Terms", body: <p>Customers agree to pay all applicable subscription fees as outlined in their agreement. Fees are non-refundable unless otherwise stated.</p> },
        { h: "8. Limitation of Liability", body: <p>PraiseLoop shall not be liable for any indirect, incidental, or consequential damages arising from the use of the platform.</p> },
        { h: "9. Termination", body: <p>We reserve the right to suspend or terminate access to the platform if users violate these Terms.</p> },
        { h: "10. Changes to Terms", body: <p>We may update these Terms from time to time. Continued use of the platform constitutes acceptance of the updated Terms.</p> },
        { h: "11. Governing Law", body: <p>These Terms shall be governed by and construed in accordance with applicable laws as determined by PraiseLoop.</p> },
        { h: "12. Contact Information", body: <p>For any questions regarding these Terms, contact: <a href="mailto:support@praiseloop.com">support@praiseloop.com</a></p> },
      ]}
    />
  );
}
