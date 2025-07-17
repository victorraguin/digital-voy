// Configuration des constantes de l'application
export const APP_CONFIG = {
  // Nombre de messages autorisés en version gratuite
  MAX_MESSAGES_ALLOWED: 8,

  // Autres configurations peuvent être ajoutées ici
  TYPING_DELAY: {
    MIN: 800,
    MAX: 4000,
    WORDS_PER_MINUTE: 60,
  },
} as const;
