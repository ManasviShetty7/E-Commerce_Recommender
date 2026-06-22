import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Sliders, 
  User, 
  Users, 
  ShoppingBag, 
  Star, 
  Compass, 
  Cpu, 
  BookOpen, 
  Coffee, 
  Dumbbell, 
  Info,
  ChevronRight,
  TrendingUp,
  Tag,
  AlertCircle,
  Headphones
} from 'lucide-react';
import { Product, UserPersona, Interaction, RecResult, LatentFactorPoint } from './types.js';
import { PRODUCTS, USER_PERSONAS } from './recommender.js';

export default function App() {
  // State management
  const [personas] = useState<UserPersona[]>(USER_PERSONAS);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('user-sarah');
  const [products] = useState<Product[]>(PRODUCTS);
  
  // Weights for recommendation algorithms
  const [weights, setWeights] = useState({
    collaborative: 40,
    content: 30,
    matrixSelection: 30
  });

  // Recommendation engine calculations returned by Server
  const [recs, setRecs] = useState<RecResult[]>([]);
  const [latentPoints, setLatentPoints] = useState<LatentFactorPoint[]>([]);
  const [userInteractions, setUserInteractions] = useState<Interaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [interactionError, setInteractionError] = useState<string | null>(null);

  // Modal / Detail state for interactive view
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'storefront' | 'algorithms'>('storefront');
  const [userRatingInput, setUserRatingInput] = useState<number>(5);

  // Find active profile details
  const currentPersona = personas.find(p => p.id === selectedProfileId) || personas[0];

  // Helper: Load recommendations from Express server
  const fetchRecommendations = async (profileId: string, currentWeights: typeof weights) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: profileId,
          weights: currentWeights
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch calculated recommendations from server.');
      }

      const data = await response.json();
      setRecs(data.recs);
      setLatentPoints(data.latentPoints);
      setUserInteractions(data.interactions);
      setInteractionError(null);
    } catch (err: any) {
      console.error(err);
      setInteractionError('Server connection error. Please make sure server is online.');
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger loading when persona or weights change
  useEffect(() => {
    fetchRecommendations(selectedProfileId, weights);
  }, [selectedProfileId, weights]);

  // Helper: Post action logs to Server
  const handleInteraction = async (productId: string, type: 'click' | 'rate' | 'purchase', ratingValue?: number) => {
    try {
      const payload: any = {
        userId: selectedProfileId,
        productId,
        type
      };
      if (type === 'rate' && ratingValue !== undefined) {
        payload.value = ratingValue;
      }

      const response = await fetch('/api/interact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Could not submit interaction');
      }

      // Re-fetch calculations to showcase real-time learning updates!
      await fetchRecommendations(selectedProfileId, weights);
    } catch (err: any) {
      setInteractionError(`Failed sending action: ${err.message}`);
    }
  };

  // Reset Server Engine to pristine parameters
  const handleResetEngine = async () => {
    try {
      const response = await fetch('/api/reset', { method: 'POST' });
      if (!response.ok) throw new Error('Could not reset backend.');
      
      setWeights({
        collaborative: 40,
        content: 30,
        matrixSelection: 30
      });
      await fetchRecommendations(selectedProfileId, {
        collaborative: 40,
        content: 30,
        matrixSelection: 30
      });
    } catch (err: any) {
      setInteractionError(`Reset failure: ${err.message}`);
    }
  };

  // Render Product Category Icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Gadgets':
        return <Cpu id="icon-gadgets" className="w-5 h-5 text-indigo-500" />;
      case 'Productivity':
        return <Sliders id="icon-productivity" className="w-5 h-5 text-purple-500" />;
      case 'Audio':
        return <Headphones id="icon-audio" className="w-5 h-5 text-cyan-500" />;
      case 'Home & Kitchen':
        return <Coffee id="icon-kitchen" className="w-5 h-5 text-amber-500" />;
      case 'Gourmet Food':
        return <Coffee id="icon-food" className="w-5 h-5 text-orange-500" />;
      case 'Fitness & Wellness':
        return <Dumbbell id="icon-fitness" className="w-5 h-5 text-emerald-500" />;
      case 'Books & Education':
        return <BookOpen id="icon-books" className="w-5 h-5 text-teal-500" />;
      default:
        return <ShoppingBag id="icon-default" className="w-5 h-5 text-gray-500" />;
    }
  };

  // Get Interactive State Badges for Items
  const getItemStatusBadge = (productId: string) => {
    const rates = userInteractions.find(i => i.productId === productId && i.type === 'rate');
    const clicks = userInteractions.filter(i => i.productId === productId && i.type === 'click');
    const purchases = userInteractions.some(i => i.productId === productId && i.type === 'purchase');

    if (purchases) {
      return <span id={`badge-p-${productId}`} className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">Purchased</span>;
    }
    if (rates) {
      return <span id={`badge-r-${productId}`} className="px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 border border-indigo-300">Rated {rates.value}★</span>;
    }
    if (clicks.length > 0) {
      return <span id={`badge-c-${productId}`} className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-800 border border-slate-300">{clicks.length} View{clicks.length > 1 ? 's' : ''}</span>;
    }
    return null;
  };

  const selectedProduct = products.find(p => p.id === activeProductId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Dynamic Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-indigo-600 text-white rounded-lg">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </span>
              <h1 className="text-xl font-semibold tracking-tight text-slate-900">E-Commerce Recommendation Engine</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto">
            <button
              id="reset-engine-btn"
              onClick={handleResetEngine}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-slate-200 text-xs font-medium rounded-md hover:bg-slate-50 text-slate-600 bg-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Dataset State
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-8">
        
        {interactionError && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-xs font-medium">{interactionError}</p>
          </div>
        )}

        {/* SECTION 1: Active User Personas Simulator */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="mb-4">
            <h2 className="text-base font-medium text-slate-900 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-600" />
              Step 1: Choose Your Active User Persona
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Switch customer profiles instantly to see how collaborative filters and latent matrix factors dynamically redirect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {personas.map((persona) => {
              const isSelected = selectedProfileId === persona.id;
              return (
                <button
                  id={`persona-select-${persona.id}`}
                  key={persona.id}
                  onClick={() => {
                    setSelectedProfileId(persona.id);
                    setActiveProductId(null);
                  }}
                  className={`text-left p-4 rounded-lg border transition-all relative overflow-hidden flex flex-col h-full bg-white cursor-pointer ${
                    isSelected 
                      ? 'border-indigo-600 ring-2 ring-indigo-500/10 shadow-xs' 
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute right-0 top-0 w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-bl-lg">
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${persona.avatar}`}>
                      {persona.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900 truncate pr-5">{persona.name}</h4>
                      <p className="text-[10px] text-indigo-600 font-medium truncate">{persona.role}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 flex-1 line-clamp-3 mb-3 leading-relaxed">
                    {persona.bio}
                  </p>
                  
                  {persona.interests.length > 0 ? (
                    <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-slate-100">
                      {persona.interests.slice(0, 3).map((interest, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[9px] font-medium rounded">
                          {interest}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[9px] text-amber-600 font-medium bg-amber-50 border border-amber-200/50 px-1.5 py-0.5 rounded mt-auto pt-0.5 self-start">
                      Simulation Sandbox Cold Start (Pure Match)
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: Interactive Sandbox & Storefront Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Dual Mode (Product Storefront Shelf vs Algorithm Visualization) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Navigation Tabs */}
            <div className="bg-slate-200/60 p-1 rounded-lg flex gap-1 self-start">
              <button
                id="switch-tab-storefront"
                onClick={() => setActiveTab('storefront')}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'storefront' 
                    ? 'bg-white text-slate-950 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Storefront Simulation Environment
              </button>
              <button
                id="switch-tab-algorithms"
                onClick={() => setActiveTab('algorithms')}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'algorithms' 
                    ? 'bg-white text-slate-950 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                Recommendation Engine Lab
              </button>
            </div>

            {/* TAB CONTENT: STOREFRONT */}
            {activeTab === 'storefront' && (
              <div className="space-y-6">
                
                {/* Store shelf instruction banner */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg border border-indigo-200/50">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900">Interactive E-Commerce Sandbox Shelf</h3>
                    <p className="text-[11px] text-slate-600 leading-normal mt-0.5">
                      Logged-in as <strong className="text-indigo-700">{currentPersona.name}</strong>. Rate products, simulate views, and check out items. Your interaction data is instantly mapped back into the collaborative similarity vectors and SGD factor updates.
                    </p>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product) => {
                    const isSelected = activeProductId === product.id;
                    return (
                      <div
                        id={`product-card-${product.id}`}
                        key={product.id}
                        className={`bg-white rounded-xl border p-5 transition-all flex flex-col justify-between ${
                          isSelected 
                            ? 'border-indigo-600 shadow-sm' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1.5">
                              {getCategoryIcon(product.category)}
                              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                                {product.category}
                              </span>
                            </div>
                            {getItemStatusBadge(product.id)}
                          </div>

                          <h3 className="text-xs font-bold text-slate-900 leading-tight mb-1">
                            {product.name}
                          </h3>
                          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-4">
                            {product.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                          <span className="text-xs font-extrabold text-slate-900">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          
                          <div className="flex gap-1.5">
                            <button
                              id={`detail-btn-${product.id}`}
                              onClick={() => {
                                handleInteraction(product.id, 'click');
                                setActiveProductId(product.id);
                              }}
                              className="px-2.5 py-1.5 border border-slate-200/80 hover:border-slate-300 text-[10px] font-medium rounded-md hover:bg-slate-50 transition-all cursor-pointer"
                            >
                              Explore Details
                            </button>
                            <button
                              id={`quick-buy-${product.id}`}
                              onClick={() => handleInteraction(product.id, 'purchase')}
                              className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-medium rounded-md shadow-xs transition-colors cursor-pointer"
                            >
                              Buy
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Product Detail Panel / Quick Interaction Drawer */}
                {selectedProduct && (
                  <div id="product-detail-expanded" className="bg-slate-900 text-white rounded-xl p-6 shadow-sm border border-slate-850">
                    <h3 className="text-xs tracking-wider uppercase text-indigo-400 font-bold mb-1">Interactive Catalog Details</h3>
                    <h2 className="text-base font-semibold mb-2">{selectedProduct.name}</h2>
                    <p className="text-xs text-slate-300 mb-4 leading-relaxed">{selectedProduct.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-[10px] uppercase font-semibold text-slate-400 mb-1">Highlighted Core Features:</h4>
                        <ul className="space-y-1">
                          {selectedProduct.features.map((feat, idx) => (
                            <li key={idx} className="text-xs text-slate-300 flex items-center gap-1.5">
                              <ChevronRight className="w-3 h-3 text-indigo-400 shrink-0" />
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[10px] uppercase font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                          <Tag className="w-3 h-3 text-indigo-400" />
                          Tag Descriptors (NLP Base)
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedProduct.tags.map((tag, idx) => (
                            <span key={idx} className="bg-slate-800 text-indigo-300 text-[9px] font-semibold tracking-wide px-2 py-0.5 rounded border border-slate-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-800 pt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-300 font-medium shrink-0">Submit Custom Rating:</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              id={`rate-${selectedProduct.id}-star-${star}`}
                              key={star}
                              onClick={() => setUserRatingInput(star)}
                              className="p-1 cursor-pointer focus:outline-hidden"
                            >
                              <Star className={`w-5 h-5 ${star <= userRatingInput ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                            </button>
                          ))}
                        </div>
                        <button
                          id="submit-rating-btn"
                          onClick={() => handleInteraction(selectedProduct.id, 'rate', userRatingInput)}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-md transition-all shrink-0 cursor-pointer"
                        >
                          Send Rating
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-400 block p-0.5">Mock Selling Value:</span>
                        <span className="text-sm font-black text-indigo-300">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB CONTENT: RECOMMENDATION LAB */}
            {activeTab === 'algorithms' && (
              <div className="space-y-6">
                
                {/* Sliders Configuration */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                  <div className="mb-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dynamic Weight Parameter Lab</h3>
                    <p className="text-[11px] text-slate-500">Tune the recommendation blends manually and watch how rankings shift vectors immediately.</p>
                  </div>

                  <div className="space-y-4">
                    
                    {/* Collaborative Filtering slider */}
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-700 font-semibold mb-1">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-indigo-500" />
                          Collaborative Filtering Weight
                        </span>
                        <span>{weights.collaborative}%</span>
                      </div>
                      <input
                        id="weight-collab"
                        type="range"
                        min="0"
                        max="100"
                        value={weights.collaborative}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const rem = 100 - val;
                          const half = Math.floor(rem / 2);
                          setWeights({
                            collaborative: val,
                            content: half,
                            matrixSelection: rem - half
                          });
                        }}
                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>

                    {/* Content Filtering slider */}
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-700 font-semibold mb-1">
                        <span className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-purple-500" />
                          Content NLP Match Weight (Tags/Features)
                        </span>
                        <span>{weights.content}%</span>
                      </div>
                      <input
                        id="weight-content"
                        type="range"
                        min="0"
                        max="100"
                        value={weights.content}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const rem = 100 - val;
                          const half = Math.floor(rem / 2);
                          setWeights({
                            content: val,
                            collaborative: half,
                            matrixSelection: rem - half
                          });
                        }}
                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                    </div>

                    {/* Matrix Factorization slider */}
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-700 font-semibold mb-1">
                        <span className="flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                          SGD Latent Matrix Factorization Weight
                        </span>
                        <span>{weights.matrixSelection}%</span>
                      </div>
                      <input
                        id="weight-matrix"
                        type="range"
                        min="0"
                        max="100"
                        value={weights.matrixSelection}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const rem = 100 - val;
                          const half = Math.floor(rem / 2);
                          setWeights({
                            matrixSelection: val,
                            collaborative: half,
                            content: rem - half
                          });
                        }}
                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                    </div>

                  </div>
                </div>

                {/* THE LATENT FACTOR PLOT (SVG IMPLEMENTATION) */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">SGD Matrix Factorization Latent Coordinate Space (K=2)</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Visualizing active user coordinates and items. Proximity indicates strong latent factor alignment (e.g., similar tastes).
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-lg flex items-center justify-center relative overflow-hidden h-[340px]">
                    <div className="absolute top-2 left-2 text-[9px] text-slate-500 font-semibold uppercase tracking-wider bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                      Mathematical Latent Mapping Plane
                    </div>

                    {/* SVG CARTESIAN PLANE */}
                    <svg className="w-full h-full max-w-[450px] max-h-[300px]" viewBox="0 0 240 240">
                      
                      {/* Grid Lines */}
                      <line x1="120" y1="0" x2="120" y2="240" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="120" x2="240" y2="120" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                      
                      {/* X Y Axes Headers */}
                      <text x="215" y="115" fill="#64748b" className="text-[8px] font-bold">Factor 1</text>
                      <text x="125" y="15" fill="#64748b" className="text-[8px] font-bold">Factor 2</text>

                      {/* Render Points */}
                      {latentPoints.map((point) => {
                        // Translate relative coordinate range [-100, 100] cleanly to 240x240 box
                        // Center is 120, 120
                        const cx = 120 + (point.x * 120 / 100);
                        const cy = 120 - (point.y * 120 / 100); // SVG inversed Y

                        const isCurrentUser = point.id === `user-${selectedProfileId}`;

                        return (
                          <g key={point.id} className="cursor-pointer group">
                            {/* Outer highlight circle for current user */}
                            {isCurrentUser && (
                              <circle 
                                cx={cx} 
                                cy={cy} 
                                r="11" 
                                fill="transparent" 
                                stroke="#f43f5e" 
                                strokeWidth="1.5" 
                                className="animate-ping"
                              />
                            )}

                            {/* Point representation */}
                            <circle
                              cx={cx}
                              cy={cy}
                              r={point.type === 'user' ? (isCurrentUser ? '7' : '6') : '5'}
                              fill={point.color}
                              className="transition-all duration-300 group-hover:scale-125"
                            />

                            {/* Tiny Type Indicator Icon inside */}
                            {point.type === 'user' && (
                              <circle cx={cx} cy={cy} r="2" fill="white" />
                            )}

                            {/* SVG Tooltip */}
                            <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              <rect
                                x={cx > 120 ? cx - 110 : cx + 10}
                                y={cy > 120 ? cy - 35 : cy + 10}
                                width="105"
                                height="28"
                                rx="4"
                                fill="#0f172a"
                                stroke="#334155"
                                strokeWidth="1"
                              />
                              <text
                                x={cx > 120 ? cx - 105 : cx + 15}
                                y={cy > 120 ? cy - 23 : cy + 22}
                                fill="white"
                                className="text-[7.5px] font-extrabold"
                              >
                                {point.name.length > 20 ? point.name.slice(0, 18) + '..' : point.name}
                              </text>
                              <text
                                x={cx > 120 ? cx - 105 : cx + 15}
                                y={cy > 120 ? cy - 13 : cy + 32}
                                fill="#a1a1aa"
                                className="text-[7px]"
                              >
                                {point.type === 'user' ? 'User vector' : 'Product vector'} ({point.x.toFixed(0)}, {point.y.toFixed(0)})
                              </text>
                            </g>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="flex justify-center gap-6 mt-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold p-1">
                      <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full inline-block"></span>
                      Other Shoppers
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold p-1">
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full inline-block"></span>
                      Active User (Sarah/David/Maya)
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold p-1">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block"></span>
                      E-Commerce Items
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* RIGHT PANEL: Live Recommendations Pipeline & Insights */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Live Recommendation Engine calculations Output */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
              <div className="mb-4">
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[9px] font-bold tracking-wider rounded uppercase">Compute Layer</span>
                <h3 className="text-sm font-semibold text-slate-900 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  Personalized Suggestion Queue
                </h3>
                <p className="text-[11px] text-slate-500">Items ranked dynamically based on blended formulas.</p>
              </div>

              {isLoading ? (
                <div className="space-y-4 py-8 text-center">
                  <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-[10px] text-slate-500 font-medium">Re-orienting recommendation coordinates...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recs.slice(0, 5).map((rec, index) => {
                    const rank = index + 1;
                    return (
                      <div 
                        id={`rec-item-${rec.productId}`}
                        key={rec.productId} 
                        className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 hover:border-slate-350 transition-all flex flex-col gap-2"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div className="flex items-center gap-1.5">
                            <span className="w-5 h-5 flex items-center justify-center font-extrabold bg-indigo-50 text-indigo-700 text-[10px] border border-indigo-200 rounded border-dashed shrink-0">
                              #{rank}
                            </span>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                                {rec.product.name}
                              </h4>
                              <p className="text-[9px] text-slate-400 font-semibold">{rec.product.category}</p>
                            </div>
                          </div>
                          
                          <div className="text-right shrink-0">
                            <span className="text-[10px] font-extrabold text-indigo-600">
                             {(rec.score * 100).toFixed(0)}% Match
                            </span>
                          </div>
                        </div>

                        {/* Breakdown scores */}
                        <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-slate-200/50">
                          <div className="text-center p-0.5">
                            <span className="text-[8px] text-slate-500 block">Collab</span>
                            <span className="text-[9px] font-bold text-slate-700">{Math.round((rec.factors?.collaborativeScore ?? 0) * 100)}%</span>
                          </div>
                          <div className="text-center p-0.5">
                            <span className="text-[8px] text-slate-500 block">Content</span>
                            <span className="text-[9px] font-bold text-teal-700">{Math.round((rec.factors?.contentScore ?? 0) * 100)}%</span>
                          </div>
                          <div className="text-center p-0.5">
                            <span className="text-[8px] text-slate-500 block">SGD SVD</span>
                            <span className="text-[9px] font-bold text-indigo-700">{Math.round((rec.factors?.matrixScore ?? 0) * 100)}%</span>
                          </div>
                        </div>

                        <p className="text-[10px] text-slate-600 bg-white border border-slate-100 rounded p-1.5 mt-1 leading-snug">
                          {rec.reason}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest flex items-center justify-center gap-1 bg-slate-50 py-2 px-4 rounded-md w-fit mx-auto border border-slate-200/50">
            <Cpu className="w-3 h-3 text-indigo-500" />
            Designed With Mathematical Integrity
          </p>
        </div>
      </footer>

    </div>
  );
}
