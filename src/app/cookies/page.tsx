import type { Metadata } from "next";
import DocPage from "@/components/site/DocPage";

export const metadata: Metadata = {
  title: "Cookie Policy · PraiseLoop",
  description: "How PraiseLoop uses cookies and similar technologies on its website, and how to control them.",
};

export default function CookiesPage() {
  return (
    <DocPage
      eyebrow="Legal"
      title="PraiseLoop Cookie Policy"
      meta="Effective Date: April 1st, 2026"
      sections={[
        {
          h: "1. Introduction",
          body: <p>This Cookie Policy explains how PraiseLoop (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are, why we use them, and your rights to control their use.</p>,
        },
        {
          h: "2. What Are Cookies",
          body: <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>,
        },
        {
          h: "3. Types of Cookies We Use",
          body: (
            <>
              <h3>3.1 Essential Cookies</h3>
              <p>These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions.</p>
              <h3>3.2 Performance and Analytics Cookies</h3>
              <p>These cookies are used to collect information about traffic to our website and how users use our website. The information gathered does not identify any individual visitor.</p>
              <h3>3.3 Functional Cookies</h3>
              <p>These cookies allow our website to remember choices you make when you use our website, such as remembering your preferences.</p>
              <h3>3.4 Marketing and Advertising Cookies</h3>
              <p>These cookies are used to make advertising messages more relevant to you and measure campaign performance.</p>
            </>
          ),
        },
        {
          h: "4. Third-Party Cookies",
          body: <p>We may use third-party cookies from providers such as Google, Meta, LinkedIn, and YouTube to analyse usage and deliver advertising.</p>,
        },
        {
          h: "5. Your Choices Regarding Cookies",
          body: <p>You have the right to decide whether to accept or reject cookies. You can manage preferences through our cookie banner or browser settings.</p>,
        },
        {
          h: "6. Data Protection",
          body: <p>Any personal data collected through cookies is processed in accordance with our Privacy Policy.</p>,
        },
        {
          h: "7. Changes to This Cookie Policy",
          body: <p>We may update this Cookie Policy from time to time. Changes will be posted on this page.</p>,
        },
        {
          h: "8. Contact Information",
          body: <p>For any questions, contact: <a href="mailto:support@praiseloop.com">support@praiseloop.com</a></p>,
        },
      ]}
    />
  );
}
