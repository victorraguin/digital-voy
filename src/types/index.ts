export interface Psychic {
  id: string;
  name: string;
  specialty: string;
  description: string;
  avatar: string;
  isOnline: boolean;
  rating: number;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'psychic';
  timestamp: Date;
}