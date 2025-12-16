import { Link } from "react-router";
import "./productItem.css";

export function ProductItem({ product }) {
  const { title, price, thumbnail } = product;

  return (
    <li className="product-item">
      <Link to={`/produtos/${product.id}`} className="product-link">
        <h1>{title}</h1>
        <img src={thumbnail} alt={title} />
        <span>Preço ${price}</span>
      </Link>
      <Link to={`/novo/${product.id}`} className="edit-button">
        Editar
      </Link>
    </li>
  );
}
