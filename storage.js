/**
 * Form HSP-1 / HSP-2 Storage Engine
 * LocalStorage auto-save engine for Denise persona.
 * Persists all applicant & household member identity verification details,
 * supervisor referrals, and prior assistance responses (including "I don't know").
 */

const STORAGE_KEY = 'hsp_shared_draft';

window.HSPStorage = {
  saveDraft(formData) {
    try {
      const existing = this.loadDraft() || {};
      const payload = {
        updatedAt: new Date().toISOString(),
        data: Object.assign({}, existing.data || {}, formData)
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      this.updateSaveBanner(payload.updatedAt);
      return true;
    } catch (err) {
      console.error('Failed to save HSP draft:', err);
      return false;
    }
  },

  loadDraft() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) {
      console.error('Failed to load HSP draft:', err);
      return null;
    }
  },

  clearDraft() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (err) {
      return false;
    }
  },

  updateSaveBanner(isoString) {
    const textElem = document.getElementById('save-status-text');
    if (!textElem) return;
    if (!isoString) {
      textElem.textContent = 'Auto-Save Active: Your progress is saved locally.';
      return;
    }
    const date = new Date(isoString);
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    textElem.textContent = `Auto-saved at ${timeStr}. You can safely return later.`;
  }
};
