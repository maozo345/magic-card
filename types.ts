export interface MessageCard {
  id: string;
  title: string;
  content: string;
  videoUrl: string;
  imageUrl: string; // AI generated image for the card
  profileUrl?: string; // Link to the social profile
  originalUrl?: string; // Link to the original TikTok video
  type: 'love' | 'career' | 'spirituality' | 'general';
}

export enum AppState {
  IDLE = 'IDLE',
  SHUFFLING = 'SHUFFLING',
  REVEALED = 'REVEALED',
}