import { Link } from "react-router";
import "./header.css";

export function Header() {
  return (
    <header className="HeaderComponent">
      <h1>Dummy E-Commerce Admin</h1>
      <nav>
        <Link to="/">Lista de Produtos</Link>
        <Link to="/novo">Novo Produto</Link>
      </nav>
    </header>
  );
}
