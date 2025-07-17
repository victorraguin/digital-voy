import React from "react";
import { X, Crown, Check, Shield, Clock, Star } from "lucide-react";
import { APP_CONFIG } from "../config/constants";

interface SubscriptionModalProps {
  onClose: () => void;
  onReset: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  onClose,
  onReset,
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-lg w-full border border-white/20 shadow-2xl animate-scale-in">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Accès Premium
              </h2>
              <p className="text-blue-300">Continuez votre consultation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="mb-8">
          <p className="text-slate-300 mb-6 leading-relaxed">
            Vous avez utilisé vos {APP_CONFIG.MAX_MESSAGES_ALLOWED}{" "}
            consultations d'essai gratuites. Accédez à l'ensemble de nos
            services avec un abonnement premium.
          </p>

          <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl p-6 border border-blue-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold text-lg">
                  Abonnement Premium
                </span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">20€</div>
                <div className="text-sm text-blue-300">par mois</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-slate-300">
                  Consultations illimitées avec tous nos experts
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-slate-300">
                  Confidentialité absolue garantie
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-slate-300">
                  Réponses prioritaires sous 30 secondes
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-slate-300">
                  Accès aux voyants les mieux notés
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Souscrire maintenant
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
