import { useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/img/logo150.webp";

import "../assets/css/header.css"

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="main-header">
      {/* Sección superior con logo y controles de usuario */}
      <section className="header-top">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" />
          <span className="logo-text">EduPAES</span>
        </div>
        
        <div className="user-controls">
          <button className="user-btn" onClick={() => navigate("/user")}>
            Usuario
          </button>
          <button className="user-btn logout" onClick={() => navigate("/logout")}>
            Cerrar sesión
          </button>
        </div>
      </section>

      {/* Navegación principal con pestañas */}
      <nav className="main-nav">
        <button
          onClick={() => navigate("/")}
          className={`nav-tab ${isActiveRoute("/") ? "active" : ""}`}
        >
          Inicio
        </button>
        <button
          onClick={() => navigate("/bancopreguntas")}
          className={`nav-tab ${isActiveRoute("/bancopreguntas") ? "active" : ""}`}
        >
          Banco de Preguntas
        </button>
        <button
          onClick={() => navigate("/creadorpreguntas")}
          className={`nav-tab ${isActiveRoute("/creadorpreguntas") ? "active" : ""}`}
        >
          Creador de Preguntas
        </button>
        <button
          onClick={() => navigate("/ResultadosEst")}
          className={`nav-tab ${isActiveRoute("/ResultadosEst") ? "active" : ""}`}
        >
          Tu Progreso
        </button>
        <button
          onClick={() => navigate("/ensayo/1")}
          className={`nav-tab ${isActiveRoute("/ensayo/1") ? "active" : ""}`}
        >
          Ensayo
        </button>
      </nav>
    </header>
  );
}
