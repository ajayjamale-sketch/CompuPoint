import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/constants";
import { cn } from "@/lib/utils";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));

  const visible = [
    TESTIMONIALS[activeIndex],
    TESTIMONIALS[(activeIndex + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(activeIndex + 2) % TESTIMONIALS.length],
  ];

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="label-badge mb-4 inline-flex">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>Student Success Stories</span>
          </div>
          <h2 className="section-heading mb-4">
            Trusted by Thousands of
            <br />
            <span className="gradient-text">IT Professionals</span>
          </h2>
          <p className="section-subheading">
            Join the growing community of students, professionals, and businesses who have transformed their IT journey with CompuPoint.
          </p>
        </div>

        {/* Overall Rating */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-5xl font-heading font-bold text-slate-900 dark:text-white">4.9</div>
            <div className="flex items-center justify-center gap-0.5 my-1">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Overall Rating</p>
          </div>
          <div className="h-12 w-px bg-border hidden sm:block" />
          <div className="text-center">
            <div className="text-5xl font-heading font-bold text-slate-900 dark:text-white">12K+</div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Total Reviews</p>
          </div>
          <div className="h-12 w-px bg-border hidden sm:block" />
          <div className="text-center">
            <div className="text-5xl font-heading font-bold text-slate-900 dark:text-white">96%</div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Would Recommend</p>
          </div>
        </div>

        {/* Testimonials Grid - Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-8">
          {TESTIMONIALS.slice(0, 3).map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
        <div className="hidden md:grid grid-cols-3 gap-6">
          {TESTIMONIALS.slice(3, 6).map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>

        {/* Testimonials Carousel - Mobile */}
        <div className="md:hidden">
          <div className="space-y-4">
            {visible.slice(0, 1).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === activeIndex ? "bg-primary-600 w-6" : "bg-slate-300 dark:bg-slate-600 w-2"
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  return (
    <div className="card-base p-6 flex flex-col h-full hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex">
          {[1,2,3,4,5].map((s) => (
            <Star
              key={s}
              className={cn(
                "w-4 h-4",
                s <= testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200 dark:text-slate-600"
              )}
            />
          ))}
        </div>
        <Quote className="w-8 h-8 text-primary-100 dark:text-primary-900/50" />
      </div>
      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6 flex-1">
        "{testimonial.content}"
      </p>
      {testimonial.course && (
        <div className="tag mb-4 w-fit">
          <span>{testimonial.course}</span>
        </div>
      )}
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role} · {testimonial.company}</p>
        </div>
      </div>
    </div>
  );
}
