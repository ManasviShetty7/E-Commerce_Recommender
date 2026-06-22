import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { RecommendationEngine } from './src/recommender.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize recommendation engine with default interactions
  const engine = new RecommendationEngine();

  // API Route: Reset engine state
  app.post('/api/reset', (req, res) => {
    try {
      engine.resetInteractions();
      res.json({ success: true, message: 'Recommendation engine reset successfully.' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // API Route: Submit user interaction
  app.post('/api/interact', (req, res) => {
    try {
      const { userId, productId, type, value } = req.body;
      if (!userId || !productId || !type) {
        return res.status(400).json({ error: 'Missing required parameters: userId, productId, type' });
      }

      engine.addInteraction({
        userId,
        productId,
        type,
        value: value !== undefined ? Number(value) : undefined,
        timestamp: Date.now()
      });

      res.json({ success: true, message: 'Interaction recorded.' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // API Route: Generate recommendations & calculate scores
  app.post('/api/recommend', (req, res) => {
    try {
      const { userId, weights } = req.body;
      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      // Default weights if not specified
      const finalWeights = weights || { collaborative: 40, content: 30, matrixSelection: 30 };

      const { recs, latentPoints } = engine.generateHybridRecs(userId, finalWeights);
      const interactions = engine.getInteractions();

      res.json({
        recs,
        latentPoints,
        interactions: interactions.filter(i => i.userId === userId)
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Serve static assets out of client distribution
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server launched successfully at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to launch full-stack server:', err);
});
