import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { ProductList } from "./products/list/productList";
import { ProductForm } from "./products/form/productForm";
import { ProductDetail } from "./products/detail/productDetail";
import { Header } from "./header/header";

const baseUrl = import.meta.env.BASE_URL;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={baseUrl}>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/novo/:id?" element={<ProductForm />} />
        <Route path="/produtos/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
