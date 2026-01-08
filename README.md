# FocusFlow

FocusFlow is a high-end digital wellness dashboard and focus coaching application.

## 🚀 Deployment on Vercel

1. **Connect Repository**: Push your code to [GitHub](https://github.com/Kucevr/focusflow).
2. **Import to Vercel**: 
   - Go to [Vercel](https://vercel.com) and click **"Add New"** -> **"Project"**.
   - Import the repository.
3. **Environment Variables**:
   - During the import process, expand the **Environment Variables** section.
   - Add a new variable:
     - **Key**: `GEMINI_API_KEY`
     - **Value**: `your_google_ai_api_key_here`
4. **Deploy**: Click **Deploy**. Vercel will automatically detect Vite and use the correct build settings.

## 🛠 Tech Stack

- **React 19** + **TypeScript**
- **Vite** for lightning-fast builds
- **Tailwind CSS** (via Play CDN)
- **Google Gemini API** for AI coaching
- **HTML5 Canvas** for procedural visuals

## 💻 Local Development

1. Clone the repo.
2. Run `npm install`.
3. Create a `.env.local` file with `GEMINI_API_KEY=your_key`.
4. Run `npm run dev`.

---
Made by [kutsev-studio](https://kutsev-studio.vercel.app)
