# Quick Start Guide - AI Todo App

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies

\`\`\`bash
npm install
\`\`\`

### Step 2: Configure Environment Variables

Copy `.env.example` to `.env.local`:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` and replace `your_public_api_key_here` with your actual CopilotKit public API key:
\`\`\`env
NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY="ck_pub_your_public_api_key_here"
\`\`\`

**How to get your CopilotKit API key:**

1. Visit [CopilotKit Dashboard](https://copilotkit.ai/dashboard)
2. Create a new project or select existing one
3. Copy your **Public API Key** (NOT secret key)
4. Paste it in `.env.local`

### Step 3: Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 What's Included

| Feature              | Location          | Status                    |
| -------------------- | ----------------- | ------------------------- |
| **Add Todo**         | Left side form    | ✅ Full CRUD              |
| **Edit Todo**        | Click pencil icon | ✅ Modal dialog           |
| **Delete Todo**      | Click trash icon  | ✅ One-click delete       |
| **Toggle Complete**  | Click checkbox    | ✅ Toggle state           |
| **AI Assistant**     | Right sidebar     | ✅ CopilotKit integration |
| **Data Persistence** | localStorage      | ✅ Auto-save              |

---

## 🤖 AI Chat Examples

Try these commands in the chat on the right:

\`\`\`
"Plan a trip to Paris"
"Create a shopping list"
"Add exercise to my daily tasks"
"What todos do I have?"
"Mark the first task as done"
"Remove all completed tasks"
"Edit the Paris todo to add museums"
\`\`\`

---

## 📦 Available Commands

\`\`\`bash
npm run dev # Start development server
npm run build # Build for production
npm start # Start production server
npm run lint # Run linter
\`\`\`

---

## 🔒 Security Checklist

- ✅ `.env.local` is in `.gitignore` (never commit sensitive data)
- ✅ `.env.example` is a template for other developers
- ✅ API key is only loaded from environment variables
- ✅ No hardcoded keys in source code

---

## ❌ Troubleshooting

| Issue                                   | Solution                                                     |
| --------------------------------------- | ------------------------------------------------------------ |
| "Configuration Error - Missing API key" | Copy `.env.example` to `.env.local` and add your API key     |
| AI chat not responding                  | Check that `.env.local` has the correct API key              |
| Todos disappearing after refresh        | Enable localStorage in browser settings                      |
| Build fails                             | Run `npm install` again to ensure all dependencies installed |

---

## 🌐 Deployment

### To Vercel

1. Push code to GitHub (without `.env.local`)
2. Import repo in Vercel dashboard
3. Add environment variable: `NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY`
4. Deploy!

### To Other Platforms

Set environment variable `NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY` in your hosting dashboard.

---

## 📚 Documentation

- [CopilotKit Docs](https://docs.copilotkit.ai)
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

## ✨ Need Help?

Check `README.md` for detailed information about features, project structure, and technologies used.
