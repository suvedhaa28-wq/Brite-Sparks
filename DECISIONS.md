# Technical & Design Decisions Log: Form HSP-1 Rebuild

## 1. Day 1 Page Selection Rationale Based on Abandonment Data

Out of the 8 pages in Form HSP-1, the redesign focuses on **Pages 1, 3, 4, and 5** (in addition to creating a new Onboarding / Preparation Welcome screen).

| Page | Name | Abandonment Rate | Validation Errors | Session Timeouts | Selected? | Justification |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Page 1** | Applicant Details | 11.0% | 1,842 | N/A | **YES** | 61% mobile usage. Contains the "Client Identifier" field which makes first-time applicants (like Denise) believe they are in the wrong application. |
| **Page 2** | Residence | 9.6% | Low | Low | No | Standard address inputs with lower abandonment rate. |
| **Page 3** | Household Composition | **36.0%** | **6,688** | **383** | **YES** | **Worst page in the entire application.** Highest abandonment, 486s median completion time, and broken 8-column layout on mobile. Matches Denise's exact failure scenario (leaving to find son's date of birth and losing all data). |
| **Page 4** | Income | **30.9%** | **5,417** | **291** | **YES** | **Second worst page.** High error rate due to legalistic department jargon ("gross periodic emolument") that ordinary citizens do not understand. |
| **Page 5** | Capital & Resources | **20.2%** | **3,092** | **147** | **YES** | **Third worst page.** Complex financial wording ("encumbered liquid reserves") causing confusion and high drop-off. |
| Page 6 | Expenditure | 8.1% | Low | Low | No | Lower abandonment. |
| Page 7 | Other Programs | 8.8% | Low | Low | No | Lower abandonment. |
| Page 8 | Declaration | 8.5% | Low | Low | No | Lower abandonment. |

---

## 2. UX & Plain-Language Redesign Decisions

