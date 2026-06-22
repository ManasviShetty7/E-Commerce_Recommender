import { Product, UserPersona, Interaction, RecResult, LatentFactorPoint } from './types.js';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Cyberpunk Mechanical Keyboard',
    category: 'Gadgets',
    price: 10499.00,
    imageUrl: 'keyboard', // Descriptive ID for icon/illustrations
    description: 'A customizable 75% mechanical keyboard with dynamic RGB backlighting, hot-swappable tactile blue switches, and a premium CNC-machined anodized aluminum casing designed for developers and gamers.',
    tags: ['mechanical', 'rgb', 'keyboard', 'tactile', 'gaming', 'aluminum', 'usb-c'],
    features: ['Hot-swappable switches', 'Gasket-mounted structure', 'Screw-in stabilizers', 'South-facing LEDs']
  },
  {
    id: 'prod-2',
    name: 'Ergonomic Memory Foam Wrist Rest',
    category: 'Productivity',
    price: 1499.00,
    imageUrl: 'wristrest',
    description: 'Heavy duty pressure-relieving slow-rebound foam wrist rest designed to minimize typing fatigue and maintain natural wrist angles. Wrapped in premium organic cooling bamboo fabric.',
    tags: ['ergonomic', 'wrist', 'foam', 'office', 'typing', 'comfort', 'desk'],
    features: ['High-density memory foam', 'Ergonomic slope design', 'Anti-slip rubber base', 'Washable cover']
  },
  {
    id: 'prod-3',
    name: 'ActiveNoise ANC Wireless Headphones',
    category: 'Audio',
    price: 22999.00,
    imageUrl: 'headphones',
    description: 'Premium over-ear headphones with custom hybrid active noise cancellation, studio-grade transducer drivers, ambient mode, and an exceptional 40-hour high-fidelity wireless listening lifespan.',
    tags: ['audio', 'headphones', 'anc', 'wireless', 'bluetooth', 'music', 'travel'],
    features: ['Hybrid Active Noise Cancelling', 'Hi-Res Audio certified', '40-Hour battery life', 'Multi-point Bluetooth']
  },
  {
    id: 'prod-4',
    name: 'Minimalist Leather Cardholder Wallet',
    category: 'Fashion',
    price: 1899.00,
    imageUrl: 'wallet',
    description: 'Pocket-safe ultra-slim wallet crafted from full-grain vegetable tanned Italian leather featuring 6 quick-access card pockets and an integrated active RFID shielding protection layer.',
    tags: ['wallet', 'leather', 'fashion', 'minimalist', 'rfid', 'gift', 'pocket'],
    features: ['Full-grain Italian leather', 'RFID blocking defense', 'Holds 1-12 business cards', 'Slim front pocket-fit']
  },
  {
    id: 'prod-5',
    name: 'Smart Coffee Pour-Over Kettle',
    category: 'Home & Kitchen',
    price: 9499.00,
    imageUrl: 'kettle',
    description: 'Precision gooseneck drip kettle featuring exact target heat controls (+/- 1°F accuracy), built-in stopwatch, mobile status application integration, and high-safety auto shut-off function.',
    tags: ['coffee', 'kitchen', 'smart', 'kettle', 'pour-over', 'home', 'brewing'],
    features: ['Gooseneck spout flow control', 'To-the-degree temp control', '60-minute holding warm temp', 'High LCD details screen']
  },
  {
    id: 'prod-6',
    name: 'Organic Ethiopian Yirgacheffe Beans',
    category: 'Gourmet Food',
    price: 699.00,
    imageUrl: 'coffeebeans',
    description: 'Light-medium roasted single-origin wash coffee, harvested sustainably by local cooperatives, revealing bright notes of blueberry, black tea flavor, and elegant floral aroma.',
    tags: ['coffee', 'beans', 'gourmet', 'organic', 'ethiopian', 'beans', 'single-origin'],
    features: ['100% USDA Organic Certified', 'Light-Medium elegant roast', 'Direct trade source', 'Fresh whole beans']
  },
  {
    id: 'prod-7',
    name: 'Ultra-Grip Extra Thick Yoga Mat',
    category: 'Fitness & Wellness',
    price: 3299.00,
    imageUrl: 'yogamat',
    description: 'Eco-friendly natural tree-rubber mat with high-performance slip prevention in any hot sweaty climate. Dual-alignment textured markings ideal for beginner to advanced wellness experts.',
    tags: ['fitness', 'gym', 'health', 'wellness', 'yoga', 'mat', 'rubber'],
    features: ['All-natural tree rubber', 'Laser alignment markings', '6mm high comfort cushion', '100% PVC free']
  },
  {
    id: 'prod-8',
    name: 'Double-Wall Insulated Steel Flask',
    category: 'Fitness & Wellness',
    price: 1499.00,
    imageUrl: 'flask',
    description: 'Heavy duty 32oz vacuum stainless steel sports flask, ensuring drinks are maintained refreshingly cold up to 24 hours or steaming warm for 12 hours. Commute and leak-proof spout cap.',
    tags: ['flask', 'insulated', 'water', 'bottle', 'fitness', 'travel', 'sports'],
    features: ['Double-wall vacuum barrier', 'Premium 18/8 kitchen stainless steel', 'Sweat-proof coating', 'BPA free container']
  },
  {
    id: 'prod-9',
    name: 'Introduction to Machine Learning',
    category: 'Books & Education',
    price: 1299.00,
    imageUrl: 'bookai',
    description: 'A comprehensive educational textbook focusing on modern machine learning theory, regression pipelines, neural networks, random forests, collaborative filtering, and statistical models.',
    tags: ['book', 'education', 'math', 'ai', 'data-science', 'python', 'reference'],
    features: ['Detailed reference guides', 'Python code snippets', 'End-of-chapter validation study', 'Rich illustrative charts']
  },
  {
    id: 'prod-10',
    name: 'The Art of Simplicity Living',
    category: 'Books & Education',
    price: 899.00,
    imageUrl: 'bookminimal',
    description: 'An elegant photobook emphasizing modern decluttering, structural focus layout, calm mental space, wellness habits, and healthy habits for a relaxed digital existence.',
    tags: ['book', 'lifestyle', 'minimalist', 'zen', 'home', 'mindfulness', 'design'],
    features: ['Stunning high-impact photography', 'Practical home organizing plans', 'Mental wellness guidelines', 'Digital detox schedule']
  }
];

