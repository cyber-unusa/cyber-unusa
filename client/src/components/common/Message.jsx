export default function Message({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-[60%] px-4 py-2 rounded-xl text-sm shadow-md ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-tl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
