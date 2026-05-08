import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog — PraiseLoop",
  description: "Insights on employee recognition, HR strategy, and company culture.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-32 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text-primary">Blog</h1>
          <p className="mt-4 text-text-secondary">Coming soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
