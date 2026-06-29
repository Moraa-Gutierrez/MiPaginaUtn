import Dropdown from 'react-bootstrap/Dropdown';
import EditProductPage from '../CRUD/EditProductPage';
import CreateProductPage from '../CRUD/CreateProductPage';
import "../../Css/Admin/AdminPanel.css"
function MenuDesplegable() {
  return (
 <Dropdown className="custom-dropdown">
  <Dropdown.Toggle id="dropdown-basic" className="admin-btn">
    Admin <span className="arrow">▲</span>
  </Dropdown.Toggle>

  <Dropdown.Menu className="custom-menu">
    <Dropdown.Item href="/create-product" className="custom-item">
      <span className="icon">+</span>
      <div className="text-wrapper">
        <span>Cargar</span>
        <span>Producto</span>
      </div>
    </Dropdown.Item>
    
    <Dropdown.Item href="/edit-product/:id" className="custom-item">
      <span className="icon">✎</span>
      <div className="text-wrapper">
        <span>Editar</span>
        <span>Productos</span>
      </div>
    </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
  );
}

export default MenuDesplegable;