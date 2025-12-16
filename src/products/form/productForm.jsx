import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import "./productForm.css";
import { toast, ToastContainer } from "react-toastify";

export function ProductForm() {
  const { id: productIdOfParam } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!productIdOfParam) return;

    async function fetchProductById() {
      const response = await fetch(
        `https://dummyjson.com/products/${productIdOfParam}`
      );
      const productData = await response.json();
      return productData;
    }

    function resetFormWithProductData(data) {
      const newValuesToForm = {
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category,
      };

      reset(newValuesToForm);
    }

    fetchProductById().then(resetFormWithProductData);
  }, [productIdOfParam, reset]);

  async function createProduct(data) {
    const { title, price, description, category } = data;

    return await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        price,
        description,
        category,
        images: ["https://placehold.co/600x400?text=Produto"],
      }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => {
        console.error("Erro ao criar produto:", err);
        return null;
      });
  }

  async function updateProduct(data) {
    const { title, price, description, category } = data;

    return await fetch(`https://dummyjson.com/products/${productIdOfParam}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        price,
        description,
        category,
      }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => {
        console.error("Erro ao atualizar produto:", err);
        return null;
      });
  }

  async function handleSubmitForm(data) {
    if (productIdOfParam) {
      const updatedProduct = await updateProduct(data);
      if (updatedProduct) {
        navigate("/", {
          state: {
            from: "productForm",
            productUpdated: true,
            productId: productIdOfParam,
          },
        });
      } else {
        toast.error("Erro ao atualizar produto");
      }
    } else {
      const createdProduct = await createProduct(data);
      if (createdProduct) {
        navigate("/", {
          state: {
            from: "productForm",
            productCreated: true,
            productId: createdProduct.id,
          },
        });
      } else {
        toast.error("Erro ao criar produto");
      }
    }
  }

  return (
    <div className="product-form">
      <h1>Formulário de Produto</h1>
      <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
        <label htmlFor="title">titulo</label>
        <input
          type="text"
          id="title"
          {...register("title", {
            required: "O título é obrigatório",
            maxLength: {
              value: 50,
              message: "O título deve ter no máximo 50 caracteres",
            },
            validate: (value) =>
              value.trim().length > 0 ||
              "Não pode conter apenas espaços vazios",
          })}
        />
        <p className="message-error">{errors.title?.message}</p>

        <label htmlFor="price">preço</label>
        <input
          type="number"
          id="price"
          step="0.01"
          {...register("price", {
            required: "O preço é obrigatório",
            valueAsNumber: true,
            min: { value: 0.01, message: "O preço tem que ser maior que zero" },
          })}
        />
        <p className="message-error">{errors.price?.message}</p>

        <label htmlFor="description">descrição</label>
        <input
          type="text"
          id="description"
          {...register("description", {
            required: "A descrição é obrigatória",
            validate: (value) =>
              value.trim().length > 0 ||
              "Não pode conter apenas espaços vazios",
          })}
        />
        <p className="message-error">{errors.description?.message}</p>

        <label htmlFor="categoria">categoria</label>
        <input
          type="text"
          id="categoria"
          {...register("category", {
            required: "A categoria é obrigatória",
            validate: (value) =>
              value.trim().length > 0 ||
              "Não pode conter apenas espaços vazios",
          })}
        />
        <p className="message-error">{errors.category?.message}</p>

        <button type="submit">Salvar</button>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
}
