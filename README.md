# Arbiter AI

> **Judge Smarter • Decide Faster**

Arbiter AI is an AI-powered decision and conversation platform designed to help users analyze questions, explore ideas, and make better-informed decisions.

The application combines a modern conversational AI interface with persistent user conversations and a dedicated comparison experience.

---

## 🚀 Features

### 💬 AI Chat
Ask questions and have natural conversations with Arbiter AI.

- AI-powered responses
- Markdown-formatted answers
- Clean conversational interface
- Separate conversations for different topics

### ⚖️ Comparison Mode
Compare two options in a dedicated decision-making interface.

- Compare different choices side-by-side
- Provide descriptions for each option
- Get AI-assisted analysis
- Designed specifically for decision-making

### 🔐 Authentication
User authentication powered by Supabase.

- Sign up
- Login
- Logout
- Persistent user sessions

### 💾 Saved Conversations
Conversations are stored securely so users can return to them later.

- Automatic chat creation
- User messages saved
- AI responses saved
- Previous conversations available from the sidebar

### 🎨 Modern Interface

Arbiter AI uses a dark, minimal interface designed around readability and focus.

- Responsive layout
- Dark UI
- Cyan accent system
- Sidebar navigation
- Smooth animations
- Dedicated chat and comparison experiences

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js | Frontend framework |
| React | User interface |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling |
| Supabase | Authentication & database |
| Gemini API | AI responses |
| Framer Motion | UI animations |
| React Markdown | Markdown rendering |
| Heroicons | Interface icons |

---

## 🏗️ Project Structure

```text
decision-ai/
├── app/
│   ├── api/
│   │   └── chat/
│   ├── page.tsx
│   └── ...
│
├── components/
│   ├── AuthModal.tsx
│   ├── AuthProvider.tsx
│   ├── ChatMessage.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   └── ...
│
├── lib/
│   ├── chat.ts
│   ├── supabase.ts
│   └── ...
│
├── public/
├── package.json
└── README.md