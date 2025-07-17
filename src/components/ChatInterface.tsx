import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Star, Shield, Clock } from "lucide-react";
import { Psychic, Message } from "../types";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SubscriptionModal from "./SubscriptionModal";
import {
  generatePsychicResponse,
  calculateTypingDelay,
} from "../services/openai";
import { APP_CONFIG } from "../config/constants";

interface ChatInterfaceProps {
  psychic: Psychic;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ psychic, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [paidMessages, setPaidMessages] = useState(0);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const storedCount = localStorage.getItem("userMessageCount");
    const storedPaidMessages = localStorage.getItem("paidMessages");
    if (storedCount) {
      setUserMessageCount(parseInt(storedCount, 10));
    }
    if (storedPaidMessages) {
      setPaidMessages(parseInt(storedPaidMessages, 10));
    }
  }, []);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Masquer l'écran d'accueil au premier message
    if (showWelcomeScreen) {
      setShowWelcomeScreen(false);
    }

    const newCount = userMessageCount + 1;
    setUserMessageCount(newCount);
    localStorage.setItem("userMessageCount", newCount.toString());

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Ajouter à l'historique de conversation
    const newHistory = [
      ...conversationHistory,
      { role: "user" as const, content: inputText },
    ];
    setConversationHistory(newHistory);

    setInputText("");
    setIsTyping(true);

    const totalMessagesAllowed = APP_CONFIG.MAX_MESSAGES_ALLOWED + paidMessages;
    if (newCount >= totalMessagesAllowed) {
      setTimeout(() => {
        setIsTyping(false);
        setShowSubscriptionModal(true);
      }, 1500);
      return;
    }

    // Générer une réponse avec OpenAI
    generatePsychicResponse(psychic, inputText, newHistory)
      .then((response) => {
        const typingDelay = calculateTypingDelay(response);

        setTimeout(() => {
          const psychicMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: response,
            sender: "psychic",
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, psychicMessage]);
          setConversationHistory((prev) => [
            ...prev,
            { role: "assistant", content: response },
          ]);
          setIsTyping(false);
        }, typingDelay);
      })
      .catch((error) => {
        console.error("Erreur lors de la génération de la réponse:", error);
        setTimeout(() => {
          const fallbackMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Je ressens une perturbation dans les énergies cosmiques... Permettez-moi de me reconcentrer. Pourriez-vous reformuler votre question ?",
            sender: "psychic",
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, fallbackMessage]);
          setIsTyping(false);
        }, 2000);
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetCounter = () => {
    localStorage.removeItem("userMessageCount");
    localStorage.removeItem("paidMessages");
    setUserMessageCount(0);
    setPaidMessages(0);
    setConversationHistory([]);
    setShowSubscriptionModal(false);
  };

  const handlePayPerUse = () => {
    const newPaidMessages = paidMessages + APP_CONFIG.PAY_PER_USE.MESSAGES;
    setPaidMessages(newPaidMessages);
    localStorage.setItem("paidMessages", newPaidMessages.toString());
    setShowSubscriptionModal(false);
    // Ici vous pourriez intégrer un système de paiement réel
    console.log(
      `Paiement de ${APP_CONFIG.PAY_PER_USE.PRICE}€ pour ${APP_CONFIG.PAY_PER_USE.MESSAGES} messages`
    );
  };

  const handleTimeBased = () => {
    const newPaidMessages =
      paidMessages + APP_CONFIG.TIME_BASED.ESTIMATED_MESSAGES;
    setPaidMessages(newPaidMessages);
    localStorage.setItem("paidMessages", newPaidMessages.toString());
    setShowSubscriptionModal(false);
    // Ici vous pourriez intégrer un système de paiement réel
    console.log(
      `Paiement de ${APP_CONFIG.TIME_BASED.PRICE}€ pour ${APP_CONFIG.TIME_BASED.DURATION} minutes de voyance`
    );
  };

  const handleSubscription = () => {
    // Ici vous pourriez intégrer un système d'abonnement réel
    console.log(
      `Souscription à ${APP_CONFIG.PREMIUM_SUBSCRIPTION.PRICE}€/mois`
    );
    setShowSubscriptionModal(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 border-b border-white/20 flex-shrink-0">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={onBack}
            className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>

          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-lg text-sm sm:text-base">
            {psychic.avatar}
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-base sm:text-lg font-semibold text-white truncate">
                {psychic.name}
              </h2>
              {userMessageCount >=
                APP_CONFIG.MAX_MESSAGES_ALLOWED + paidMessages && (
                <button
                  onClick={() => setShowSubscriptionModal(true)}
                  className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full border border-amber-500/30 hover:bg-amber-500/30 transition-colors duration-200"
                >
                  Quota dépassé
                </button>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 mt-1">
              <p className="text-blue-300 text-xs sm:text-sm truncate">
                {psychic.specialty}
              </p>
              <div className="flex items-center space-x-1 sm:hidden">
                <Star className="w-3 h-3 text-amber-400 fill-current" />
                <span className="text-slate-300 text-xs">{psychic.rating}</span>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <span className="text-slate-300 text-sm">{psychic.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 text-sm font-medium">
                En ligne
              </span>
            </div>
          </div>

          <div className="sm:hidden flex items-center">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {showWelcomeScreen ? (
          <div className="h-full flex items-center justify-center p-4 sm:p-8">
            <div className="max-w-lg sm:max-w-2xl text-center animate-fade-in">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg sm:text-2xl font-semibold shadow-lg mx-auto mb-4 sm:mb-6">
                {psychic.avatar}
              </div>

              <h2 className="text-xl sm:text-3xl font-light text-white mb-3 sm:mb-4">
                Consultation avec {psychic.name}
              </h2>

              <p className="text-blue-300 text-sm sm:text-lg mb-6 sm:mb-8">
                {psychic.specialty}
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-8 border border-white/20 mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-medium text-white mb-3 sm:mb-4">
                  Pour une consultation personnalisée
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                  Présentez-vous brièvement et partagez quelques informations
                  qui vous semblent importantes : votre prénom, votre situation
                  actuelle, vos préoccupations principales...
                </p>
                <p className="text-blue-300 text-xs sm:text-sm">
                  Ces éléments permettront une guidance plus précise et
                  personnalisée.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-slate-400">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  <span>Confidentialité</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  <span>Réponse rapide</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                psychic={psychic}
              />
            ))}
            {isTyping && <TypingIndicator psychic={psychic} />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 sm:p-6 bg-white/10 backdrop-blur-md border-t border-white/20 flex-shrink-0">
        <div className="flex items-end space-x-2 sm:space-x-4">
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                showWelcomeScreen
                  ? "Présentez-vous brièvement..."
                  : userMessageCount >=
                    APP_CONFIG.MAX_MESSAGES_ALLOWED + paidMessages
                  ? "Quota dépassé - Cliquez pour continuer..."
                  : "Votre question..."
              }
              className={`w-full p-3 sm:p-4 pr-10 sm:pr-12 bg-white/10 border rounded-xl sm:rounded-2xl text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm sm:text-base ${
                userMessageCount >=
                APP_CONFIG.MAX_MESSAGES_ALLOWED + paidMessages
                  ? "border-amber-500/50 bg-amber-500/5"
                  : "border-white/20"
              }`}
              rows={1}
              style={{ minHeight: "48px", maxHeight: "96px" }}
            />
          </div>
          <button
            onClick={
              userMessageCount >= APP_CONFIG.MAX_MESSAGES_ALLOWED + paidMessages
                ? () => setShowSubscriptionModal(true)
                : handleSendMessage
            }
            disabled={
              !inputText.trim() &&
              userMessageCount < APP_CONFIG.MAX_MESSAGES_ALLOWED + paidMessages
            }
            className={`flex-shrink-0 p-3 sm:p-4 rounded-full transition-all duration-200 ${
              userMessageCount >= APP_CONFIG.MAX_MESSAGES_ALLOWED + paidMessages
                ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                : inputText.trim()
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                : "bg-white/10 text-slate-400 cursor-not-allowed"
            }`}
          >
            {userMessageCount >=
            APP_CONFIG.MAX_MESSAGES_ALLOWED + paidMessages ? (
              <span className="text-xs font-medium">Continuer</span>
            ) : (
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>

        {/* Debug counter */}
        <div className="mt-3 sm:mt-4 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span>
              Messages: {userMessageCount}/
              {APP_CONFIG.MAX_MESSAGES_ALLOWED + paidMessages}
              {paidMessages > 0 && (
                <span className="text-emerald-400 ml-1">
                  (+{paidMessages} payés)
                </span>
              )}
            </span>
            <div className="hidden sm:flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Réponse rapide</span>
            </div>
          </div>
          <button
            onClick={handleResetCounter}
            className="text-blue-400 hover:text-blue-300 underline text-xs"
          >
            <span className="hidden sm:inline">Réinitialiser (test)</span>
            <span className="sm:hidden">Reset</span>
          </button>
        </div>
      </div>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onReset={handleResetCounter}
          onPayPerUse={handlePayPerUse}
          onTimeBased={handleTimeBased}
          onSubscription={handleSubscription}
        />
      )}
    </div>
  );
};

export default ChatInterface;