1. **Before-You-Begin Preparation Checklist (Welcome Screen)**
   - **Problem:** Applicants reach Page 3 or Page 4, realize they are missing documents (e.g. child's date of birth or wage slips), leave the form, and get timed out.
   - **Solution:** Upfront onboarding card listing exact required documents and information before starting.

2. **Plain-Language Translations**
   - *Client Identifier* $ightarrow$ **Reference Number / Client ID (Optional)**: Explicit hint explaining that first-time applicants should leave it blank.
   - *Gross periodic emolument* $ightarrow$ **Total pay before tax (Wages / Salary)**: Replaces bureaucratic terms with everyday language and explicit frequency pickers (weekly, monthly, annual).
   - *Non-applicant occupants horizontal grid* $ightarrow$ **Mobile Household Member Cards**: Eliminates 8-column overflow tables.
   - *Encumbered liquid reserves* $ightarrow$ **Total money in bank accounts & cash savings**: Plain English description with dollar inputs.

---

## 3. Accessibility Decisions (Raymond Persona - WCAG 2.2 AA)

1. **GOV.UK Style Accessible Error Summary Box**
   - On validation failure, focus is programmatically shifted (`tabindex="-1"` and `.focus()`) to `#error-summary`.
   - Error items contain direct anchor links (`<a href="#firstName">`) that jump directly to the target input and set focus on click.
2. **Semantic Form Structure & ARIA Association**
   - Every input has a programmatically linked `<label for="...">`. Radio/checkbox groups are wrapped in `<fieldset>` with an explicit `<legend>`.
3. **Keyboard-Operable Focus Indicators**
   - High-contrast 3px dark focus rings paired with yellow background glows (`#ffdd00`) complying with WCAG 2.2 focus appearance guidelines.

---

## 4. DAY 2 — LEGAL SERVICES DIRECTIVE LS-2026/04

### 1. What Legal Services Required
Directive LS-2026/04 introduced two non-negotiable legal mandates:
1. **Identity Verification:** Mandatory collection of identity document type (`State ID`, `Passport`, `Permanent Resident Card`, `Tribal ID`, `Other`) and reference number for the main applicant AND every household member aged 16 or older. It also mandated capturing reasons for applicants with no acceptable identity document and flagging those cases for supervisor referral.
2. **Prior Assistance (24-Month Lookback):** Mandatory question asking whether ANY household member received assistance from an equivalent program in another county or state during the preceding 24 months, supporting `Yes`, `No`, and `I don't know` (recordable), with conditional inputs for Jurisdiction, Program Name, and Approximate Dates when `Yes` is selected.

### 2. Where New Identity Verification Was Added
- **Main Applicant:** Integrated directly into Step 1 (`page-1.html`) inside an **Applicant Identity Verification** fieldset.
- **Household Members Aged 16+:** Integrated inside the existing Mobile Household Member Cards on Step 3 (`page-3.html`). Uses automatic date-of-birth age calculation to dynamically display identity verification fields **only for members aged 16 or older**.

### 3. Where Prior-Assistance Question Was Added
- Integrated into Step 7 (`page-7.html`) under a dedicated **Prior Program Assistance** fieldset. Includes explicit radio options for `Yes`, `No`, and `I don't know` (which is saved as a valid recordable state). If `Yes` is selected, conditional inputs for Jurisdiction, Program Name, and Approximate Dates are revealed.

### 4. How Existing UI Was Modified Rather Than Replaced
- Kept the exact 8-step navigation bar, card containers, button design tokens, and CSS layout system.
- Extended the existing mobile card component on Page 3 instead of introducing a wide table grid.
- Extended the existing `#error-summary` focus switcher and `HSPStorage` auto-save engine rather than adding new systems.

### 5. How the Design Minimizes Additional Completion Friction
- **Progressive Disclosure:** Identity fields are completely hidden for household members under 16.
- **No Document Exception:** Provides a clear *"I do not have an acceptable identity document"* checkbox with a reason field, preventing applicants without documents from abandoning the form.
- **Explicit "I don't know":** Prevents drop-off on the prior assistance question when applicants cannot recall past assistance details.

### 6. What Existing Functionality Was Deliberately Preserved
- All 8 existing step views (`page-1.html` through `page-8.html`).
- The LocalStorage auto-save engine (`hsp_shared_draft`).
- The GOV.UK style `#error-summary` accessibility focus controller.
- Mobile single-column layout and touch targets ($\ge 44	ext{px}$).

### 7. What We Chose NOT to Change
- Did NOT create a large desktop grid for household identity data.
- Did NOT require identity verification for children under 16.
- Did NOT change the underlying navigation order or step structure.

### 8. Trade-Offs
- Adding identity fields increases field count on Page 1 and Page 3. We mitigated this by hiding fields for minors and providing clear plain-language hints and no-doc exception paths.

### 9. How Accessibility Was Preserved (Raymond - WCAG 2.2 AA)
- Programmatically linked `<label for="...">` elements for all new select dropdowns, text inputs, and textareas.
- Wrapped radio groups in `<fieldset>` with explicit `<legend>` descriptions.
- Screen reader announcements and focus shift to `#error-summary` on validation failures.

### 10. How Save & Resume Was Extended
- `HSPStorage.saveDraft()` extends the JSON payload to store:
  - `applicant_doc_type`, `applicant_doc_ref`, `applicant_no_doc`, `applicant_no_doc_reason`, `applicant_supervisor_referral`.
  - Member-level identity fields and `supervisor_referral` flags.
  - `prior_assistance` (`Yes` / `No` / `I don't know`), `prior_jurisdiction`, `prior_program_name`, `prior_dates`.

### 11. Testing Performed After Change
- Verified keyboard navigation (`Tab`, `Shift+Tab`, `Space`, `Enter`) across all new identity and prior assistance fields.
- Tested mobile viewport responsiveness on 320px, 375px, and 414px screen widths.
- Tested Save & Resume lifecycle (Enter data $ightarrow$ Close browser $ightarrow$ Re-open $ightarrow$ Verify fields restored).
- Validated error focus shifting to `#error-summary`.

### 12. What We Would Have Done Differently on Day 1
If Directive LS-2026/04 were known on Day 1, we would have included identity document collection as a recommended prep item on the initial `index.html` onboarding screen.
