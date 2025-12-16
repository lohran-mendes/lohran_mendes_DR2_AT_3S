import "./productDetail.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function ProductDetail() {
  const { id: productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [productDetail, setProductDetail] = useState(null);

  async function fetchProductDetail() {
    setLoading(true);
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await response.json();
    setProductDetail(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  return (
    <div className="product-detail">
      {loading ? <h1>Carregando...</h1> : <h1>Detalhes do Produto</h1>}
      {productDetail && (
        <div className="container-detail">
          <img src={productDetail.images[0]} alt={productDetail.title} />
          <div className="info">
            <h2>{productDetail.title}</h2>
            <p className="description">{productDetail.description}</p>
            <span className="price">$ {productDetail.price}</span>
            <p className="category">
              <strong>Categoria:</strong> {productDetail.category}
            </p>
            <p className="stock">
              <strong>Em estoque:</strong> {productDetail.stock} unidades
            </p>
            <p className="shipping">
              <strong>Previsão de envio: </strong>
              {productDetail.shippingInformation}
            </p>
            <p className="warranty">
              <strong>Garantia: </strong>
              {productDetail.warrantyInformation}
            </p>
            <p className="rating">
              <strong>Avaliação:</strong> ⭐ {productDetail.rating}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
