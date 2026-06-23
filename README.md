# E-Commerce Recommender System

A highly interactive full-stack e-commerce simulation environment built with **React**, **TypeScript**, and **Express**. The app showcases dynamic real-time recommendation updates using a custom hybrid algorithm blending **Collaborative Filtering (Cosine Similarity)**, **Content-Based Filtering (Jaccard NLP Tag matching)**, and latent-factor **Stochastic Gradient Descent (SGD) SVD Matrix Factorization**.

---

## 📸 Screenshots

\
### 1.
![E-commerce Storefront Mockup](https://github.com/ManasviShetty7/E-Commerce_Recommender/blob/main/ERE%201.png)
### 2.
![E-commerce Storefront Mockup](https://github.com/ManasviShetty7/E-Commerce_Recommender/blob/main/ERE%202.png)
### 3.
![E-commerce Storefront Mockup](https://github.com/ManasviShetty7/E-Commerce_Recommender/blob/main/ERE%203.png)
### 4.
![E-commerce Storefront Mockup](https://github.com/ManasviShetty7/E-Commerce_Recommender/blob/main/ERE%204.png)

---

## 🚀 Key Features

* **Real-time Engine Learning**: All custom clicks, ratings, and purchases made by simulated personas immediately update user profiles and recalculate recommendations on subsequent renders.
* **Hybrid Model Architecture**: Combine three major recommendation strategies using intuitive slider configurations:
  1. **Collaborative Filtering**: Determines taste similarity between profiles using centered Pearson Cosine similarity metrics of ratings profiles.
  2. **Content-Based Matching**: Profiles interests and tags Jaccard overlaps using natural language token attributes.
  3. **SGD Matrix Factorization**: Computes latent user-item interactions down to a $K=2$ vector coordinate plane.
* **SVG Cartesian Latent Plotter**: Interactive mathematical mapping visualizer projecting items and current shoppers adjacent to one another based on latent factorization alignment.
* **Authentic INR Pricing**: Modeled with realistic, curated Indian tech-market item prices.

---

## 🛠️ The Math and Core Algorithms

### 1. Collaborative Filtering (User-Item Vectors)
We compute similarities between the active user $u$ and every other user $v$ using **Centered Cosine (Pearson Correlation) Similarity**:

$$sim(u, v) = \frac{\sum_{i \in I_{uv}} (r_{u,i} - \bar{r}_u)(r_{v,i} - \bar{r}_v)}{\sqrt{\sum_{i \in I_{uv}} (r_{u,i} - \bar{r}_u)^2} \sqrt{\sum_{i \in I_{uv}} (r_{v,i} - \bar{r}_v)^2}}$$

Where $I_{uv}$ is the set of items rated by both users, and $\bar{r}_u$ is user $u$'s mean rating. The engine then forecasts missing ratings as a weighted combination of neighbor activities.

### 2. Content-Based Matching (NLP Tag Intersections)
User interest profile vectors ($U_T$) are built dynamically from past clicks, purchases, and hard interests. Jaccard similarity evaluates the intersection over the union with product catalog tag tokens ($I_T$):

$$Jaccard(U_T, I_T) = \frac{|U_T \cap I_T|}{|U_T \cup I_T|}$$

### 3. Matrix Factorization (Latent Factors SVD)
The rating matrix is decomposed into lower-rank user $P$ and item $Q$ latent arrays using Stochastic Gradient Descent (SGD) learning to minimize square errors:

$$e_{u,i} = r_{u,i} - P_u \cdot Q_i^T$$

$$P_{u, c} \leftarrow P_{u, c} + \alpha \cdot (e_{u,i} \cdot Q_{i, c} - \beta \cdot P_{u, c})$$

$$Q_{i, c} \leftarrow Q_{i, c} + \alpha \cdot (e_{u,i} \cdot P_{u, c} - \beta \cdot Q_{i, c})$$

---

## 📦 Installation & Setup

Ensure you have **Node.js** (v18+) and **npm** installed on your local machine.

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/ecommerce-recommender-system.git
   cd ecommerce-recommender-system