export const USER_PERSONAS: UserPersona[] = [
  {
    id: 'user-sarah',
    name: 'Sarah Jenkins',
    role: 'Full-Stack Developer',
    avatar: 'bg-indigo-500 text-white',
    bio: 'Desk optimization and coding enthusiast. Sarah spends long hours in front of screens and values ergonomic gear, premium peripheral gadgets, and heavy caffeine.',
    interests: ['Gadgets', 'Productivity', 'Home & Kitchen', 'Audio']
  },
  {
    id: 'user-david',
    name: 'David Carter',
    role: 'Fitness Coach & Athlete',
    avatar: 'bg-emerald-500 text-white',
    bio: 'Dedicated physical health instructor. David lives on the move, emphasizing clean diets, persistent daily training, hydration, and outdoor lifestyle trips.',
    interests: ['Fitness & Wellness', 'Audio', 'Home & Kitchen']
  },
  {
    id: 'user-maya',
    name: 'Maya Patel',
    role: 'UI Designer & Minimalism Blogger',
    avatar: 'bg-rose-500 text-white',
    bio: 'Promotes structural balance and mindful consumption. Maya enjoys quiet cafes, gorgeous interior design books, digital design, and premium items.',
    interests: ['Productivity', 'Books & Education', 'Gourmet Food', 'Gadgets']
  },
  {
    id: 'user-alex',
    name: 'Alex Rivera',
    role: 'New Shopper (Cold Start)',
    avatar: 'bg-amber-500 text-white',
    bio: 'Just created an account. Alex does not have any rating logs or deep historical preferences yet, serving as a clean test for e-commerce onboarding and hybrid logic.',
    interests: []
  }
];

