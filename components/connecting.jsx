export default function ConnectingPopup({ message  }) {
  return (
    <div className="fixed bottom-6 right-6
                    bg-white shadow-xl rounded-xl
                    px-4 py-3 text-sm font-medium">
      {message}
    </div>
  );
}