import React from "react";
import { ChatProvider, useChat } from "./contexts/ChatContext";
import { ChatHeader, ChatInput, ChatMessage } from "./components";

function ChatContainer() {
  const { messages, messagesEndRef } = useChat();

  return (
    <div className="h-screen flex flex-col bg-[#343541]">
      <ChatHeader />

      <main className="flex-1 overflow-hidden relative">
        <div className="h-full overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div>
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  text={message.text}
                  sender={message.sender}
                  invoice={message.invoice}
                />
              ))}
            </div>
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      <div className="sticky bottom-0 border-t border-gray-600/50">
        <div className="max-w-3xl mx-auto">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ChatProvider>
      <ChatContainer />
    </ChatProvider>
  );
}

export default App;
