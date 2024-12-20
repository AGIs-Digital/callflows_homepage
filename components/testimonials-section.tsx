"use client";

const testimonials = [
  {
    quote: "Mit der Enterprise Suite konnten wir unsere gesamte Kommunikation revolutionieren. Die KI-gestützte Lösung übertraf alle Erwartungen.",
    author: "Dr. Thomas Müller",
    role: "CTO, Innovation Labs GmbH",
    metric: "65%",
    metricLabel: "Kosteneinsparung"
  },
  {
    quote: "Die Integration war überraschend einfach und der Support ist erstklassig. Unsere Kunden sind begeistert von der Erreichbarkeit.",
    author: "Sarah Schmidt",
    role: "Head of Customer Service, Digital Solutions AG",
    metric: "24/7",
    metricLabel: "Erreichbarkeit"
  },
  {
    quote: "Als Enterprise-Kunde schätzen wir besonders die maßgeschneiderten KI-Modelle und den erstklassigen Support. Ein echter Game-Changer.",
    author: "Michael Weber",
    role: "COO, TechCorp GmbH",
    metric: "300%",
    metricLabel: "Effizienzsteigerung"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#DEF0F2] dark:bg-[#DEF0F2]/5">
      <div className="container">
        <div className="text-center mb-16 section-animate">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Erfahren Sie, wie Callflows Unternehmen dabei hilft, ihre Ziele zu erreichen
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-background rounded-xl p-8 border border-border 
                         transition-all duration-300 ease-out 
                         hover:-translate-y-2 hover:shadow-lg hover:border-primary/20"
            >
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary mb-2
                                transition-all duration-300">
                  {testimonial.metric}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.metricLabel}
                </div>
              </div>
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
    </section>
  );
}