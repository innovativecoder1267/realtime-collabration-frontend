"use client";
import { useEffect, useRef } from "react";

export default function StepFeatures() {
  const cardsRef = useRef([]);

  const steps = [
    {
      num: "01",
      icon: "👤",
      title: "Create your workspace",
      desc: "Sign up in seconds and set up a shared workspace for your team to collaborate in real time.",
      gradient: "from-purple-500 to-pink-400",
      line: "bg-purple-500",
    },
    {
      num: "02",
      icon: "✏️",
      title: "Start collaborating",
      desc: "Create a whiteboard, invite your team, and see every update appear instantly for all participants.",
      gradient: "from-blue-500 to-cyan-400",
      line: "bg-blue-500",
    },
    {
      num: "03",
      icon: "🔗",
      title: "Share and communicate",
      desc: "Comment, mention teammates, and chat directly on the board to keep everyone aligned.",
      gradient: "from-green-500 to-emerald-400",
      line: "bg-green-500",
    },
    {
      num: "04",
      icon: "🚀",
      title: "Ship faster together",
      desc: "Turn ideas into action faster with tools designed for smooth and focused teamwork.",
      gradient: "from-orange-500 to-red-400",
      line: "bg-red-500",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-card");
          }
        });
      },
      { threshold: 0.3 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="
              opacity-0 translate-y-10 transition-all duration-[900ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              relative bg-white border border-gray-100 rounded-3xl 
              p-9 shadow-md hover:shadow-xl
            "
          >
            {/* Step number */}
            <div
              className={`
                absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 
                rounded-full text-white flex items-center justify-center 
                text-sm font-semibold shadow-lg 
                bg-gradient-to-br ${step.gradient}
              `}
            >
              {step.num}
            </div>

            {/* Icon */}
            <div
              className={`
                w-14 h-14 rounded-2xl flex items-center justify-center 
                text-2xl mb-6 shadow-md text-white 
                bg-gradient-to-br ${step.gradient}
              `}
            >
              {step.icon}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {step.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {step.desc}
            </p>

            {/* Progress indicator */}
            <div className="flex gap-2">
              <div className={`h-1 w-8 rounded-full ${step.line}`} />
              <div className="h-1 w-8 rounded-full bg-gray-200" />
              <div className="h-1 w-8 rounded-full bg-gray-200" />
              <div className="h-1 w-8 rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .show-card {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}
