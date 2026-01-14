"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as z from "zod";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./ProductCreate.module.css";

const schema = z.object({
  name: z.string().min(1, "ระบุชื่อสินค้า"),
  price: z.coerce.number().min(1, "ระบุราคา"),
  description: z.string().min(1, "ระบุคำอธิบาย"),
});

type ProductFormData = z.infer<typeof schema>;

export default function CreateProduct() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(schema) as Resolver<ProductFormData, unknown>,
  });

  const onSubmit = async (data: ProductFormData) => {
    await axios.post("http://localhost:3000/products", data);
    router.push("/product");
  };

  return (
    <div className={styles.bg}>
      <div className={styles.card}>
        <h2 className={styles.title}>New Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <input
              {...register("name")}
              placeholder="Name"
              className={styles.input}
            />
            {errors.name && <span className={styles.err}>{errors.name.message as string}</span>}
          </div>
          <div className={styles.formGroup}>
            <input
              type="number"
              {...register("price")}
              placeholder="Price"
              className={styles.input}
            />
            {errors.price && <span className={styles.err}>{errors.price.message as string}</span>}
          </div>
          <div className={styles.formGroup}>
            <textarea
              {...register("description")}
              placeholder="Description"
              className={styles.input}
              rows={3}
            />
          </div>
          <button type="submit" className={styles.submitBtn}>Save to Inventory</button>
          <p onClick={() => router.back()} className={styles.cancel}>Cancel</p>
        </form>
      </div>
    </div>
  );
}
