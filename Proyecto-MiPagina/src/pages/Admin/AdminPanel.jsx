import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import "../../Css/Admin/AdminPanel.css"

function MenuDesplegable() {
  const[isOpen, setIsOpen]= useState(false);
  return (
   <Dropdown className="custom-dropdown" onToggle={(nextShow) => setIsOpen(nextShow)}>
      <Dropdown.Toggle id="dropdown-basic" className="admin-btn">
        Admin{' '}
        <span className={`arrow ${isOpen ? 'rotated' : ''}`}>▼</span>
      </Dropdown.Toggle>
  <Dropdown.Menu className="custom-menu">
    <Dropdown.Item as={Link} to="/create-product" className="custom-item">
      <span className="icon">+</span>
      <div className="text-wrapper">
        <span>Cargar</span>
        <span>Producto</span>
      </div>
    </Dropdown.Item>
    
    <Dropdown.Item as={Link} to="/products" className="custom-item">
      <span className="icon">✎</span>
      <div className="text-wrapper">
        <span>Ver / Editar</span>
        <span>Productos</span>
      </div>
    </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
  );
}

export default MenuDesplegable;