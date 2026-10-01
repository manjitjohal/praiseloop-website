import type { Metadata } from "next";
import Link from "next/link";
import DocPage from "@/components/site/DocPage";

// Placeholder until the full policy is ready: kept out of search results until then.
export const metadata: Metadata = {
  title: "Privacy Policy · PraiseLoop",
  description: "How PraiseLoop handles personal data on this website.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <DocPage
      eyebrow="Legal"
      title="PraiseLoop Privacy Policy"
      note={<>Our full privacy policy is being finalised and will be published on this page. Until then, here is what this website collects and why.</>}
      sections={[
        {
          h: "What we collect",
          body: (
            <ul>
              <li><strong>Details you send us.</strong> When you book a demo, request a business case from the ROI calculator or ask for the sales coaching playbook, we receive what you enter, such as your name, work email, company and role.</li>
              <li><strong>How the site is used.</strong> We use Google Analytics, Google Tag Manager and PostHog to understand how visitors use the site. See our <Link href="/cookies">Cookie Policy</Link>.</li>
            </ul>
          ),
        },
        {
          h: "Why we use it",
          body: <p>To reply to you, to send you what you asked for, and to improve the website.</p>,
        },
        {
          h: "Your rights and contact",
          body: <p>To ask what we hold about you, or to have it corrected or deleted, contact <a href="mailto:support@praiseloop.com">support@praiseloop.com</a>.</p>,
        },
      ]}
    />
  );
}
