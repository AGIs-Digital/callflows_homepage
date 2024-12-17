"use client";

import { pricingTestimonials } from "@/lib/pricing-data";

export function PricingTestimonials() {
  return (
    <div className="py-24 border-t">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">
          Was unsere Kunden sagen
        </h2>
        <p className="text-muted-foreground">
          Erfahren Sie, wie Callflows Unternehmen dabei hilft, ihre Ziele zu erreichen
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {pricingTestimonials.map((testimonial) => (
          <div
            key={testimonial.author}
            className="bg-secondary/20 dark:bg-secondary/10 rounded-xl p-6"
          >
            <div className="mb-6">
              <div className="text-4xl font-bold text-primary mb-2">
                {testimonial.metric}
              </div>
              <div className="text-sm text-muted-foreground">
                {testimonial.metricLabel}
              </div>
            </div>
            
            <blockquote className="text-sm mb-6">
              "{testimonial.quote}"
            </blockquote>
            
            <div>
              <div className="font-medium">{testimonial.author}</div>
              <div className="text-sm text-muted-foreground">
                {testimonial.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}