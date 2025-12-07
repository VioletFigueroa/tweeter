# Tweeter - Twitter Clone

![GitHub last commit](https://img.shields.io/github/last-commit/VioletFigueroa/tweeter?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/VioletFigueroa/tweeter?style=flat-square)
![License](https://img.shields.io/badge/license-Educational-blue?style=flat-square)

**Quick Links:** [Security Features](#security-relevance-for-application-security) | [Setup](#getting-started) | [Live Demo](#final-product)

---

**How to view artifacts:** Client-side code in `/public/scripts/`; server logic in `/server/`; styles in `/public/styles/`.

**Result snapshot:** Responsive single-page app with XSS protection, AJAX communication, and front-end security practices.

**Quick review:**
- **Security focus:** XSS prevention via HTML escaping, client-side input validation, secure AJAX patterns
- **Key files:** `public/scripts/client.js` (XSS protection), `server/index.js` (Express backend)
- **Start with:** Review the `escape()` function and how user input is sanitized

## Overview
Tweeter is a simple, single-page Twitter clone built with HTML, CSS, JavaScript, jQuery, and AJAX on the front end, with Node.js and Express on the back end. This project demonstrates critical client-side security practices, particularly Cross-Site Scripting (XSS) prevention through proper HTML escaping and input validation.

**Developed during:** Lighthouse Labs Web Development Bootcamp (March 2021)

## Security Relevance for Application Security

### Cross-Site Scripting (XSS) Prevention
- **HTML escaping function** converts user input to safe text nodes before rendering
- **DOM-based XSS protection** prevents malicious scripts in tweet content
- **Consistent escaping** applied to usernames, handles, and tweet text
- Demonstrates understanding of reflected and stored XSS attack vectors
- **Defense-in-depth approach:** escaping at display time, not just storage time

### Client-Side Input Validation
- **Character count validation** (max 140 characters) with real-time feedback
- **Empty tweet prevention** stops submission of blank content
- **Client-side validation as UX enhancement,** not sole security control
- **Error messaging** provides user feedback without exposing system details

### AJAX Security Practices
- **RESTful API design** with proper HTTP methods (GET, POST)
- **JSON data handling** with appropriate content-type headers
- **Error handling** for failed AJAX requests without leaking stack traces
- **Asynchronous patterns** prevent race conditions in UI updates

### Secure Front-End Architecture
- **Separation of concerns:** client logic, server logic, and styling isolated
- **jQuery DOM manipulation** sanitizes dynamic content insertion
- **Third-party library security:** Font Awesome, Moment.js used from trusted CDNs
- **Responsive design** doesn't sacrifice security for mobile experiences

### Code Quality & Maintainability
- **Modular JavaScript** facilitates security code review
- **Clear function naming** makes security-critical code identifiable
- **Commented security decisions** (e.g., source attribution for escape function)
- **Version control** enables tracking of security-related changes

## Objectives
- Implement XSS protection in a dynamic web application
- Build responsive UI with mobile-first design principles
- Create secure AJAX communication patterns
- Demonstrate client-side validation and error handling
- Practice secure coding in front-end JavaScript

## Methodology
- **HTML5 & CSS3** for semantic, accessible markup
- **JavaScript ES6+** for modern, secure coding patterns
- **jQuery** for DOM manipulation and AJAX
- **Express.js** for lightweight API server
- **Flexbox & Media Queries** for responsive design

## Key Features
- **Tweet Composition:** Create tweets with character counter (140 max)
- **Tweet Display:** Chronological feed with user avatars and handles
- **XSS Protection:** All user-generated content properly escaped
- **Real-time Updates:** AJAX polling for new tweets without page refresh
- **Responsive Design:** Optimized layouts for desktop, tablet, and mobile
- **Interactive UI:** Hover effects, animations, and clear error messaging
- **Time Display:** Human-readable timestamps using Moment.js

## Technologies Used
- **Frontend:** HTML5, CSS3, JavaScript (ES6), jQuery 3.6.0
- **Backend:** Node.js, Express 4.13
- **Security:** Custom XSS escape function, input validation
- **UI/UX:** Font Awesome icons, Google Fonts, Flexbox, CSS Grid
- **Utilities:** body-parser, Moment.js for time formatting
- **Development:** nodemon for hot reloading

## Application Security Lessons Learned
- **XSS is everywhere:** Any user-controlled data displayed on a page is a potential XSS vector
- **Escape at display time:** Converting to text nodes at render prevents stored XSS attacks
- **Client-side validation is UX, not security:** Server must also validate to prevent bypass
- **Defense in depth matters:** Multiple layers (escaping, validation, Content-Security-Policy headers) provide robust protection
- **Third-party libraries are attack surface:** Using CDNs introduces supply-chain risk (mitigated with SRI hashes in production)
- **Error messages can leak information:** Generic client-facing errors while logging details server-side

## Files Included

**Client-Side:**
- `public/scripts/client.js` - Main client logic with XSS protection and AJAX
- `public/scripts/composer-char-counter.js` - Character counter with validation
- `public/styles/` - CSS files for layout, tweets, navigation, and responsive design
- `public/index.html` - Main HTML structure

**Server-Side:**
- `server/index.js` - Express server setup and middleware configuration
- `server/routes/tweets.js` - Tweet API endpoints (GET, POST)
- `server/lib/data-helpers.js` - Data access layer abstraction
- `server/lib/in-memory-db.js` - In-memory tweet storage

**Documentation:**
- `docs/` - Application screenshots showing responsive design

## Getting Started

### Prerequisites
- Node.js (v5.10.x or higher)
- npm (v3.x or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VioletFigueroa/tweeter.git
   cd tweeter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run local
   ```
   The application will be available at `http://localhost:8080`

## User Stories

**As an avid social media poster:**
I want to be able to post short messages so that I can share my thoughts with the world.

**As an avid social media reader:**
I want to be able to see what people have said most recently so that I can read interesting content as it is sent.

## Final Product

!["Screenshot of Desktop App"](https://github.com/VioletFigueroa/tweeter/blob/master/docs/Tweeter%20Desktop%20Screenshot.png?raw=true)

*Desktop view with responsive navigation and tweet composition*

!["Screenshot of Tablet and Mobile App"](https://github.com/VioletFigueroa/tweeter/blob/master/docs/Tweeter%20Mobile%20Screenshot.png?raw=true)

*Mobile and tablet responsive layouts*

## Security Features Demonstration

### XSS Protection Test
1. Try posting a tweet with HTML: `<script>alert('XSS')</script>`
2. **Expected Result:** The script tags display as text, not executed
3. **Why:** The `escape()` function converts `<` to `&lt;` and `>` to `&gt;`

### Input Validation Test
1. Try submitting an empty tweet
2. **Expected Result:** Error message appears, tweet not submitted
3. Try submitting a 141-character tweet
4. **Expected Result:** Counter turns red, submit prevented

### AJAX Error Handling Test
1. Stop the server while app is running
2. Try submitting a tweet
3. **Expected Result:** User-friendly error, no stack trace

## Code Example: XSS Protection

```javascript
// Escape function to protect from XSS
const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Usage in tweet rendering
const createTweetElement = (tweet) => {
  return $(`
    <div class="tweet-text">
      ${escape(tweet.content.text)}  // User input safely escaped
    </div>
  `);
};
```

## Application Security Career Connection

This project demonstrates essential AppSec skills for front-end security:

1. **XSS Mitigation:** Understanding and preventing the #7 OWASP Top 10 vulnerability
2. **Secure Coding Practices:** Implementing security controls in JavaScript applications
3. **Client-Side Security:** Recognizing that front-end code is untrusted and requires server-side validation
4. **Security Code Review:** Identifying where user input enters the system and ensuring proper sanitization
5. **Vulnerability Testing:** Testing for XSS, injection, and input validation bypasses

**Front-end security skills translate to AppSec:**
- **Code Review:** Spotting XSS vulnerabilities in JavaScript/TypeScript codebases
- **Security Testing:** Using browser dev tools and proxies to test client-side security
- **Developer Training:** Teaching developers about XSS, CSP, and secure front-end practices
- **Threat Modeling:** Understanding client-side attack vectors (XSS, CSRF, clickjacking)
- **Security Requirements:** Defining front-end security controls for new features

This project pairs with backend security knowledge (authentication, authorization, SQL injection prevention) to provide comprehensive web application security expertise.

---

**Author:** Violet Figueroa  
**Contact:** [GitHub Profile](https://github.com/VioletFigueroa)  
**Career Focus:** Application Security | Secure Software Development | Web Application Security
