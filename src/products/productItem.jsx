import { Link } from "react-router";
import "./productItem.css";

export function ProductItem({ product }) {
  const { title, price, thumbnail } = product;

  return (
    <Link to={`/produtos/${product.id}`}>
      <li className="product-item">
        <h1>{title}</h1>
        <img src={thumbnail} alt={title} />
        <span>Preço ${price}</span>
      </li>
    </Link>
  );
}
