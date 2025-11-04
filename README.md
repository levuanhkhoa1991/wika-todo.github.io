# AI Todo Copilot

This is a simple yet powerful Todo application built with Next.js, Tailwind CSS, and integrated with **[CopilotKit](https://www.copilotkit.ai/)** to provide AI-powered features. Manage your tasks through a clean UI or by simply chatting with your AI assistant.

## ✨ Features

| Feature              | Description                                           | Status |
| -------------------- | ----------------------------------------------------- | :----: |
| **Full CRUD**        | Add, edit, and delete todos via a user-friendly UI.   |   ✅   |
| **AI Assistant**     | Use natural language to manage your tasks.            |   ✅   |
| **Data Persistence** | Your tasks are automatically saved to `localStorage`. |   ✅   |
| **Responsive UI**    | Clean interface built with Tailwind CSS & Radix UI.   |   ✅   |
| **Linting**          | Code quality is maintained with ESLint.               |   ✅   |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following:

- **Node.js** (v20.9.0 or later) installed on your machine.
- A **CopilotKit Public API Key**. You can get one for free from the [CopilotKit Dashboard](https://copilotKit.ai/dashboard).

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ai-todo-copilot
```

### 2. Install Dependencies

Install the required packages using npm.

```bash
npm install
```

> **Note:** The project's dependencies have been fixed to resolve any `peer dep missing` errors. You no longer need to use the `--force` flag.

### 3. Configure Environment Variables

The project requires a public API key from CopilotKit.

a. Create a local environment file by copying the example:

```bash
cp .env.example .env.local
```

b. Get your API key:

1.  Visit the CopilotKit Dashboard.
2.  Create a new project or select an existing one.
3.  Copy your **Public API Key**.

c. Open `.env.local` and add your key:

```env
NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY="ck_pub_your_public_api_key_here"
```

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser to see the application in action.

---

## 🤖 AI Chat Examples

Try these commands with the AI assistant on the right side of the app:

```
"Plan a trip to Paris"
"Create a shopping list for groceries"
"Add 'go to the gym' to my tasks"
"What are my current todos?"
"Mark the first task as completed"
"Delete all completed tasks"
```

## 🛠️ Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the codebase using ESLint.

## 🔒 Security

- The `.env.local` file is included in `.gitignore` to prevent committing sensitive keys.
- The CopilotKit public API key is safe to be exposed on the client-side as it is rate-limited and scoped to your domain.
- Never commit secret keys to your repository.

## 🔧 Troubleshooting

| Issue                          | Solution                                                                     |
| ------------------------------ | ---------------------------------------------------------------------------- |
| **"Missing API key" error**    | Ensure you have created `.env.local` and added your API key correctly.       |
| **`npm install` fails**        | Delete `node_modules` and `package-lock.json`, then run `npm install` again. |
| **AI chat not responding**     | Verify that your API key in `.env.local` is correct and has no typos.        |
| **Todos disappear on refresh** | Make sure `localStorage` is enabled in your browser settings.                |

## 📚 Further Reading

- CopilotKit Docs
- Next.js Docs
- React Docs
- Tailwind CSS
