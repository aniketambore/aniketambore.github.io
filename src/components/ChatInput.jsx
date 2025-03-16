import React from "react";
import { useChat } from "../contexts/ChatContext";
import { Send } from "lucide-react";

function ChatInput() {
  const { input, setInput, handleSubmit } = useChat();

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about my qualifications..."
          className="w-full rounded-lg bg-[#40414f] border border-gray-600/50 p-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-200 transition-colors"
          disabled={!input.trim()}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
}

export default ChatInput;
