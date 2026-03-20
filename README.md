# 🧠 AlumAssist — Alumni Mentor Chatbot

> **AlumAssist** is a focused, mentor-style chatbot designed to provide direct, practical career guidance for students. 

Built as a feature within the **AlumConnect** ecosystem, it simulates how an experienced alumnus would guide a junior — with absolute clarity, structure, and **zero fluff**.

---

## 🚀 What I Built

AlumAssist is a purpose-driven chatbot loaded with scoped guardrails. It is designed to behave like a real-world mentor, helping users with:

*   **Career Direction** – evaluating paths & decision-making
*   **Skills Roadmaps** – structured planning &evaluation
*   **Internship Guidance** – actionable tips on how to break in
*   **Project Suggestions** – building portfolios that matter
*   **Career Switching** – navigating pivots securely

The chatbot is intentionally scoped to avoid becoming a general-purpose AI, holding its ground as a dedicated career copilot.

---

## 🎯 Why I Chose This Topic

Most chatbots feel generic because they try to do everything. I wanted to explore a different angle: **What if a chatbot behaved like a specific person with a defined, strict purpose?**

Designed as a natural extension mapping for **AlumConnect**:
1. Students always need raw, actionable guidance.
2. Alumni provide that exact experience.
3. **AlumAssist bridges that gap interactive-first.**

---

## 🧠 Key Design Decisions

### 1. Behavior Over Raw Intelligence
Instead of relying only on the model's baseline, I prioritized **strict scope control**, response structure formulas, and prompt-tuning boundaries to maintain absolute tone consistency (mentor-like, direct, and practical).

### 2. Experience-First Frontend
The assignment emphasizes "frontend thinking," so I centered the UX around:
*   **Zero-Friction Entry** – Merged landing structures directly with empty-state suggest layout.
*   **Actionable Shortcuts** – Preset suggestions to trigger immediate conversational context.
*   **Visual clarity** – Cinematic dark mode setup using simple backdrops to reduce cognitive load.

### 3. Real Mentor Tone
The AI avoids vague motivational responses, explicitly gives actionable steps, redirects irrelevant queries politely, and adjusts response weightssnugly securely.

---

## ✨ Features

*   🎯 **Purpose-Built Workspace** – Scoped strictly for alumni mentoring.
*   💬 **Context-Aware Loops** – Seamless contextual thread management.
*   ⚡ **Preset Suggestion Chips** – Fast-shortcuts for quick entries on boot.
*   🕒 **Context Timestamps** – Smooth timestamps using *Luxon*.
*   🔔 **Interaction Feedback** – Fluid tooltips using *Floating UI*.
*   ⚠️ **Confirmations Setup** – Clean warning dialogs using *SweetAlert2*.
*   📱 **Responsive Canvas** – Adaptive grid alignment centering layouts accurately.

---

## 🛠️ Tech Stack

| Layer | Tools |
| :--- | :--- |
| **Frontend** | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| **Backend / AI** | FastAPI (Python) & Groq API |
| **Animations** | AOS (Animate on Scroll) |
| **Timestamps** | Luxon.js |
| **Tooltips** | Floating UI / Tippy.js |
| **Modals** | SweetAlert2 |

---

## 🧪 Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/alumassist-chatbot.git
   cd alumassist-chatbot
   ```

2. **Configure Environment**
   Create a `.env` file in the root and add your Groq key:
   ```env
   GROQ_API_KEY=your_actual_api_key_here
   ```

3. **Install and Run**
   ```bash
   pip install -r requirements.txt
   python main.py
   ```
   *Serves locally at `http://127.0.0.1:8000/`*

---

## 🌐 Links & Media

*   👉 **Live Demo**: *[Add your Vercel link here]*
*   🎥 **Loom Walkthrough**: *[Add Loom video link here]*

---

## 🧠 What I Learned

*   **AI Guardrailing Matters**: Designing behavior is as important as integrating it.
*   **Detail Snapping**: UX decisions weight heavier than direct counts framework items securely.
*   A well-scoped chatbot feels significantly more useful and focused than a generic multi-purpose assistant.

---

> This project is not just a chatbot — it’s an attempt to design a focused, human-like guidance system that prioritizes absolute clarity over conversation length.
