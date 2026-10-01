import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";

export type DocSection = { h: string; body: React.ReactNode };

/** Long-form page shell (legal pages): shared chrome around a readable column. */
export default function DocPage({
  eyebrow, title, meta, note, sections,
}: { eyebrow: string; title: string; meta?: string; note?: React.ReactNode; sections: DocSection[] }) {
  return (
    <div className="plh">
      <SiteHeader />
      <main className="doc">
        <div className="container doc-inner">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          {meta && <p className="doc-meta">{meta}</p>}
          {note && <p className="doc-note">{note}</p>}
          <div className="doc-body">
            {sections.map((s) => (
              <section key={s.h} style={{ padding: 0 }}>
                <h2>{s.h}</h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
