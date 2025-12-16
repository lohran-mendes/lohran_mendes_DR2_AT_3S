import "./productList.css";
import { useEffect, useState } from "react";
import { ProductItem } from "../item/productItem";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router";

export function ProductList() {
  const location = useLocation();
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
    if (location.state?.productUpdated) {
      toast.success(
        `Produto com o ID ${location.state.productId} atualizado com sucesso!`
      );
    } else if (location.state?.productCreated) {
      toast.success(
        `Produto criado com sucesso! ID do produto: ${location.state.productId}`
      );
    }
  }, [location.state]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleDelete(productId) {
    await fetch(`https://dummyjson.com/products/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Erro ao deletar o produto:", error);
      });

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
    toast.success("Produto excluído com sucesso!");
  }

  return (
    <div className="product-list">
      {loading ? <h1>Carregando Produtos...</h1> : <h1>Lista de Produtos</h1>}
      <ul>
        {products.map((product) => {
          return (
            <ProductItem
              key={product.id}
              onDelete={() => handleDelete(product.id)}
              product={product}
            />
          );
        })}
      </ul>
      <ToastContainer position="top-center" />
    </div>
  );
}
