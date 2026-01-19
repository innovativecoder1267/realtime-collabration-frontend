// "use client";
// import { useRef } from "react";

// export default function FeatureCards() {
//   const cardRefs = useRef([]);

//   // Parallax tilt effect (Apple style)
//   const handleMouseMove = (e, index) => {
//     const card = cardRefs.current[index];
//     const rect = card.getBoundingClientRect();

//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const centerX = rect.width / 2;
//     const centerY = rect.height / 2;

//     const rotateX = ((y - centerY) / 20) * -1;
//     const rotateY = (x - centerX) / 20;

//     card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
//   };

//   const resetTilt = (index) => {
//     const card = cardRefs.current[index];
//     card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
//   };

//   const features = [
//     {
//       title: "Lightning Fast Sync",
//       text: "Instant updates across all devices with sub-100ms latency.",
//       icon: "⚡",
//     },
//     {
//       title: "Live Presence & Cursors",
//       text: "See teammates' live cursor positions in real time.",
//       icon: "👆",
//     },
//     {
//       title: "Built-in Communication",
//       text: "Chat, voice integrated directly into your workspace.",
//       icon: "💬",
//     },
//     {
//       title: "Version Control",
//       text: "Automatic versioning and time travel for safe editing.",
//       icon: "📁",
//     },
//     {
//       title: "Enterprise Security",
//       text: "Bank-grade encryption with full compliance.",
//       icon: "🔒",
//     },
//     {
//       title: "Global Infrastructure",
//       text: "Worldwide distributed network for lowest latency everywhere.",
//       icon: "🌐",
//     },
//   ];

//   return (
//     <section className="py-28 bg-white">
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

//         {features.map((f, i) => (
//           <div
//             key={i}
//             ref={(el) => (cardRefs.current[i] = el)}
//             onMouseMove={(e) => handleMouseMove(e, i)}
//             onMouseLeave={() => resetTilt(i)}
//             className="
//               bg-gradient-to-br from-[#f5f3ff]/60 to-[#faf9ff]/50 
//               backdrop-blur-xl
//               border border-white/50
//               rounded-3xl p-10
//               transition-all duration-300
//               shadow-[0_15px_45px_rgba(0,0,0,0.06)]
//               hover:shadow-[0_20px_55px_rgba(0,0,0,0.10)]
//               cursor-pointer
//               transform-gpu
//               relative
//             "
//           >
//             {/* Glow effect behind icon */}
//             <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-purple-400/30 blur-3xl"></div>

//             {/* ICON */}
//             <div
//               className="w-16 h-16 rounded-2xl flex items-center justify-center 
//                          text-white text-4xl shadow-lg mb-6"
//               style={{
//                 background: "linear-gradient(135deg, #7c3aed, #6366f1)",
//               }}
//             >
//               {f.icon}
//             </div>

//             {/* TITLE */}
//             <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
//               {f.title}
//             </h3>

//             {/* SUBTEXT */}
//             <p className="text-gray-600 mt-3 text-[15px] leading-relaxed">
//               {f.text}
//             </p>
//           </div>
//         ))}

//       </div>
//     </section>
//   );
// }
"use client";
import { useRef } from "react";

export default function FeatureCards() {
  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / 35) * -1;
    const rotateY = (x - centerX) / 35;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const resetTilt = (index) => {
    const card = cardRefs.current[index];
    if (card) {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  const features = [
    { title: "Lightning Fast Sync", text: "Instant updates across all devices with sub-100ms latency.", icon: "⚡" },
    { title: "Live Presence & Cursors", text: "See teammates' live cursor positions in real time.", icon: "👆" },
    { title: "Built-in Communication", text: "Chat and comments integrated directly into your workspace.", icon: "💬" },
    { title: "Version Control", text: "Automatic versioning and time travel for safe editing.", icon: "📁" },
    { title: "Enterprise Security", text: "Bank-grade encryption with enterprise-level compliance.", icon: "🔒" },
    { title: "Global Infrastructure", text: "Worldwide distributed network for ultra-low latency.", icon: "🌐" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((f, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => resetTilt(i)}
            className="
              relative rounded-3xl p-9
              bg-gradient-to-br from-white to-[#f7f7ff]
              border border-gray-200/60
              shadow-[0_12px_40px_rgba(0,0,0,0.06)]
              hover:shadow-[0_18px_55px_rgba(0,0,0,0.10)]
              transition-transform duration-300
              transform-gpu
            "
          >
            {/* Subtle glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 to-indigo-500/5 pointer-events-none" />

            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center 
                         text-white text-3xl shadow-md mb-6"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #6366f1)",
              }}
            >
              {f.icon}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
              {f.title}
            </h3>

            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              {f.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
