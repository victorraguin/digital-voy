import React, { useState } from "react";
import {
  X,
  Crown,
  Check,
  Shield,
  Clock,
  Star,
  CreditCard,
  Zap,
  Timer,
} from "lucide-react";
import { APP_CONFIG } from "../config/constants";

interface SubscriptionModalProps {
  onClose: () => void;
  onReset: () => void;
  onPayPerUse: () => void;
  onTimeBased: () => void;
  onSubscription: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  onClose,
  onReset,
  onPayPerUse,
  onTimeBased,
  onSubscription,
}) => {
  const [selectedOption, setSelectedOption] = useState<
    "pay-per-use" | "time-based" | "subscription"
  >("pay-per-use");

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
      <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-lg sm:max-w-4xl lg:max-w-6xl w-full border border-white/20 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6 sm:mb-8">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">
                Continuez votre consultation
              </h2>
              <p className="text-blue-300 text-sm sm:text-base">
                Choisissez votre option préférée
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
          </button>
        </div>

        <div className="mb-6 sm:mb-8">
          <p className="text-slate-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
            Vous avez utilisé vos {APP_CONFIG.MAX_MESSAGES_ALLOWED}{" "}
            consultations d'essai gratuites. Choisissez comment continuer votre
            consultation :
          </p>

          {/* Options de paiement */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {/* Option 1: Paiement à la carte - POPULAIRE */}
            <div
              className={`relative rounded-xl p-6 border-2 transition-all duration-200 cursor-pointer ${
                selectedOption === "pay-per-use"
                  ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/50"
                  : "bg-white/5 border-white/20 hover:border-emerald-500/30"
              }`}
              onClick={() => setSelectedOption("pay-per-use")}
            >
              {/* Badge POPULAIRE - plus discret */}
              <div className="absolute -top-2 -left-2 bg-emerald-500 text-white text-xs font-medium px-2 py-0.5 rounded-full shadow-md">
                Recommandé
              </div>

              {selectedOption === "pay-per-use" && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Paiement à la carte
                  </h3>
                  <p className="text-sm text-emerald-300">Le plus économique</p>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-white">
                  {APP_CONFIG.PAY_PER_USE.PRICE}€
                </div>
                <div className="text-sm text-emerald-300">
                  pour {APP_CONFIG.PAY_PER_USE.MESSAGES} messages
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Soit {APP_CONFIG.PAY_PER_USE.PRICE_PER_MESSAGE}€ par message
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-slate-300">
                    Prix le plus avantageux
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-slate-300">
                    Aucun engagement
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-slate-300">Accès immédiat</span>
                </div>
              </div>
            </div>

            {/* Option 2: Voyance par temps */}
            <div
              className={`relative rounded-xl p-6 border-2 transition-all duration-200 cursor-pointer ${
                selectedOption === "time-based"
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50"
                  : "bg-white/5 border-white/20 hover:border-purple-500/30"
              }`}
              onClick={() => setSelectedOption("time-based")}
            >
              {selectedOption === "time-based" && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Timer className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Voyance par temps
                  </h3>
                  <p className="text-sm text-purple-300">Session dédiée</p>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-white">
                  {APP_CONFIG.TIME_BASED.PRICE}€
                </div>
                <div className="text-sm text-purple-300">
                  pour {APP_CONFIG.TIME_BASED.DURATION} minutes
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Session complète dédiée
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-slate-300">
                    Session de {APP_CONFIG.TIME_BASED.DURATION} minutes
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-slate-300">
                    Consultation complète
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-slate-300">
                    Session intensive dédiée
                  </span>
                </div>
              </div>
            </div>

            {/* Option 3: Abonnement Premium */}
            <div
              className={`relative rounded-xl p-6 border-2 transition-all duration-200 cursor-pointer ${
                selectedOption === "subscription"
                  ? "bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-500/50"
                  : "bg-white/5 border-white/20 hover:border-blue-500/30"
              }`}
              onClick={() => setSelectedOption("subscription")}
            >
              {selectedOption === "subscription" && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Crown className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Abonnement Premium
                  </h3>
                  <p className="text-sm text-blue-300">Illimité</p>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-white">
                  {APP_CONFIG.PREMIUM_SUBSCRIPTION.PRICE}€
                </div>
                <div className="text-sm text-blue-300">par mois</div>
                <div className="text-xs text-slate-400 mt-1">
                  Résiliable à tout moment
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-slate-300">
                    Consultations illimitées
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-slate-300">
                    Accès à tous nos experts
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-slate-300">
                    Résiliable à tout moment
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={
              selectedOption === "pay-per-use"
                ? onPayPerUse
                : selectedOption === "time-based"
                ? onTimeBased
                : onSubscription
            }
            className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
              selectedOption === "pay-per-use"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                : selectedOption === "time-based"
                ? "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            } text-white`}
          >
            <Zap className="w-5 h-5" />
            <span>
              {selectedOption === "pay-per-use"
                ? `Payer ${APP_CONFIG.PAY_PER_USE.PRICE}€ et continuer`
                : selectedOption === "time-based"
                ? `Payer ${APP_CONFIG.TIME_BASED.PRICE}€ pour ${APP_CONFIG.TIME_BASED.DURATION}min`
                : `Souscrire à ${APP_CONFIG.PREMIUM_SUBSCRIPTION.PRICE}€/mois`}
            </span>
          </button>

          <button
            onClick={onClose}
            className="w-full bg-white/10 hover:bg-white/20 text-slate-300 font-medium py-4 px-6 rounded-xl transition-colors duration-200 border border-white/20"
          >
            Continuer plus tard
          </button>

          <button
            onClick={onReset}
            className="w-full text-sm text-blue-400 hover:text-blue-300 underline mt-6"
          >
            Réinitialiser le compteur (mode test)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
