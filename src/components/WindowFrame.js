// Draggable, Minimizable, Focusable Desktop Window Component

import { audioManager } from '../game/audio-manager.js';

let highestZIndex = 100;

export class WindowFrame {
  constructor(appConfig, contentElement, onCloseCallback = null) {
    this.appConfig = appConfig;
    this.contentElement = contentElement;
    this.onClose = onCloseCallback;
    this.isMaximized = false;
    this.isMinimized = false;
    this.element = null;

    this.prevPos = { ...appConfig.defaultPos };
    this.currentPos = { ...appConfig.defaultPos };

    this.isDragging = false;
    this.dragOffset = { x: 0, y: 0 };

    this.createWindow();
  }

  createWindow() {
    this.element = document.createElement('div');
    this.element.className = 'window-frame active-window';
    this.element.id = `win-${this.appConfig.id}`;
    this.element.style.left = `${this.currentPos.x}px`;
    this.element.style.top = `${this.currentPos.y}px`;
    this.element.style.width = `${this.currentPos.w}px`;
    this.element.style.height = `${this.currentPos.h}px`;
    this.element.style.zIndex = ++highestZIndex;

    this.element.innerHTML = `
      <div class="window-titlebar" id="titlebar-${this.appConfig.id}">
        <div class="window-title-group">
          <span class="window-title-icon">${this.appConfig.iconSymbol || '🗔'}</span>
          <span class="window-title-text">${this.appConfig.title}</span>
        </div>
        <div class="window-controls">
          <button class="win-btn win-btn-min" title="Minimize" aria-label="Minimize">_</button>
          <button class="win-btn win-btn-max" title="Maximize" aria-label="Maximize">□</button>
          <button class="win-btn win-btn-close" title="Close" aria-label="Close">✕</button>
        </div>
      </div>
      <div class="window-content" id="win-body-${this.appConfig.id}"></div>
    `;

    const bodySlot = this.element.querySelector(`#win-body-${this.appConfig.id}`);
    if (this.contentElement) {
      bodySlot.appendChild(this.contentElement);
    }

    audioManager.playWindowOpen();
    this.bindEvents();
  }

  bindEvents() {
    const titlebar = this.element.querySelector('.window-titlebar');
    const btnMin = this.element.querySelector('.win-btn-min');
    const btnMax = this.element.querySelector('.win-btn-max');
    const btnClose = this.element.querySelector('.win-btn-close');

    // Focus on click
    this.element.addEventListener('mousedown', () => this.bringToFront());

    // Controls
    btnMin.addEventListener('click', (e) => {
      e.stopPropagation();
      this.minimize();
    });

    btnMax.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMaximize();
    });

    btnClose.addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });

    // Double click titlebar to maximize
    titlebar.addEventListener('dblclick', () => this.toggleMaximize());

    // Dragging logic (Mouse & Touch)
    const onStartDrag = (clientX, clientY) => {
      if (this.isMaximized) return;
      this.isDragging = true;
      this.bringToFront();
      const rect = this.element.getBoundingClientRect();
      this.dragOffset.x = clientX - rect.left;
      this.dragOffset.y = clientY - rect.top;
      document.body.style.userSelect = 'none';
    };

    const onMoveDrag = (clientX, clientY) => {
      if (!this.isDragging) return;
      const stage = document.querySelector('.windows-container') || document.body;
      const bounds = stage.getBoundingClientRect();

      let newX = clientX - bounds.left - this.dragOffset.x;
      let newY = clientY - bounds.top - this.dragOffset.y;

      // Keep within bounds
      newX = Math.max(0, Math.min(newX, bounds.width - 100));
      newY = Math.max(0, Math.min(newY, bounds.height - 40));

      this.currentPos.x = newX;
      this.currentPos.y = newY;
      this.element.style.left = `${newX}px`;
      this.element.style.top = `${newY}px`;
    };

    const onEndDrag = () => {
      this.isDragging = false;
      document.body.style.userSelect = '';
    };

    // Mouse Drag
    titlebar.addEventListener('mousedown', (e) => {
      if (e.target.closest('.win-btn')) return;
      onStartDrag(e.clientX, e.clientY);

      const moveHandler = (moveEvt) => onMoveDrag(moveEvt.clientX, moveEvt.clientY);
      const upHandler = () => {
        onEndDrag();
        window.removeEventListener('mousemove', moveHandler);
        window.removeEventListener('mouseup', upHandler);
      };

      window.addEventListener('mousemove', moveHandler);
      window.addEventListener('mouseup', upHandler);
    });

    // Touch Drag
    titlebar.addEventListener('touchstart', (e) => {
      if (e.target.closest('.win-btn')) return;
      const touch = e.touches[0];
      onStartDrag(touch.clientX, touch.clientY);

      const touchMoveHandler = (moveEvt) => {
        const t = moveEvt.touches[0];
        onMoveDrag(t.clientX, t.clientY);
      };
      const touchEndHandler = () => {
        onEndDrag();
        window.removeEventListener('touchmove', touchMoveHandler);
        window.removeEventListener('touchend', touchEndHandler);
      };

      window.addEventListener('touchmove', touchMoveHandler, { passive: true });
      window.addEventListener('touchend', touchEndHandler);
    });
  }

  bringToFront() {
    this.element.style.zIndex = ++highestZIndex;
    document.querySelectorAll('.window-frame').forEach(w => w.classList.remove('active-window'));
    this.element.classList.add('active-window');
  }

  toggleMaximize() {
    this.isMaximized = !this.isMaximized;
    if (this.isMaximized) {
      this.prevPos = { ...this.currentPos };
      this.element.style.left = '0px';
      this.element.style.top = '0px';
      this.element.style.width = '100%';
      this.element.style.height = '100%';
      this.element.style.borderRadius = '0px';
    } else {
      this.element.style.left = `${this.prevPos.x}px`;
      this.element.style.top = `${this.prevPos.y}px`;
      this.element.style.width = `${this.prevPos.w}px`;
      this.element.style.height = `${this.prevPos.h}px`;
      this.element.style.borderRadius = 'var(--radius-md)';
      this.currentPos = { ...this.prevPos };
    }
  }

  minimize() {
    this.isMinimized = true;
    this.element.classList.add('hidden');
    audioManager.playWindowClose();
  }

  restore() {
    this.isMinimized = false;
    this.element.classList.remove('hidden');
    this.bringToFront();
    audioManager.playWindowOpen();
  }

  close() {
    this.element.remove();
    audioManager.playWindowClose();
    if (this.onClose) this.onClose(this.appConfig.id);
  }
}

