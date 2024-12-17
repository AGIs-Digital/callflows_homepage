"use client";

const testimonials = [
  {
    quote: "Callflows hat unsere Outbound-Kommunikation revolutioniert. Die KI-gestützten Anrufe sind beeindruckend natürlich.",
    author: "Maria Schmidt",
    role: "Head of Sales, TechCorp GmbH"
  },
  {
    quote: "Die Implementierung war schnell und unkompliziert. Der Support ist erstklassig und immer hilfsbereit.",
    author: "Thomas Weber",
    role: "Operations Manager, Digital Solutions AG"
  },
  {
    quote: "Mit Callflows konnten wir unsere Effizienz um 300% steigern. Ein echter Game-Changer für unser Unternehmen.",
    author: "Laura Meyer",
    role: "CEO, Innovation Labs"
  }
];

export function PricingTestimonials() {
  return (
    <div className="py-24 border-t">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">
          Was unsere Kunden sagen
        </h2>
        <p className="text-muted-foreground">
          Erfahren Sie, wie Callflows Unternehmen dabei hilft, ihre Kommunikation zu optimieren
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-8 rounded-xl bg-background border border-border"
          >
            <blockquote className="text-lg text-foreground mb-6">
              "{testimonial.quote}"
            </blockquote>
            <div>
              <cite className="font-semibold text-foreground not-italic">
                {testimonial.author}
              </cite>
              <p className="text-muted-foreground text-sm mt-1">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}