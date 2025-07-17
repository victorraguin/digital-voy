// Configuration des constantes de l'application
export const APP_CONFIG = {
  // Nombre de messages autorisés en version gratuite
  MAX_MESSAGES_ALLOWED: 6,

  // Configuration du paiement à la carte
  PAY_PER_USE: {
    PRICE: 6, // Prix en euros
    MESSAGES: 10, // Nombre de messages supplémentaires
    PRICE_PER_MESSAGE: 0.6, // Prix par message (calculé automatiquement)
  },

  // Configuration de la voyance par temps
  TIME_BASED: {
    DURATION: 8, // Durée en minutes
    PRICE: 8, // Prix en euros
    ESTIMATED_MESSAGES: 6, // Nombre estimé de messages en 8 minutes
    PRICE_PER_MINUTE: 1, // Prix par minute
  },

  // Configuration de l'abonnement premium
  PREMIUM_SUBSCRIPTION: {
    PRICE: 20, // Prix mensuel en euros
    UNLIMITED_MESSAGES: true,
  },

  // Autres configurations peuvent être ajoutées ici
  TYPING_DELAY: {
    MIN: 800,
    MAX: 4000,
    WORDS_PER_MINUTE: 60,
  },
} as const;
