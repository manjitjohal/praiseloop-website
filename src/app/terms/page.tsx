import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service — PraiseLoop",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-3xl font-bold text-text-primary">Terms of Service</h1>
        <p className="mt-4 text-text-secondary">Coming soon.</p>
      </main>
      <Footer />
    </>
  );
}
