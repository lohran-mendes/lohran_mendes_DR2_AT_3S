import "./productList.css";
import { useEffect, useState } from "react";
import { ProductItem } from "../productItem";

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    setLoading(true);
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setProducts(data.products);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {loading ? <h1>Carregando Produtos...</h1> : <h1>Lista de Produtos</h1>}
      <ul>
        {products.map((product) => {
          return <ProductItem key={product.id} product={product} />;
        })}
      </ul>
    </div>
  );
}
