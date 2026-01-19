export default function KanbanBoard({onClose}) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center"
    onClick={onClose}
    >
      <div className="bg-gray-900 border border-dashed border-gray-600 rounded-2xl p-8 text-center max-w-md w-full mx-4">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>


        <h2 className="text-2xl font-bold mb-2 text-white">
          Kanban Board
        </h2>

        <p className="text-gray-400 text-sm">
          This feature is currently under development.
        </p>

        <p className="text-gray-500 text-xs mt-2">
          (Pro feature)
        </p>
      </div>
    </div>
  );
}
