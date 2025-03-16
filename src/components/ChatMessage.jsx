import React from "react";
import { User, Bot } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

function ChatMessage({ text, sender, invoice }) {
  const isUser = sender === "user";
  const bgColor = isUser ? "bg-[#343541]" : "bg-[#444654]";

  return (
    <div className={`w-full ${bgColor} py-6`}>
      <div className="max-w-3xl mx-auto flex px-4">
        <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0">
          {isUser ? (
            <div className="bg-[#5436DA] w-full h-full rounded-sm flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
          ) : (
            <div className="bg-[#10a37f] w-full h-full rounded-sm flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
          )}
        </div>

        <div className="min-h-[20px] flex flex-col flex-1 ml-4">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-100 whitespace-pre-wrap">{text}</p>
          </div>
          {invoice && (
            <div className="mt-4 flex flex-col items-center bg-[#40414f] p-4 rounded-lg">
            <QRCodeSVG value={invoice} size={200} className="mx-auto" />
            <div className="mt-2 w-full text-center">
              <p className="text-sm font-mono text-gray-300 break-all inline-block max-w-full px-4">
                {invoice}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
