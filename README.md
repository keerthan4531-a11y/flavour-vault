<div align="center">
  <h1>🍌 FLAVOUR VAULT</h1>
  
  **The ultimate, AI-powered premium recipe collection app.** <br>
  *Built with React, TypeScript, and Framer Motion.*

  [![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)
  [![Vite](https://img.shields.io/badge/Vite-4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](#)
  [![Inixa AI](https://img.shields.io/badge/AI-Inixa-e10600?style=for-the-badge&logo=openai&logoColor=white)](#)

</div>

<br>

<div align="center">
  <img src="https://raw.githubusercontent.com/keerthan4531-a11y/flavour-vault/main/public/images/hero-food.png" width="100%" alt="App Preview" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(225,6,0,0.2);"/>
</div>

---

## 🌟 Features

Flavour Vault is not just a recipe app; it's a premium culinary experience.

*   **🍷 Dark & Bold Aesthetic:** A stunning "velvet wine" dark mode with "blood-red" accents and glassmorphism.
*   **🧠 AI Kitchen (Powered by INIXA):**
    *   **Recipe Generator:** Tell it what ingredients you have, and watch the AI stream a complete, detailed recipe in real-time.
    *   **Auto Writer:** Turn rough cooking notes into professional, formatted recipes.
    *   **Surprise Me:** Get random, creative dishes based on AI inspiration.
*   **💬 Floating AI Assistant:** Need an ingredient substitute? Ask INIXA, the floating chat widget available on every page.
*   **📸 Gallery & Organization:** Visually stunning masonry grid galleries for your food photography.
*   **❤️ Local-First Storage:** All your recipes and favorites are stored securely on your device using IndexedDB. No sign-ups, no tracking.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v16 or higher)
*   npm or yarn

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/keerthan4531-a11y/flavour-vault.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Start the development server
    ```sh
    npm run dev
    ```

## 🛠️ Built With

*   **[React](https://reactjs.org/)** - UI Framework
*   **[TypeScript](https://www.typescriptlang.org/)** - Type Safety
*   **[Tailwind CSS v4](https://tailwindcss.com/)** - Styling Architecture
*   **[Framer Motion](https://www.framer.com/motion/)** - Fluid Animations
*   **[Lucide React](https://lucide.dev/)** - Beautiful Icons

## 📱 App Structure

\`\`\`text
src/
├── components/
│   ├── ai/          # INIXA AI integrations & Chat Widget
│   ├── landing/     # Hero, Categories, Trending features
│   ├── layout/      # Navbar, Sidebar, Footer
│   └── recipe/      # Recipe creation, details, and cards
├── context/         # React Context (Recipes, Theme)
├── hooks/           # Custom React hooks
├── pages/           # App routes (Home, Gallery, AI Kitchen, etc.)
└── services/        # AI API client & real-time SSE streaming logic
\`\`\`

---
<div align="center">
  <p>Made with ❤️ for food lovers.</p>
</div>
