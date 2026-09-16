import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active fw-bold text-white" : " text-white-50");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <NavLink className="navbar-brand text-white" to="/">
          Almoxarifado de TI
        </NavLink>
        <div className="navbar-nav">
          <NavLink className={linkClass} to="/equipamentos">
            Equipamentos
          </NavLink>
          <NavLink className={linkClass} to="/alunos">
            Alunos
          </NavLink>
          <NavLink className={linkClass} to="/emprestimos">
            Empréstimos
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;