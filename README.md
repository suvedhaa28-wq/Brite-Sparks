# Application for Household Support (Form HSP-1 Rebuild)
## Brite Spark 2026 — Problem 4: "The Form Nobody Can Finish"
### Updated for Legal Services Directive LS-2026/04

Production-quality, WCAG 2.2 AA compliant redesign of **Form HSP-1 (Application for Household Support)** for Calder County Department of Household Services.

---

## 📌 Problem Context & Hackathon Challenge

The original government application suffered from a dismal **21.8% completion rate** due to strict 20-minute timeouts, intimidating legal jargon (*"gross periodic emolument"*), zero save/resume support, and severe screen-reader accessibility barriers.

### Target Personas:
* **Denise (Mobile / High Stress):** Uses an Android phone, works multiple shifts, and previously abandoned the application when looking up family details because her session timed out and erased her work.
* **Raymond (Blind / NVDA / Keyboard-only):** Relies on keyboard navigation and screen readers. Faced unlabelled controls, non-interactive button spans, and zero focus indicators.

---

## 📜 Day 2 Update: Legal Services Directive LS-2026/04

Legal Services issued mandatory Directive LS-2026/04 requiring two additional items:

1. **Identity Verification (Applicant & Adult Household Members):** For the applicant and every household member **aged 16 or over**, collect document type (`State ID`, `Passport`, `Permanent Resident Card`, `Tribal ID`, `Other`) and reference number. If an adult member has no document, capture the reason and flag the case for **Supervisor Referral**.
2. **Prior Assistance (24-Month Lookback):** Ask whether any household member received assistance from an equivalent program in another county or state in the **preceding 24 months**. Supports `Yes`, `No`, and recordable **`I don't know`**. If `Yes`, conditionally collects Jurisdiction, Program Name, and Approximate Dates.

> **⚠️ NON-NEGOTIABLE CONSTRAINT:**  
> *"Any fall in the completion rate as a result of adding these fields will be treated as a failure of implementation rather than an unavoidable consequence."*  
> We implemented these mandatory fields using **progressive disclosure** (hiding identity fields for minors under 16) and **no-document exception flows** to guarantee zero completion drop-off.

---

## 🚀 Quick Execution Guide

### Option 1: Direct Browser Load (Instant 0.01s Load — Recommended)
Double-click **`index.html`** or press `Ctrl + O` in Chrome / Edge to select `index.html`. All 8 steps, CSS styles, JavaScript auto-save, and WCAG accessibility features load instantly in 0.01 seconds without needing a server.

### Option 2: Run via Python Local Server (Fast IPv4)
```cmd
# Navigate to your project folder
cd "path/to/your-project-folder"

# Start Python HTTP Server
python -m http.server 8000

# Open in your browser (Use 127.0.0.1 to avoid Windows DNS delays)
http://127.0.0.1:8000/index.html
```

### Option 3: VS Code Live Server Extension
In VS Code, right-click **`index.html`** and select **"Open with Live Server"** to launch:
👉 **`http://127.0.0.1:5500/index.html`**

---

## 📋 Key Features & Implementation Highlights

1. **Upfront Preparation Checklist (Welcome Screen):** Tells applicants exactly what items (DOBs, wage slips, ID documents) they need before starting to avoid session drop-off.
2. **Applicant & Adult Household Identity Verification (Pages 1 & 3):**
   - Applicant ID collection with "No Document" reason capture & Supervisor Referral flagging.
   - Dynamic Date of Birth age calculation conditionally showing identity inputs **only for household members aged 16+**.
3. **24-Month Prior Assistance Lookback (Page 7):**
   - Asks about prior county support in the past 24 months.
   - Explicitly records `Yes`, `No`, or **`I don't know`** *(saved as a valid recordable state)*.
   - Conditionally collects Jurisdiction, Program Name, and Dates.
4. **Fail-Safe Local Persistence Engine (`storage.js`):**
   - Auto-saves all form inputs (including supervisor referral flags and "I don't know" answers) to `localStorage` on every keystroke.
5. **WCAG 2.2 AA Accessibility Engine (`accessibility.js`):**
   - Programmatically shifts keyboard focus to the `#error-summary` box on validation failures.
   - Direct anchor links jump keyboard focus straight into invalid controls.
   - High-contrast 3px focus rings paired with yellow background glows (`#ffdd00`).

---

## 📂 Repository File Directory

```text
.
├── index.html                 # Welcome screen & 8-step top navigation bar
├── page-1.html                # Step 1: Applicant Details & Identity Verification
├── page-2.html                # Step 2: Residence Details
├── page-3.html                # Step 3: Household Composition & Age 16+ Identity
├── page-4.html                # Step 4: Income & Employment (Plain English)
├── page-5.html                # Step 5: Capital & Resources (Plain English)
├── page-6.html                # Step 6: Household Expenditure & Deductions
├── page-7.html                # Step 7: Payment & 24-Month Prior Assistance
├── page-8.html                # Step 8: Declaration & Success Receipt
│
├── styles.css                 # WCAG 2.2 AA Design System & Responsive Styles
├── storage.js                 # LocalStorage Auto-Save Persistence Engine
├── accessibility.js           # WCAG Focus Shift & Error Summary Engine
│
├── Directive LS-2026-04.md    # Legal Services Directive Prompt
├── DECISIONS.md               # Master Technical Decisions Log (Day 1 & Day 2)
├── ACCESSIBILITY-REPORT.md    # WCAG 2.2 AA Accessibility Audit Report
├── AI-USAGE.md                # AI Usage Disclosure Statement
└── README.md                  # Main Repository Guide & Submission Manual
```
