
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function LiveSyncBoards() {
  const root = useRef(null);
  const leftPath = useRef(null);
  const rightPath = useRef(null);
  const leftCursor = useRef(null);
  const rightCursor = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = [leftPath.current, rightPath.current];

      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      tl.to(leftPath.current, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.out",
      });

      tl.to(
        leftCursor.current,
        {
          motionPath: {
            path: [
              { x: 20, y: -6 },
              { x: 90, y: -14 },
              { x: 140, y: -20 },
            ],
            curviness: 1.4,
          },
          duration: 1.2,
          ease: "power2.out",
        },
        0
      );

      tl.to(
        rightPath.current,
        {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: "power2.out",
        },
        0.25
      );

      tl.to(
        rightCursor.current,
        {
          motionPath: {
            path: [
              { x: 15, y: 0 },
              { x: 45, y: 5 },
              { x: 80, y: 8 },
            ],
            curviness: 1.4,
          },
          duration: 1.1,
          ease: "power2.out",
        },
        0.25
      );

      tl.to(
        [leftCursor.current, rightCursor.current],
        {
          scale: 1.06,
          duration: 0.3,
          ease: "power1.out",
          yoyo: true,
          repeat: 1,
        },
        0.45
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="w-full py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Live Whiteboard Sync
        </h2>
        <p className="text-gray-500 mt-3 text-lg">
          User draws on the left board — the right board updates instantly.
        </p>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-12">

          {/* LEFT BOARD */}
          <div className="w-[480px] max-w-full min-w-[320px] h-[340px] bg-white rounded-2xl shadow-lg border border-gray-100 relative p-4">
            <div className="absolute top-0 left-0 w-full h-9 rounded-t-2xl bg-gradient-to-r from-purple-600 to-indigo-500" />

            <svg viewBox="0 0 560 300" className="w-full mt-8 pointer-events-none">
              <path
                ref={leftPath}
                d="M80 120 Q160 120 200 120 T240 170 T360 170"
                stroke="#CDBBFF"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
              />

              <g ref={leftCursor} transform="translate(120 70)">
                <polygon points="0,0 16,24 8,26 6,20 2,16" fill="#2563eb" />
                <rect
                  x="24"
                  y="-10"
                  rx="10"
                  width="120"
                  height="28"
                  fill="#2563eb"
                />
                <text x="34" y="10" fontSize="12" fill="white">
                  Aarav (You)
                </text>
              </g>
            </svg>

            <div className="absolute bottom-4 left-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow">
              Drawing…
            </div>
          </div>

          {/* RIGHT BOARD */}
          <div className="w-[480px] max-w-full min-w-[320px] h-[340px] bg-[#fafafd] rounded-2xl shadow-lg border border-gray-100 relative p-4">
            <div className="absolute top-0 left-0 w-full h-9 rounded-t-2xl bg-gradient-to-r from-purple-600 to-indigo-500" />

            <svg viewBox="0 0 560 300" className="w-full mt-8 pointer-events-none">
              <path
                ref={rightPath}
                d="M80 120 Q160 120 200 120 T240 170 T360 170"
                stroke="#E9E2FF"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
              />

              <g ref={rightCursor} transform="translate(100 85)">
                <polygon points="0,0 16,24 8,26 6,20 2,16" fill="#1f2937" />
                <rect
                  x="24"
                  y="-10"
                  rx="10"
                  width="108"
                  height="28"
                  fill="white"
                  stroke="#d1d5db"
                />
                <text x="34" y="10" fontSize="12" fill="#111827">
                  Guest User
                </text>
              </g>
            </svg>

            <div className="absolute bottom-4 right-4 px-4 py-2 rounded-lg bg-white text-gray-800 text-sm font-semibold border shadow-sm">
              Synced
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
