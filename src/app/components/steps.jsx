export default function StepsHeader() {
  return (
    <section className="w-full py-20 bg-white text-center select-none">
      {/* Top Pill Button */}
      <div
        className="
          inline-block 
          px-6 py-2 
          bg-white 
          rounded-full 
          shadow-md 
          text-gray-700 
          font-medium 
          text-sm 
          mb-6
          border 
          border-gray-200
        "
      >
        How it works
      </div>

      {/* Main Heading */}
      <h2 className="text-5xl font-bold tracking-tight text-[#0f172a]">
        Get started in <span className="text-purple-600">minutes</span>
      </h2>

      {/* Subtext */}
      <p className="mt-4 text-gray-500 text-lg">
        Four simple steps to transform how your team works.
      </p>
    </section>
  );
}
