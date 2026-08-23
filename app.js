/**
 * Form HSP-1 / HSP-2 Core Application Router & Step Controller
 * Manages form state, dynamic household cards, age calculation for Directive LS-2026/04,
 * and step navigation across all 8 application pages.
 */

window.HSPApp = {
  calculateAge(dobString) {
    if (!dobString) return 0;
    const today = new Date();
    const birth = new Date(dobString);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  },

  navigateToStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= 8) {
      window.location.href = `page-${stepNumber}.html`;
    }
  },

  initStepNavigation() {
    const items = document.querySelectorAll('.step-item');
    items.forEach((item, index) => {
      const currentPage = window.location.pathname.split('/').pop();
      if (currentPage === `page-${index + 1}.html` || (currentPage === 'index.html' && index === 0)) {
        item.classList.add('active');
        item.setAttribute('aria-current', 'step');
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  HSPApp.initStepNavigation();
});
