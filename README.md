# 🧞‍♂️ GmailGenie AI

<p align="center">
  <b>Production-ready, context-aware AI email response system powered by Google Gemini, Spring Boot 4, React 19, and a native Chrome Extension for Gmail.</b>
</p>

<p align="center">
  <a href="https://gmailgenie-ai.onrender.com/"><img src="https://img.shields.io/badge/Render-Backend%20Live-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render Backend" /></a>
  <img src="https://img.shields.io/badge/Spring_Boot-4.1.1-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java 21" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Google_Gemini-API-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Chrome_Extension-Manifest_V3-FFCC00?style=for-the-badge&logo=googlechrome&logoColor=black" alt="Chrome Extension" />
</p>

---

## 📌 Executive Summary

**GmailGenie AI** solves the daily friction of email overload by generating contextual, articulate email responses in seconds. Built with a full-stack distributed architecture, it offers two access interfaces:
1. **Direct Chrome Extension** seamlessly embedded in the official Gmail compose/reply interface.
2. **Web Dashboard** for quick standalone generation and tone fine-tuning.

The backend features an **automated multi-model failover mechanism** ensuring high availability even during Google Cloud API demand spikes.

---

## 🌟 Key Features

- ⚡ **Native Gmail Integration**: Injects a custom `Genie AI ⭐` action button into Gmail compose & reply toolbars using a Manifest V3 Content Script and DOM MutationObserver.
- 🧠 **Context-Aware Thread Parsing**: Intelligently inspects the incoming email thread, cleans quotes/signatures, and constructs optimal generative prompts.
- 🎯 **Tone Customization**: Tailor responses by style:
  - 💼 *Professional*
  - 😊 *Friendly*
  - ☕ *Casual*
  - 🎯 *Persuasive*
  - ⚡ *Urgent & Direct*
- 🛡️ **Fault-Tolerant AI Engine**: Dynamically routes requests across fallback Gemini models (`gemini-flash-latest`, `gemini-3.5-flash`, `gemini-3.1-flash-lite`, `gemini-2.5-pro`) upon HTTP 503/429 spikes.
- 🐳 **Containerized & Cloud-Deployed**: Packaged via multi-stage Docker builds running on Render with dynamic port binding and zero-downtime execution.

---

## 🏗️ System Architecture

```
GmailGenie_AI/
├── email-writer-extension/        # Chrome Extension (Manifest V3)
│   ├── manifest.json              # Extension metadata & Gmail host permissions
│   ├── content.js                 # DOM Observer & Gmail toolbar injection
│   └── content.css                # Polished UI injection styling
│
├── email-writer-react/            # Frontend Web Dashboard (React 19 + Vite)
│   ├── src/
│   │   ├── components/            # Atomic UI components
│   │   │   ├── EmailInputForm.jsx
│   │   │   └── ReplyViewer.jsx
│   │   ├── services/api.js        # Centralized HTTP client
│   │   ├── App.jsx                # Theme and state coordinator
│   │   └── index.css              # Modern slate-indigo styling
│   └── package.json
│
├── src/main/java/com/email/writer/ # Backend Microservice (Spring Boot 4)
│   ├── controller/                # REST Controller & CORS configuration
│   │   ├── EmailGeneratorController.java
│   │   └── HomeController.java
│   ├── service/                   # Business logic & reactive WebClient failover
│   │   └── EmailGeneratorService.java
│   ├── dto/                       # Request/Response data transfer objects
│   │   └── EmailRequest.java
│   └── EmailWriterSbApplication.java
│
├── Dockerfile                     # Multi-stage production container build
├── pom.xml                        # Maven dependencies & build lifecycle
└── README.md
```

---

## 🚀 Live Demo & Deployment

- **API Live Health Check**: [https://gmailgenie-ai.onrender.com/](https://gmailgenie-ai.onrender.com/)
- **Repository**: [https://github.com/utkarshkulkarni45/GmailGenie_AI](https://github.com/utkarshkulkarni45/GmailGenie_AI)

---

## 💻 Local Development Setup

### Prerequisites
- **Java 21+** (or Java 25)
- **Node.js 18+** & npm
- A **Google Gemini API Key** ([Google AI Studio](https://aistudio.google.com/))

### 1. Spring Boot Backend Setup
```bash
# Clone the repository
git clone https://github.com/utkarshkulkarni45/GmailGenie_AI.git
cd GmailGenie_AI

# Set environment variables
# PowerShell:
$env:GEMINI_KEY = "your_api_key_here"
# CMD:
set GEMINI_KEY=your_api_key_here
# Bash / Linux / macOS:
export GEMINI_KEY="your_api_key_here"

# Start the application
./mvnw spring-boot:run
```
Backend will be active on `http://localhost:8080`.

### 2. React Frontend Setup
```bash
cd email-writer-react
npm install
npm run dev
```
Access the dashboard at `http://localhost:5173`.

### 3. Load Chrome Extension in Gmail
1. Open Google Chrome and visit `chrome://extensions/`.
2. Toggle **Developer mode** (top-right) to **ON**.
3. Click **Load unpacked** (top-left) and select the `email-writer-extension` folder.
4. Navigate to [Gmail](https://mail.google.com), open any email, click **Reply**, and click **Genie AI ⭐**!

---

## 🔌 REST API Specification

### `POST /api/email/generate`

#### Request Payload
```json
{
  "emailContent": "Hi Utkarsh, can we review the presentation slides today at 4 PM?",
  "tone": "professional"
}
```

#### Response (`200 OK`)
```text
Hi,

Thank you for reaching out. Yes, 4:00 PM works well for me to review the presentation slides. 

Looking forward to our discussion.

Best regards,
Utkarsh Kulkarni
```

---

## 👨‍💻 Author & Engineering Insights

**Built & Maintained by Utkarsh Kulkarni**  
⭐ **Made by UK**

- **GitHub**: [@utkarshkulkarni45](https://github.com/utkarshkulkarni45)
- **Specializations**: Full-Stack Development (Java, Spring Boot, React), Cloud Containers (Docker), Chrome Extensions, Generative AI Integration.