// Seeded ratings
export const INITIAL_INTERACTIONS: Interaction[] = [
  // Sarah ratings
  { userId: 'user-sarah', productId: 'prod-1', type: 'rate', value: 5, timestamp: 1718910000000 }, // Cyberpunk Keyboard
  { userId: 'user-sarah', productId: 'prod-2', type: 'rate', value: 5, timestamp: 1718911000000 }, // Wrist Rest
  { userId: 'user-sarah', productId: 'prod-5', type: 'rate', value: 4, timestamp: 1718912000000 }, // Pour Over Kettle
  { userId: 'user-sarah', productId: 'prod-6', type: 'rate', value: 5, timestamp: 1718913000000 }, // Coffee Beans
  { userId: 'user-sarah', productId: 'prod-9', type: 'rate', value: 3, timestamp: 1718914000000 }, // ML Book
  { userId: 'user-sarah', productId: 'prod-3', type: 'click', timestamp: 1718915000000 }, // Clicked ANC Headphones

  // David ratings
  { userId: 'user-david', productId: 'prod-7', type: 'rate', value: 5, timestamp: 1718920000000 }, // Yoga Mat
  { userId: 'user-david', productId: 'prod-8', type: 'rate', value: 5, timestamp: 1718921000000 }, // Insulated Steel Flask
  { userId: 'user-david', productId: 'prod-3', type: 'rate', value: 4, timestamp: 1718922000000 }, // ANC Headphones
  { userId: 'user-david', productId: 'prod-4', type: 'rate', value: 2, timestamp: 1718923000000 }, // Minimalist Wallet (doesn't fit athletic wear)
  { userId: 'user-david', productId: 'prod-6', type: 'click', timestamp: 1718924000000 }, // Clicked Coffee Beans

  // Maya ratings
  { userId: 'user-maya', productId: 'prod-9', type: 'rate', value: 4, timestamp: 1718930000000 }, // ML Book
  { userId: 'user-maya', productId: 'prod-10', type: 'rate', value: 5, timestamp: 1718931000000 }, // Art of Simplicity
  { userId: 'user-maya', productId: 'prod-4', type: 'rate', value: 5, timestamp: 1718932000000 }, // Minimalist Wallet
  { userId: 'user-maya', productId: 'prod-2', type: 'rate', value: 4, timestamp: 1718933000000 }, // Wrist Rest
  { userId: 'user-maya', productId: 'prod-5', type: 'rate', value: 3, timestamp: 1718934000000 }, // Drip Kettle

  // Alex Rivera clicks one item to seed interest
  { userId: 'user-alex', productId: 'prod-1', type: 'click', timestamp: 1718940000000 } // Clicked Keyboard
];

export class RecommendationEngine {
  private interactions: Interaction[];

  constructor(customInteractions?: Interaction[]) {
    this.interactions = customInteractions || [...INITIAL_INTERACTIONS];
  }

  public getInteractions(): Interaction[] {
    return this.interactions;
  }

  public addInteraction(interaction: Interaction) {
    // If user rated it again, replace the previous rating
    if (interaction.type === 'rate') {
      this.interactions = this.interactions.filter(
        item => !(item.userId === interaction.userId && item.productId === interaction.productId && item.type === 'rate')
      );
    }
    this.interactions.push(interaction);
  }

  public resetInteractions() {
    this.interactions = [...INITIAL_INTERACTIONS];
  }

