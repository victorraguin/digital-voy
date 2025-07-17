import React from "react";
import { User } from "lucide-react";
import { Message, Psychic } from "../types";

interface MessageBubbleProps {
  message: Message;
  psychic: Psychic;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, psychic }) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } animate-message-appear`}
    >
      <div
        className={`flex items-end space-x-2 sm:space-x-3 max-w-[90%] sm:max-w-[85%] ${
          isUser ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        {!isUser && (
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs sm:text-sm font-semibold shadow-lg flex-shrink-0">
            {psychic.avatar}
          </div>
        )}

        <div
          className={`px-3 py-2.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm min-w-0 ${
            isUser
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
              : "bg-white/10 text-slate-100 border border-white/20"
          } ${
            isUser
              ? "rounded-br-sm sm:rounded-br-md"
              : "rounded-bl-sm sm:rounded-bl-md"
          }`}
        >
          <p
            className={`text-xs sm:text-sm leading-relaxed break-words ${
              !isUser ? "animate-psychic-text-appear" : ""
            }`}
          >
            {message.text}
          </p>
          <p
            className={`text-xs mt-2 sm:mt-3 ${
              isUser ? "text-blue-100" : "text-slate-400"
            }`}
          >
            {message.timestamp.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {isUser && (
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white shadow-lg flex-shrink-0">
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
