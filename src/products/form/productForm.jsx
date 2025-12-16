import "./productForm.css";
import { useForm } from "react-hook-form";

export function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="product-form">
      <h1>Formulário de Produto</h1>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <label htmlFor="title">titulo</label>
        <input
          type="text"
          id="title"
          {...register("title", {
            required: "O título é obrigatório",
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
          {...register("price", {
            required: "O preço é obrigatório",
            min: { value: 0, message: "O preço não pode ser negativo" },
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
    </div>
  );
}
