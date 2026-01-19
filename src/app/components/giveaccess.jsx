


"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CollabPreview() {
  const root = useRef(null);
  const frame = useRef(null);
  const toastLeft = useRef(null);
  const toastRight = useRef(null);
  const centerIcon = useRef(null);
  const heading = useRef(null);
  const subtext = useRef(null);
  const avatars = useRef([]);
  const usersPopup = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          end: "bottom 30%",
          scrub: 1.1,
        },
      });

      tl.from(frame.current, { opacity: 0, y: 40, duration: 1 });
      tl.from(toastLeft.current, { opacity: 0, y: 20, duration: 0.8 }, "-=0.6");
      tl.from(toastRight.current, { opacity: 0, y: 20, duration: 0.8 }, "-=0.7");

      tl.from(centerIcon.current, {
        opacity: 0,
        scale: 0.6,
        duration: 1,
        ease: "back.out(1.6)",
      });

      tl.from(heading.current, { opacity: 0, y: 20, duration: 0.8 }, "-=0.6");
      tl.from(subtext.current, { opacity: 0, y: 15, duration: 0.8 }, "-=0.7");

      tl.from(
        avatars.current,
        { opacity: 0, y: 20, stagger: 0.15, ease: "power2.out" },
        "-=0.5"
      );

      tl.from(usersPopup.current, { opacity: 0, y: 20, duration: 0.8 }, "-=0.4");
      tl.to(usersPopup.current, {
        opacity: 0,
        y: 20,
        delay: 2,
        duration: 1,
        ease: "power2.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="py-20 bg-white">
      {/* Section heading */}
      <div className="max-w-4xl mx-auto text-center mb-14 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Give Access & Control
        </h2>
        <p className="text-gray-500 mt-2 text-base md:text-lg">
          Host assigns drawing permission — selected members can now edit the board.
        </p>
      </div>

      <div
        ref={frame}
        className="relative max-w-5xl mx-auto bg-white rounded-3xl shadow-xl 
                   border overflow-hidden px-5 py-8 md:p-10"
      >
        {/* Users popup */}
        <div
          ref={usersPopup}
          className="absolute left-1/2 top-4 -translate-x-1/2 
                     bg-white shadow-lg px-4 py-2 rounded-xl text-gray-700 
                     text-sm font-medium border z-20"
        >
          3 users joined this board
        </div>

        {/* URL bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-gray-100 rounded-full py-1 px-4 text-gray-500 text-xs md:text-sm">
            flowsync.app/dashboard
          </div>
        </div>

        {/* Toasts */}
        <div className="flex flex-col md:block gap-4">
          <div
            ref={toastLeft}
            className="md:absolute md:left-10 md:top-20 
                       bg-white p-4 rounded-xl shadow-md flex gap-3"
          >
            <div className="text-green-500 text-xl">✔</div>
            <div>
              <p className="font-semibold text-sm">Sarah joined the document</p>
              <p className="text-gray-500 text-xs">Just now</p>
            </div>
          </div>

          <div
            ref={toastRight}
            className="md:absolute md:right-10 md:bottom-20 
                       bg-white p-4 rounded-xl shadow-md flex gap-3"
          >
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
              ✏️
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-700">
                Alex is typing…
              </p>
              <p className="text-gray-400 text-xs">Live update</p>
            </div>
          </div>
        </div>

        {/* Center icon */}
        <div
          ref={centerIcon}
          className="w-16 h-16 md:w-20 md:h-20 bg-purple-600 rounded-2xl 
                     mx-auto flex items-center justify-center text-white 
                     text-3xl md:text-4xl mt-10 mb-6 shadow-lg"
        >
          ⚡
        </div>

        <h3
          ref={heading}
          className="text-2xl md:text-3xl font-bold text-center text-gray-900"
        >
          Live Collaboration Dashboard
        </h3>

        <p
          ref={subtext}
          className="text-center text-gray-600 mt-2 text-base md:text-lg"
        >
          Real-time sync across all devices
        </p>

        <p className="text-center text-gray-500 mt-3 text-sm md:text-base max-w-xl mx-auto">
          This feature allows the host to grant drawing access to selected members,
          ensuring controlled and secure collaboration on the whiteboard.
        </p>

        {/* Avatars */}
        <div className="flex justify-center gap-4 md:gap-6 mt-8">
          {["S", "A", "J", "M"].map((c, i) => (
            <div
              key={i}
              ref={(el) => (avatars.current[i] = el)}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center 
                         justify-center text-white text-lg font-semibold 
                         shadow-lg relative"
              style={{
                background: ["#f78fb3", "#74b9ff", "#55efc4", "#a29bfe"][i],
              }}
            >
              {c}
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full 
                              bg-green-400 border-2 border-white" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
