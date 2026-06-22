export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  tags: string[];
  features: string[];
}

export interface UserPersona {
  id: string;
  name: string;
  role: string;
  avatar: string; // Tailwind color code / descriptive label
  bio: string;
  interests: string[];
}

export interface Interaction {
  userId: string;
  productId: string;
  type: 'click' | 'rate' | 'purchase';
  value?: number; // 1-5 for ratings
  timestamp: number;
}

export interface RecResult {
  productId: string;
  product: Product;
  score: number; // Normalized score [0, 1]
  factors?: {
    collaborativeScore: number;
    contentScore: number;
    matrixScore: number;
  };
  reason: string;
}

export interface LatentFactorPoint {
  id: string; // 'user-<id>' or 'item-<id>'
  name: string;
  type: 'user' | 'item';
  x: number; // Latent dimension 1
  y: number; // Latent dimension 2
  color: string;
}
