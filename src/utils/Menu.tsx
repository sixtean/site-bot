import { NavLink } from 'react-router-dom';
import '../styles/menu.scss';

function Menu() {
  return (
    <aside className="menu">
      <div className="topo">
      </div>

      <nav className="menu-links">
        <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
          <i className="bi bi-house-door-fill"></i> <span>Home</span>
        </NavLink>

        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
          <i className="bi bi-speedometer2"></i> <span>Dashboard</span>
        </NavLink>

        <NavLink to="/announcement" className={({ isActive }) => (isActive ? 'active' : '')}>
          <i className="bi bi-megaphone"></i> <span>Anúncios</span>
        </NavLink>
        
        <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
          <i className="bi bi-gear-fill"></i> <span>Configurações</span>
        </NavLink>
        
        <NavLink to="/logout" className="logout">
          <i className="bi bi-box-arrow-right"></i> <span>Sair</span>
        </NavLink>
      </nav>

      <footer className="footer">
        
      </footer>
    </aside>
  );
}

export default Menu;