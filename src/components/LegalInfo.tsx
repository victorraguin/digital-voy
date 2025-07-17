import React from "react";
import { X, Info, Shield, Eye, Sparkles } from "lucide-react";

interface LegalInfoProps {
  onClose: () => void;
}

const LegalInfo: React.FC<LegalInfoProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
      <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-lg sm:max-w-2xl w-full border border-white/20 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6 sm:mb-8">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
              <Info className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">
                Informations légales
              </h2>
              <p className="text-blue-300 text-sm sm:text-base">
                Voyance digitale et divination
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

        <div className="space-y-6 text-sm sm:text-base">
          {/* Section principale */}
          <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
            <div className="flex items-start space-x-3 mb-4">
              <Eye className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Nature du service
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Cette application propose des consultations de voyance
                  digitale utilisant l'intelligence artificielle. Les réponses
                  sont générées par des algorithmes et ne constituent pas des
                  prédictions divinatoires traditionnelles.
                </p>
              </div>
            </div>
          </div>

          {/* Section divination */}
          <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
            <div className="flex items-start space-x-3 mb-4">
              <Sparkles className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Divination et arts divinatoires
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Les consultations s'inscrivent dans le cadre des arts
                  divinatoires et de la divination. Elles sont proposées à des
                  fins de divertissement et de guidance personnelle uniquement.
                </p>
              </div>
            </div>
          </div>

          {/* Section responsabilité */}
          <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
            <div className="flex items-start space-x-3 mb-4">
              <Shield className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Responsabilité et utilisation
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Les consultations ne remplacent en aucun cas l'avis d'un
                  professionnel de santé, d'un avocat ou d'un conseiller
                  financier. Les décisions importantes doivent être prises en
                  toute responsabilité.
                </p>
              </div>
            </div>
          </div>

          {/* Section confidentialité */}
          <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl p-4 sm:p-6 border border-blue-500/20">
            <h3 className="text-white font-semibold mb-3">Confidentialité</h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              Vos conversations sont confidentielles et ne sont pas partagées
              avec des tiers. Les données sont utilisées uniquement pour
              améliorer la qualité des consultations.
            </p>
            <p className="text-blue-300 text-xs sm:text-sm">
              Conformément au RGPD, vous disposez d'un droit d'accès, de
              rectification et de suppression de vos données.
            </p>
          </div>

          {/* Avertissement légal */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4 sm:p-6 border border-amber-500/20">
            <h3 className="text-amber-400 font-semibold mb-2">
              Avertissement légal
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              Ce service est proposé dans le respect de la réglementation
              française sur les arts divinatoires. Les consultations sont
              destinées aux personnes majeures et responsables. En utilisant ce
              service, vous reconnaissez avoir pris connaissance de ces
              informations.
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200"
          >
            J'ai compris
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalInfo;