  /**
   * Calculates Collaborative Filtering score (User-Item similarity)
   * Scores range [0, 1] representing prediction strength
   */
  public getCollaborativeRecommendations(targetUserId: string): Record<string, number> {
    const scores: Record<string, number> = {};
    const ratingsMap: Record<string, Record<string, number>> = {};
    const allUserIds = new Set<string>();

    // Build user-product rating matrix
    this.interactions.forEach(inter => {
      if (inter.type === 'rate' && inter.value !== undefined) {
        if (!ratingsMap[inter.userId]) ratingsMap[inter.userId] = {};
        ratingsMap[inter.userId][inter.productId] = inter.value;
        allUserIds.add(inter.userId);
      }
    });

    // Handle Cold Start (No ratings found)
    if (!ratingsMap[targetUserId] || Object.keys(ratingsMap[targetUserId]).length === 0) {
      // Return flat prior or popularity logs
      return {};
    }

    const targetUserRatings = ratingsMap[targetUserId];

    // Compute User Similarities using Cosine Similarity
    const similarities: Record<string, number> = {};
    const calculateCosineSim = (ratesA: Record<string, number>, ratesB: Record<string, number>): number => {
      let dotProd = 0;
      let lenA = 0;
      let lenB = 0;

      // Calculate mean rating for normalization
      const keysA = Object.keys(ratesA);
      const keysB = Object.keys(ratesB);

      const meanA = keysA.reduce((sum, k) => sum + ratesA[k], 0) / keysA.length;
      const meanB = keysB.reduce((sum, k) => sum + ratesB[k], 0) / keysB.length;

      // Centered (Pearson) Cosine Similarity
      const items = new Set([...keysA, ...keysB]);
      let num = 0;
      let denomA = 0;
      let denomB = 0;

      items.forEach(itemId => {
        const rateA = ratesA[itemId];
        const rateB = ratesB[itemId];

        if (rateA !== undefined && rateB !== undefined) {
          const devA = rateA - meanA;
          const devB = rateB - meanB;
          num += devA * devB;
        }
        if (rateA !== undefined) {
          denomA += Math.pow(rateA - meanA, 2);
        }
        if (rateB !== undefined) {
          denomB += Math.pow(rateB - meanB, 2);
        }
      });

      if (denomA === 0 || denomB === 0) return 0;
      return num / (Math.sqrt(denomA) * Math.sqrt(denomB));
    };

    allUserIds.forEach(otherId => {
      if (otherId === targetUserId) return;
      const otherRatings = ratingsMap[otherId];
      similarities[otherId] = calculateCosineSim(targetUserRatings, otherRatings);
    });

    // Predict items not rated by targetUser
    PRODUCTS.forEach(product => {
      if (targetUserRatings[product.id] !== undefined) return; // already rated

      let weightedSum = 0;
      let similaritySum = 0;

      allUserIds.forEach(otherId => {
        if (otherId === targetUserId) return;
        const otherRatings = ratingsMap[otherId];
        const sim = similarities[otherId];

        if (sim > 0 && otherRatings && otherRatings[product.id] !== undefined) {
          weightedSum += sim * otherRatings[product.id];
          similaritySum += sim;
        }
      });

      if (similaritySum > 0) {
        // Predicted rating out of 5
        const predictedRating = weightedSum / similaritySum;
        // Normalize rating [1, 5] into [0, 1]
        scores[product.id] = (predictedRating - 1) / 4;
      } else {
        scores[product.id] = 0;
      }
    });

    return scores;
  }

  /**
   * Content NLP Match on Tags and Feature description
   * Scores range [0, 1] based on Jaccard/TFIDF matching
   */
  public getContentRecommendations(targetUserId: string): Record<string, number> {
    const scores: Record<string, number> = {};

    // Generate User Interest profile of tags based on clicked/purchased/highly-rated products
    const userProfileTags: Set<string> = new Set();
    const ratedCategoryCount: Record<string, number> = {};

    this.interactions.forEach(inter => {
      if (inter.userId !== targetUserId) return;

      const p = PRODUCTS.find(prod => prod.id === inter.productId);
      if (!p) return;

      // High weighting to content tags based on level of interaction
      let weight = 1;
      if (inter.type === 'rate') {
        weight = (inter.value || 3) >= 4 ? 3 : 1;
      } else if (inter.type === 'purchase') {
        weight = 4;
      }

      p.tags.forEach(tag => {
        for (let w = 0; w < weight; w++) {
          userProfileTags.add(tag);
        }
      });

      ratedCategoryCount[p.category] = (ratedCategoryCount[p.category] || 0) + weight;
    });

    // Fallback if user profile is empty (Active Interest alignment)
    const persona = USER_PERSONAS.find(u => u.id === targetUserId);
    if (persona && persona.interests) {
      persona.interests.forEach(interest => {
        userProfileTags.add(interest.toLowerCase());
        // Category tags
        PRODUCTS.forEach(p => {
          if (p.category.toLowerCase() === interest.toLowerCase()) {
            p.tags.forEach(tag => userProfileTags.add(tag));
          }
        });
      });
    }

    const userProfileTagArr = Array.from(userProfileTags);

    PRODUCTS.forEach(product => {
      // Don't score what is already hard rated
      const ratedByUser = this.interactions.some(i => i.userId === targetUserId && i.productId === product.id && i.type === 'rate');
      if (ratedByUser) {
        scores[product.id] = 0;
        return;
      }

      // Calculate Jaccard similarity or overlap of words/tags
      const itemTags = product.tags;
      const intersection = itemTags.filter(item => userProfileTagArr.includes(item));
      const union = Array.from(new Set([...itemTags, ...userProfileTagArr]));

      let tagMatch = union.length > 0 ? intersection.length / union.length : 0;

      // Category match boost
      let catMatchBoost = 0;
      const personaInterests = persona?.interests || [];
      if (personaInterests.some(ci => ci.toLowerCase() === product.category.toLowerCase())) {
        catMatchBoost = 0.3;
      }

      // Calculate final content score & clamp
      scores[product.id] = Math.min(1, tagMatch * 0.7 + catMatchBoost);
    });

    return scores;
  }

