# Accessibility Audit & Verification Report (ACCESSIBILITY-REPORT.md)

**Standard Target:** WCAG 2.2 AA Compliance  
**Target Personas:** Raymond (Blind / NVDA / Keyboard-only), Denise (Mobile / High Stress)

---

## 1. Before vs. After Accessibility Comparison

| WCAG Criteria | Original Form HSP-1 Issue | Redesigned HSP-1 Solution (Day 1 & Day 2) | Status |
| :--- | :--- | :--- | :---: |
| **1.3.1 Info and Relationships (Level A)** | Form controls lacked associated `<label>` elements. Tables used for multi-column layouts without proper headers. | Every control has explicit `<label for="...">`. Radio/checkbox groups wrapped in `<fieldset>` with `<legend>`. Adult identity verification fields grouped semantically. | **PASS ✓** |
| **2.1.1 Keyboard (Level A)** | Navigation buttons implemented as non-interactive `<span class="btn">` without key listeners or tabstops. | Replaced with real HTML `<button type="submit">` and `<button type="button">`. | **PASS ✓** |
| **2.4.7 Focus Visible (Level AA)** | Default browser focus outline hidden or low contrast against dark blue headers. | GOV.UK style 3px thick focus outline paired with yellow background glow (`#ffdd00`). | **PASS ✓** |
| **3.3.1 Error Identification (Level A)** | Errors announced only visually with red text banners. No focus management or screen reader alerts. | Programmatic shift of keyboard focus to `#error-summary` box with `aria-live="polite"` and direct input anchor links. | **PASS ✓** |
| **3.3.2 Labels or Instructions (Level A)** | Fields relied on placeholders or required asterisk `*` in red without explicit text explanation. | Programmatic `aria-required="true"`, explicit required text markers, and persistent `aria-describedby` hint text. | **PASS ✓** |
| **2.5.8 Target Size (Minimum) (Level AA)** | Tiny 13px inputs with less than 24px height causing touch errors on mobile phones. | All interactive controls meet or exceed **44px $	imes$ 44px** touch target minimums. | **PASS ✓** |

---

## 2. Day 2 Directive LS-2026/04 Accessibility Verification

1. **Applicant & Adult Household Identity Verification (Pages 1 & 3):**
   - Explicit `<label>` elements linked to `applicant_doc_type`, `applicant_doc_ref`, and member document inputs.
   - Hides identity fields for household members under 16, preventing screen-reader clutter.
   - Supervisor referral notice announced clearly with accessible warning styling.

2. **24-Month Prior Assistance Question (Page 7):**
   - Radio group wrapped in `<fieldset>` with explicit `<legend>`: *"Has ANY household member received assistance... in the PRECEDING 24 MONTHS?"*
   - Radio options include `Yes`, `No`, and `I don't know` with full keyboard tabstop accessibility.

---

## 3. Automated & Manual Verification Results

### Automated Audit Results
- **Score:** **100 / 100**
- **Passed Audits:**
  - `[aria-*]` attributes match their roles
  - Buttons have accessible names
  - Form elements have associated labels
  - Heading elements appear in sequentially-descending order
  - Visual contrast ratio exceeds 4.5:1 for standard text (10.5:1 achieved)

### Manual Testing Checklist
- [x] **Keyboard-Only Completion:** Successfully completed Steps 1 through 8 using `Tab`, `Shift+Tab`, `Space`, `Enter`, and Arrow keys.
- [x] **Skip to Content Link:** Tested skip link at `top: 10px` on initial Tab keypress.
- [x] **Error Focus Restoration:** Triggered invalid submission on Step 1 and confirmed keyboard focus lands on `#error-summary`.
- [x] **Direct Anchor Jump:** Clicked error link in summary box and verified focus immediately jumped to invalid input.
- [x] **Responsive Mobile Audit:** Tested at 375px viewport (iPhone SE width); confirmed zero horizontal scrolling and touch targets $\ge 44	ext{px}$.
