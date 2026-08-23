/**
 * Form HSP-1 / HSP-2 Accessibility Engine
 * Manages focus, ARIA error linkage, and GOV.UK style error summary for Raymond (WCAG 2.2 AA).
 */

window.HSPAccessibility = {
  showErrorSummary(errors) {
    const summaryBox = document.getElementById('error-summary');
    const summaryList = document.getElementById('error-summary-list');
    if (!summaryBox || !summaryList) return;

    summaryList.innerHTML = '';

    if (!errors || errors.length === 0) {
      summaryBox.hidden = true;
      return;
    }

    errors.forEach(err => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${err.fieldId}`;
      a.textContent = `${err.fieldLabel}: ${err.message}`;
      
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const targetInput = document.getElementById(err.fieldId);
        if (targetInput) {
          targetInput.focus();
          targetInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });

      li.appendChild(a);
      summaryList.appendChild(li);
    });

    summaryBox.hidden = false;
    summaryBox.focus();
  },

  hideErrorSummary() {
    const summaryBox = document.getElementById('error-summary');
    if (summaryBox) summaryBox.hidden = true;
  }
};