  /**
   * Stochastic Gradient Descent Matrix Factorization (Latent Factors)
   * Predicts complete matrix items using K=2 dimensions.
   */
  public getMatrixFactorization(targetUserId: string): { recommendations: Record<string, number>, latentPoints: LatentFactorPoint[] } {
    const scores: Record<string, number> = {};
    const latentPoints: LatentFactorPoint[] = [];

    const userMap = USER_PERSONAS;
    const itemMap = PRODUCTS;

    const U = userMap.length;
    const I = itemMap.length;
    const K = 2; // 2 Dimensions for 2D visual projection!

    // Initialize Latent matrices with deterministic values so rendering is stable, plus seed updates
    const P: Record<string, number[]> = {};
    const Q: Record<string, number[]> = {};

    userMap.forEach((user, idx) => {
      // seeded deterministic initial coordinate
      const angle = (idx / U) * 2 * Math.PI;
      P[user.id] = [Math.cos(angle) * 0.5, Math.sin(angle) * 0.5];
    });

    itemMap.forEach((product, idx) => {
      const angle = (idx / I) * 2 * Math.PI + Math.PI / 4;
      Q[product.id] = [Math.cos(angle) * 0.5, Math.sin(angle) * 0.5];
    });

    // Hyperparameters
    const alpha = 0.05; // learning rate
    const beta = 0.02;  // regularization
    const epochs = 150;

    // Run Gradient Descent iterations back-end
    for (let step = 0; step < epochs; step++) {
      this.interactions.forEach(inter => {
        if (inter.type !== 'rate' || inter.value === undefined) return;
        const uId = inter.userId;
        const iId = inter.productId;

        if (!P[uId] || !Q[iId]) return;

        const dot = P[uId][0] * Q[iId][0] + P[uId][1] * Q[iId][1];

        // ratings centered around 3.0 (from 1-5 range)
        const ratingCentered = inter.value - 3.0;
        const error = ratingCentered - dot;

        // SGD Updates
        const p0 = P[uId][0];
        const p1 = P[uId][1];
        const q0 = Q[iId][0];
        const q1 = Q[iId][1];

        P[uId][0] += alpha * (error * q0 - beta * p0);
        P[uId][1] += alpha * (error * q1 - beta * p1);

        Q[iId][0] += alpha * (error * p0 - beta * q0);
        Q[iId][1] += alpha * (error * p1 - beta * q1);
      });
    }

    // Scale coordinates for plotting on a neat [-100, 100] grid
    // Find bounds to normalize nicely
    let maxX = 0.1, maxY = 0.1;

    userMap.forEach(u => {
      maxX = Math.max(maxX, Math.abs(P[u.id][0]));
      maxY = Math.max(maxY, Math.abs(P[u.id][1]));
    });

    itemMap.forEach(p => {
      maxX = Math.max(maxX, Math.abs(Q[p.id][0]));
      maxY = Math.max(maxY, Math.abs(Q[p.id][1]));
    });

    const scaleX = 80 / maxX;
    const scaleY = 80 / maxY;

    // Push users
    userMap.forEach((user, idx) => {
      latentPoints.push({
        id: `user-${user.id}`,
        name: user.name,
        type: 'user',
        x: P[user.id][0] * scaleX,
        y: P[user.id][1] * scaleY,
        color: user.id === targetUserId ? '#ef4444' : '#6366f1' // highlighted current user
      });
    });

    // Push items
    itemMap.forEach(product => {
      latentPoints.push({
        id: `item-${product.id}`,
        name: product.name,
        type: 'item',
        x: Q[product.id][0] * scaleX,
        y: Q[product.id][1] * scaleY,
        color: '#10b981' // emerald green for products
      });
    });

    // Populate ratings projections
    const userVec = P[targetUserId];
    PRODUCTS.forEach(product => {
      // predictions ratings dot product
      const itemVec = Q[product.id];
      const predCentered = userVec[0] * itemVec[0] + userVec[1] * itemVec[1];
      const predValue = predCentered + 3.0; // uncenter back to [1, 5]

      // Clamp prediction in rating range and map to score [0, 1]
      const finalVal = Math.max(1, Math.min(5, predValue));
      scores[product.id] = (finalVal - 1) / 4;
    });

    return { recommendations: scores, latentPoints };
  }

