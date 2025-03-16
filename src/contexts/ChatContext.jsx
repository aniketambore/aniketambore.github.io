import { createContext, useContext, useState, useRef, useEffect } from "react";
import { chatService, lightningService } from "../services";

export const ChatContext = createContext({
  messages: [
    // {
    //   text: "Message content",
    //   sender: "user" | "bot"
    //   invoice: "lnbc....",
    // }
  ],
  input: "",
  setInput: () => {},
  handleSubmit: () => {},
  /// A reference for automatically scrolling to the latest message.
  messagesEndRef: null,
});

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([
    {
      text: chatService.getInitialMessage(),
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]); // Add user message to chat
    setInput("");

    try {
      let invoice = null;

      // If this is a tip request with amount, get the invoice
      if (input.toLowerCase().includes("tip") && /\d/.test(input)) {
        try {
          invoice = await lightningService.createInvoice(
            parseInt(input.match(/(\d+(?:,\d+)*)/)[1].replace(/,/g, ""))
          );
        } catch (error) {
          console.error("Error getting invoice:", error);
        }
      }

      const botMessage = {
        text: chatService.processMessage(input),
        sender: "bot",
        invoice: invoice,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error processing message:", error);
      const errorMessage = {
        text: "I apologize, but I encountered an error processing your message. Please try again.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        setInput,
        handleSubmit,
        messagesEndRef,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  return useContext(ChatContext);
};
