import React from 'react';

function EmptyState({ 
  title = "No hay productos disponibles", 
  message = "Por el momento no se encuentran artículos cargados en esta sección. Te invitamos a volver a consultar más tarde." 
}) {
  return (
    <div className="empty-state-container">
      <div className="empty-state-icon">
        <i className="fa-solid fa-box-open"></i>
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
    </div>
  );
}

export default EmptyState;