  /**
   * Compiles elements and offers a Hybrid Recommendation score based on sliders
   */
  public generateHybridRecs(
    targetUserId: string,
    weights: { collaborative: number; content: number; matrixSelection: number }
  ): { recs: RecResult[], latentPoints: LatentFactorPoint[] } {
    const collabScores = this.getCollaborativeRecommendations(targetUserId);
    const contentScores = this.getContentRecommendations(targetUserId);
    const { recommendations: matrixScores, latentPoints } = this.getMatrixFactorization(targetUserId);

    // Filter out items already rated by targetUser
    const ratedProductIds = new Set(
      this.interactions
        .filter(i => i.userId === targetUserId && i.type === 'rate')
        .map(i => i.productId)
    );

    const totalWeight = weights.collaborative + weights.content + weights.matrixSelection;
    const normWeights = {
      collab: totalWeight > 0 ? weights.collaborative / totalWeight : 0,
      content: totalWeight > 0 ? weights.content / totalWeight : 0,
      matrix: totalWeight > 0 ? weights.matrixSelection / totalWeight : 0
    };

    const recs: RecResult[] = PRODUCTS.map(product => {
      const cScore = collabScores[product.id] ?? 0;
      const nScore = contentScores[product.id] ?? 0;
      const mScore = matrixScores[product.id] ?? 0;

      // Weighted score
      const finalScore = (cScore * normWeights.collab) + (nScore * normWeights.content) + (mScore * normWeights.matrix);

      // Construct a meaningful, authentic explanation based on weights and high sub-scores
      let reason = 'Recommended based on general popularity and fit.';
      if (ratedProductIds.has(product.id)) {
        reason = `You rated this product or interacted with it deeply.`;
      } else {
        const triggers: string[] = [];
        if (normWeights.content > 0 && nScore > 0.5) {
          triggers.push(`matches descriptors like "${product.tags.slice(0, 2).join(', ')}"`);
        }
        if (normWeights.collab > 0 && cScore > 0.4) {
          triggers.push('popular with customers with matching tastes');
        }
        if (normWeights.matrix > 0 && mScore > 0.6) {
          triggers.push('strongly aligned latent preferences');
        }

        if (triggers.length > 0) {
          reason = `Strong match: ${triggers.join(' and ')}.`;
        } else if (product.category) {
          reason = `Aligns with your category interests in ${product.category}.`;
        }
      }

      return {
        productId: product.id,
        product,
        score: parseFloat(finalScore.toFixed(3)),
        factors: {
          collaborativeScore: parseFloat(cScore.toFixed(3)),
          contentScore: parseFloat(nScore.toFixed(3)),
          matrixScore: parseFloat(mScore.toFixed(3))
        },
        reason
      };
    });

    // Remove already catalogued items and sort by recommendation score descending
    const finalRecs = recs
      .filter(r => !ratedProductIds.has(r.productId))
      .sort((a, b) => b.score - a.score);

    return { recs: finalRecs, latentPoints };
  }
}
