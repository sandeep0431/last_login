// Clue Toast & System Notification System

export class ToastManager {
  constructor() {
    this.container = document.getElementById('toast-container');
  }

  showClueToast(clue, count) {
    if (!this.container) return;

    const toast = document.createElement('div');
    toast.className = 'toast toast-clue';
    toast.innerHTML = `
      <div class="toast-header">
        <span class="toast-tag">✦ NEW EVIDENCE LOGGED (${count}/6)</span>
        <span style="font-family: var(--font-mono); font-size: 10px; color: var(--color-amber);">${clue.time}</span>
      </div>
      <div class="toast-title">${clue.title}</div>
      <div class="toast-desc">${clue.interpretation}</div>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s forwards';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  showFeedback(title, desc, type = 'info') {
    if (!this.container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'danger' ? 'toast-danger' : ''}`;
    toast.innerHTML = `
      <div class="toast-header">
        <span class="toast-tag">${type.toUpperCase()}</span>
      </div>
      <div class="toast-title">${title}</div>
      <div class="toast-desc">${desc}</div>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }
}

export const toastManager = new ToastManager();

