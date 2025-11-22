export enum Treatise {
  LOGIC = 'ཚད་མ།', // Tsema (Pramanavarttika)
  PRAJNAPARAMITA = 'ཕར་ཕྱིན།', // Pharchin
  MADHYAMAKA = 'དབུ་མ།', // Uma
  VINAYA = 'འདུལ་བ།', // Dulwa
  ABHIDHARMA = 'མཛོད།' // Dzo
}

export enum AppMode {
  DEBATE = 'debate', // རྩོད་པ།
  EXPLAIN = 'explain', // འགྲེལ་བཤད།
  MEDITATION = 'meditation', // སྒོམ་ལམ།
  DICTIONARY = 'dictionary' // ཚིག་མཛོད།
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  audioUrl?: string; // For TTS response
  timestamp: number;
  isError?: boolean;
  isLoading?: boolean;
}

export interface DailyPractice {
  topic: string;
  question: string;
  textSource: string;
}
