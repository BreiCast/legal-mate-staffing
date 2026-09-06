import { faqs } from "@/content/company";
import { Section, SectionHeading } from "@/components/ui/Primitives";

export function FAQ({ items = faqs }: { items?: typeof faqs }) {
  return (
    <Section className="faq-section">
      <div className="faq-layout">
        <SectionHeading
          eyebrow="A few good questions"
          title={
            <>
              Clarity before
              <br />
              <em>you commit.</em>
            </>
          }
        />
        <div className="faq-list">
          {items.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
