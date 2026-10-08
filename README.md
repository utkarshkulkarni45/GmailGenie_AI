# 🧞‍♂️ GmailGenie AI

<p align="center">
  <b>Instant, context-aware AI email response generator powered by Google Gemini, Spring Boot, and React.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Spring_Boot-4.1.1-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Material_UI-5-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="MUI" />
</p>

---

## 🌟 Highlights & Features

- ⚡ **Instant Email Reply Generation**: Paste incoming emails and receive articulate replies in seconds.
- 🎯 **Tone Customization**: Tailor responses by mood:
  - 💼 *Professional*
  - 😊 *Friendly*
  - ☕ *Casual*
  - 🎯 *Persuasive*
  - ⚡ *Urgent & Direct*
- 📋 **One-Click Clipboard**: Copy the generated reply straight to your clipboard with instant feedback.
- 🎨 **Modern Minimalist UI**: Clean slate & indigo theme built on Material-UI.
- 🛡️ **Robust Architecture**: Layered Spring Boot backend (`controller`, `service`, `dto`) integrating with Google's Gemini API via reactive WebClient.

---

## 🏗️ Project Architecture

```
email-writer-sb/
├── email-writer-react/          # Frontend (React 19 + Vite + Material UI)
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmailInputForm.jsx
│   │   │   └── ReplyViewer.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── src/main/java/com/email/writer/ # Backend (Spring Boot 4)
│   ├── controller/
│   │   └── EmailGeneratorController.java
│   ├── service/
│   │   └── EmailGeneratorService.java
│   ├── dto/
│   │   └── EmailRequest.java
│   └── EmailWriterSbApplication.java
│
├── pom.xml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Java 21+** (or Java 25)
- **Node.js 18+** & npm
- A **Google Gemini API Key** ([Get one from Google AI Studio](https://aistudio.google.com/))

---

### 1. Backend Setup (Spring Boot)

1. Open your terminal at the root directory:
   ```bash
   cd email-writer-sb
   ```

2. Set your Gemini API credentials:

   **PowerShell:**
   ```powershell
   $env:GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
   $env:GEMINI_KEY = "your_gemini_api_key"
   ```

   **Command Prompt (CMD):**
   ```cmd
   set GEMINI_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
   set GEMINI_KEY=your_gemini_api_key
   ```

   **Bash / macOS / Linux:**
   ```bash
   export GEMINI_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
   export GEMINI_KEY="your_gemini_api_key"
   ```

3. Launch the Spring Boot server:
   ```bash
   ./mvnw spring-boot:run
   ```
   *(Windows CMD / PowerShell: `.\mvnw.cmd spring-boot:run`)*

   The backend will be live on `http://localhost:8080`.

---

### 2. Frontend Setup (React + Vite)

1. Open a second terminal and navigate to the frontend directory:
   ```bash
   cd email-writer-react
   ```

2. Install dependencies (if first time):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## 🔌 API Reference

### `POST /api/email/generate`

#### Request Body
```json
{
  "emailContent": "Hi, are we still meeting today at 3 PM?",
  "tone": "professional"
}
```

#### Response
```text
Hi,

Yes, we are still on schedule for our meeting today at 3:00 PM. Looking forward to speaking with you.

Best regards,
```

---

<p align="center">
  <b>Made by UK ⭐</b>
</p>

