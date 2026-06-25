# Summary of Mini Projects for IT4409: Web Technologies & e-Services

This is a repository summarizing the mini projects including both Frontend and Backend.

## Repository Structure

The repository is divided into projects with increasing complexity:

### 1. Mini-project 1+2: Basic Content Management System

**- Description:** Build a website to display static information and an Admin Panel that allows managing dynamic content entirely on the frontend.

**- Features:**

* Responsive Grid Layout supporting dynamic column spans.
* Dynamic Top Menu and Left Menu management.
* Integrated rich text editor (QuillJS).
* Data stored entirely using the browser's **`localStorage`**.

**- Tech stack:** HTML5, CSS3 (W3.CSS), Vanilla JavaScript.

### 2. Mini-project 3: Node.js Backend & API Integrations

**- Description:** Build a Backend server using Node.js to handle logic and integrate with third-party services.

**- Features:**

* **Google OAuth 2.0:** Secure login feature using Google accounts.
* **Gmail API:** Allows reading the 5 latest emails and sending emails directly from the web.
* **Gemini API:** Integrate intelligent AI Chatbot from Google.
* **VietQR API:** Generate automatic bank transfer QR codes.

**- Tech stack:** Node.js, Express, Axios, Googleapis, **`@google/genai`**.

### 3. Mini-Project 4: Wikipedia Search AJAX (Integrated into CMS)

**- Description:** Upgraded from Mini-Project 2 by adding a "Wikipedia Search" content type.

**- Features:**

* Search Wikipedia articles directly via Wikipedia API.
* Smooth AJAX handling with **`debounce`** technique (prevents continuous API calls while typing).
* Automatic highlighting of search keywords in the returned results.

**- Tech stack:** Vanilla JavaScript, Fetch API, CSS.

## Copyright and Contact

The project was developed during the Web Technologies course.

Student: Ha Duc Duong - Student ID: 20235923 - Class: ICT-01 K68
