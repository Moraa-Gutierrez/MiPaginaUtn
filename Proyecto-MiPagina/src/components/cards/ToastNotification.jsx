import React, { useEffect } from 'react';

function ToastNotification({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className={`toast-notification ${toast.type || 'info'}`} role="status">
      <div className="toast-content">
        <div className="toast-icon">
          {toast.type === 'success' && <i className="fa-solid fa-circle-check"></i>}
          {toast.type === 'info' && <i className="fa-solid fa-circle-info"></i>}
          {toast.type === 'danger' && <i className="fa-solid fa-circle-exclamation"></i>}
        </div>
        <div className="toast-message">{toast.message}</div>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Cerrar notificación">
        &times;
      </button>
      <div className="toast-progress"></div>
    </div>
  );
}

export default ToastNotification;
