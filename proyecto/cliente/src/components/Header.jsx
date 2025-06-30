import { useNavigate } from "react-router-dom";

import logo from "../assets/img/logo150.webp";

import "../assets/css/header.css"

export default function Header() {
  const navigate = useNavigate();

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
          className="nav-tab active"
        >
          Inicio
        </button>
        <button
          onClick={() => navigate("/bancopreguntas")}
          className="nav-tab"
        >
          Banco de Preguntas
        </button>
        <button
          onClick={() => navigate("/creadorpreguntas")}
          className="nav-tab"
        >
          Creador de Preguntas
        </button>
        <button
          onClick={() => navigate("/ResultadosEst")}
          className="nav-tab"
        >
          Tu Progreso
        </button>
        <button
          onClick={() => navigate("/ensayo/1")}
          className="nav-tab"
        >
          Ensayo
        </button>
      </nav>
    </header>
  );
}
