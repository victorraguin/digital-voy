import React, { useState } from "react";
import {
  Star,
  Italic as Crystal,
  Eye,
  Moon,
  Sparkles,
  Hand,
  User,
  Clock,
  Info,
} from "lucide-react";
import { Psychic } from "../types";
import LegalInfo from "./LegalInfo";

interface PsychicListProps {
  onSelectPsychic: (psychic: Psychic) => void;
}

const psychics: Psychic[] = [
  {
    id: "1",
    name: "Luna Martineau",
    specialty: "Tarot & Astrologie",
    description:
      "Consultante en arts divinatoires avec plus de 15 ans d'expérience. Spécialisée dans les lectures de tarot et l'interprétation astrologique pour éclairer votre chemin de vie.",
    avatar: "LM",
    isOnline: true,
    rating: 4.9,
  },
  {
    id: "2",
    name: "Alexandre Dubois",
    specialty: "Voyance Pure",
    description:
      "Voyant de troisième génération, pratiquant la voyance pure sans support. Guidance spirituelle et révélation des potentiels cachés de votre destinée.",
    avatar: "AD",
    isOnline: true,
    rating: 4.8,
  },
  {
    id: "3",
    name: "Séraphine Laurent",
    specialty: "Médiumnité & Guidance",
    description:
      "Médium certifiée, spécialisée dans la communication spirituelle et la transmission de messages de guidance. Accompagnement dans les moments de questionnement.",
    avatar: "SL",
    isOnline: false,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Maya Rousseau",
    specialty: "Numérologie & Chiromancie",
    description:
      "Experte en numérologie sacrée et lecture palmaire. Analyse des cycles de vie et révélation des talents innés à travers l'étude des nombres et des lignes.",
    avatar: "MR",
    isOnline: true,
    rating: 4.6,
  },
];

const getSpecialtyIcon = (specialty: string) => {
  if (specialty.includes("Tarot") || specialty.includes("Astrologie"))
    return <Moon className="w-5 h-5" />;
  if (specialty.includes("Voyance")) return <Eye className="w-5 h-5" />;
  if (specialty.includes("Médiumnité")) return <Sparkles className="w-5 h-5" />;
  if (specialty.includes("Numérologie") || specialty.includes("Chiromancie"))
    return <Hand className="w-5 h-5" />;
  return <Crystal className="w-5 h-5" />;
};

const PsychicList: React.FC<PsychicListProps> = ({ onSelectPsychic }) => {
  const [showLegalInfo, setShowLegalInfo] = useState(false);

  const handlePsychicClick = (psychic: Psychic) => {
    if (psychic.isOnline) {
      onSelectPsychic(psychic);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center p-6 animate-fade-in bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full">
              <Crystal className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white">
              Voyance{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Professionnelle
              </span>
            </h1>
          </div>
          <p className="text-slate-300 text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Consultations privées avec nos experts en arts divinatoires
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {psychics.map((psychic) => (
            <div
              key={psychic.id}
              onClick={() => handlePsychicClick(psychic)}
              className={`
                relative overflow-hidden rounded-xl p-4 sm:p-6 transition-all duration-300 backdrop-blur-sm
                ${
                  psychic.isOnline
                    ? "cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-blue-400/50"
                    : "cursor-not-allowed bg-white/5 opacity-60 border border-white/10"
                }
              `}
            >
              {psychic.isOnline && (
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center space-x-1 sm:space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-400 text-xs sm:text-sm font-medium">
                    Disponible
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                <div
                  className={`
                  w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-semibold text-base sm:text-lg mx-auto sm:mx-0
                  ${
                    psychic.isOnline
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg"
                      : "bg-gradient-to-br from-gray-500 to-gray-600"
                  }
                `}
                >
                  {psychic.avatar}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3 text-center sm:text-left">
                    <div
                      className={`p-1.5 sm:p-2 rounded-lg mx-auto sm:mx-0 ${
                        psychic.isOnline ? "bg-blue-500/20" : "bg-gray-500/20"
                      }`}
                    >
                      <div className="w-4 h-4 sm:w-5 sm:h-5">
                        {getSpecialtyIcon(psychic.specialty)}
                      </div>
                    </div>
                    <div>
                      <h3
                        className={`text-lg sm:text-xl font-semibold ${
                          psychic.isOnline ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {psychic.name}
                      </h3>
                      <p
                        className={`text-sm sm:text-base font-medium ${
                          psychic.isOnline ? "text-blue-300" : "text-gray-500"
                        }`}
                      >
                        {psychic.specialty}
                      </p>
                    </div>
                  </div>

                  <p
                    className={`text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed text-center sm:text-left ${
                      psychic.isOnline ? "text-slate-300" : "text-gray-500"
                    }`}
                  >
                    {psychic.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star
                          className={`w-4 h-4 fill-current ${
                            psychic.isOnline
                              ? "text-amber-400"
                              : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            psychic.isOnline
                              ? "text-slate-300"
                              : "text-gray-500"
                          }`}
                        >
                          {psychic.rating}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Clock
                          className={`w-4 h-4 ${
                            psychic.isOnline
                              ? "text-slate-400"
                              : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-xs sm:text-sm ${
                            psychic.isOnline
                              ? "text-slate-400"
                              : "text-gray-500"
                          }`}
                        >
                          <span className="hidden sm:inline">
                            Réponse immédiate
                          </span>
                          <span className="sm:hidden">Immédiat</span>
                        </span>
                      </div>
                    </div>

                    <div
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                        psychic.isOnline
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {psychic.isOnline ? "En ligne" : "Hors ligne"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-slate-400 text-xs sm:text-sm">
            <span className="hidden sm:inline">
              Consultations confidentielles • Paiement sécurisé • Satisfaction
              garantie
            </span>
            <span className="sm:hidden">
              Confidentialité • Sécurité • Garantie
            </span>
          </p>

          <button
            onClick={() => setShowLegalInfo(true)}
            className="inline-flex items-center space-x-1 text-slate-500 hover:text-slate-400 text-xs transition-colors duration-200"
          >
            <Info className="w-3 h-3" />
            <span>Informations légales</span>
          </button>
        </div>
      </div>

      {/* Modal des informations légales */}
      {showLegalInfo && <LegalInfo onClose={() => setShowLegalInfo(false)} />}
    </div>
  );
};

export default PsychicList;
