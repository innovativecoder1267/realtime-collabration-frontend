
"use client";
import Link from "next/link";
import LiveSyncBoards from "./components/livesync";
import GiveAccessFeature from "./components/giveaccess";
import FeatureCards from "./components/featurecards";
import StepFeatures from "./components/cards";
import StepsHeader from "./components/steps";
import Footer from "./components/terms";

export default function Landingpage() {
  return (
    <main className="bg-white w-full overflow-x-hidden">
      
      {/* NAVBAR */}
      <header className="w-full border-b border-gray-200">
        <nav className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4 md:px-6">
          <div className="font-bold text-lg md:text-xl text-gray-900">
            Collabs
          </div>

          <div className="hidden md:flex space-x-10 text-gray-600 text-sm font-medium">
            <a href="#">Home</a>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">About</a>
          </div>
<div className="flex items-center gap-6">
  {/* GitHub */}
  <a
    href="https://github.com/USERNAME/REPO_NAME"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-700 hover:text-black transition"
    aria-label="GitHub Repository"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
      0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
      -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
      2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
      0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21
      2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04
      2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82
      1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
      0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8
      c0-4.42-3.58-8-8-8z" />
    </svg>
  </a>

  {/* Login */}
  <Link href="/login" className="text-sm font-semibold">
    Log in →
  </Link>
</div>

          {/* <Link href="/login" className="text-sm font-semibold">
            Log in →
          </Link> */}
        </nav>
      </header>

<section className="relative max-w-7xl mx-auto text-center px-4 pt-20 md:pt-28 overflow-hidden">

  {/* PREMIUM BACKGROUND MESH */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute left-1/2 top-16 -translate-x-1/2 h-[480px] w-[480px] bg-blue-500/20 blur-[160px] rounded-full" />
    <div className="absolute left-1/3 top-52 h-[380px] w-[380px] bg-purple-500/20 blur-[160px] rounded-full" />
  </div>

  {/* MICRO BADGE */}
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur text-sm text-gray-700 shadow-sm">
    ⚡ Built for fast-moving teams
  </div>

  {/* HEADING */}
  <h1 className="mt-5 text-4xl md:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight">
    <span className="text-gray-900">Work Collaboration</span>
    <br />
    <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
      Easy. Fast. Real-time.
    </span>
  </h1>

  {/* SUBTEXT */}
  <p className="mt-5 max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
    A real-time collaborative whiteboard built for modern teams to
    brainstorm, plan, and execute ideas — without friction.
  </p>

  {/* CTA */}
  <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
    <Link
      href="/signup"
      className="group inline-flex items-center gap-2 px-9 py-4 bg-blue-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-2xl transition-all"
    >
      Create New Workspace
      <span className="group-hover:translate-x-1 transition-transform">→</span>
    </Link>

    <button className="px-9 py-4 rounded-xl font-semibold text-sm border border-gray-300 bg-white/80 backdrop-blur hover:border-gray-400 hover:bg-white transition">
      Join with Code
    </button>
  </div>

  {/* TRUST LINE */}
  <p className="mt-3 text-xs text-gray-500">
    No credit card required • Free forever for small teams
  </p>

  {/* HERO IMAGE */}
<div className="relative mx-auto mt-12 w-full max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-4xl">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-3xl rounded-[28px] -z-10" />


<img
  src="/board.png"
  alt="Whiteboard preview"
  className="mx-auto w-[80%] max-h-[360px] object-contain rounded-[24px] shadow-xl border border-gray-200"
/>

</div>


  {/* SOCIAL PROOF */}
  <div className="-mt-10 md:-mt-14 relative z-10 max-w-xl mx-auto">
    <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur p-6 shadow-lg">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        className="w-12 h-12 rounded-full"
        alt="User"
      />

      <div className="text-left">
        <p className="text-sm text-gray-600 leading-relaxed">
          “Collabs helped our team cut meetings in half and move ideas
          to execution insanely fast.”
        </p>

        <p className="mt-2 text-sm font-semibold text-gray-900">
          Pearl <span className="text-gray-500 font-normal">• Product Lead</span>
        </p>
      </div>
    </div>
  </div>

</section>





      {/* REST SECTIONS */}
      <LiveSyncBoards />
      <GiveAccessFeature />
      <FeatureCards />
      <StepsHeader />
      <StepFeatures />
      <Footer />
    </main>
  );
}




// <section className="relative max-w-7xl mx-auto text-center px-4 pt-24 md:pt-36 overflow-hidden">

//   {/* PREMIUM BACKGROUND MESH */}
//   <div className="absolute inset-0 -z-10">
//     <div className="absolute left-1/2 top-20 -translate-x-1/2 h-[520px] w-[520px] bg-blue-500/20 blur-[160px] rounded-full" />
//     <div className="absolute left-1/3 top-60 h-[420px] w-[420px] bg-purple-500/20 blur-[160px] rounded-full" />
//   </div>

//   {/* MICRO BADGE */}
//   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur text-sm text-gray-700 shadow-sm">
//     ⚡ Built for fast-moving teams
//   </div>

//   {/* HEADING */}
//   <h1 className="mt-6 text-4xl md:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight">
//     <span className="text-gray-900">Work Collaboration</span>
//     <br />
//     <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
//       Easy. Fast. Real-time.
//     </span>
//   </h1>

//   {/* SUBTEXT */}
//   <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
//     A real-time collaborative whiteboard built for modern teams to
//     brainstorm, plan, and execute ideas — without friction.
//   </p>

//   {/* CTA */}
//   <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
//     <Link
//       href="/signup"
//       className="group inline-flex items-center gap-2 px-9 py-4 bg-blue-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-2xl  transition-all"
//     >
//       Create New Workspace
//       <span className="group-hover:translate-x-1 transition-transform">→</span>
//     </Link>

//     <button className="px-9 py-4 rounded-xl font-semibold text-sm border border-gray-300 bg-white/80 backdrop-blur hover:border-gray-400 hover:bg-white transition">
//       Join with Code
//     </button>
//   </div>

//   {/* TRUST LINE */}
//   <p className="mt-4 text-xs text-gray-500">
//     No credit card required • Free forever for small teams
//   </p>

//   {/* HERO IMAGE */}
//   <div className="relative mx-auto mt-24 w-full max-w-md md:max-w-5xl">
//     <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-3xl rounded-[32px] -z-10" />

//     <img
//       src="/board.png"
//       alt="Whiteboard preview"
//    className="relative mx-auto mt-2 w-full max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-4xl"
//     />
//   </div>

//   {/* SOCIAL PROOF */}
//   <div className="mt-20 max-w-xl mx-auto">
//     <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur p-6 shadow-lg">
//       <img
//         src="https://randomuser.me/api/portraits/women/44.jpg"
//         className="w-12 h-12 rounded-full"
//         alt="User"
//       />

//       <div className="text-left">
//         <p className="text-sm text-gray-600 leading-relaxed">
//           “Collabs helped our team cut meetings in half and move ideas
//           to execution insanely fast.”
//         </p>

//         <p className="mt-2 text-sm font-semibold text-gray-900">
//           John <span className="text-gray-500 font-normal">• Product Lead</span>
//         </p>
//       </div>
//     </div>
//   </div>

// </section>