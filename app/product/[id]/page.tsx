"use client";

import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import styles from "../create/ProductCreate.module.css";

// กำหนดกฎการตรวจสอบข้อมูล
const schema = z.object({
  name: z.string().min(1, "กรุณาระบุชื่อสินค้า"),
  price: z.coerce.number().min(1, "ราคาต้องมากกว่า 0"),
  description: z.string().min(1, "กรุณาระบุคำอธิบาย"),
});

type FormData = z.infer<typeof schema>;

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams(); // ดึง ID จาก URL

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData, unknown>,
  });

  // ดึงข้อมูลเดิมมาแสดง (เหมือนในรูปที่ 8-9)
  useEffect(() => {
    const fetchOldData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        // หยอดข้อมูลใส่ฟอร์ม
        setValue("name", res.data.name);
        setValue("price", res.data.price);
        setValue("description", res.data.description);
      } catch (err) {
        console.error(err);
        alert("ไม่พบข้อมูลสินค้านี้");
        router.push("/product");
      }
    };
    if (id) fetchOldData();
  }, [id, setValue, router]);

  const onSubmit = async (data: FormData) => {
    try {
      await axios.patch(`http://localhost:3000/products/${id}`, data);
      alert("อัปเดตข้อมูลสำเร็จ");
      router.push("/product");
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  return (
    <div className={styles.bg}>
      <div className={styles.card}>
        <h2 className={styles.title}>Edit Product</h2>
        <p className={styles.subtitle}>ID: {id}</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Product Name</label>
            <input {...register("name")} className={styles.input} />
            {errors.name && <span className={styles.err}>{errors.name.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Price (THB)</label>
            <input type="number" {...register("price")} className={styles.input} />
            {errors.price && <span className={styles.err}>{errors.price.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea {...register("description")} className={styles.input} rows={3} />
            {errors.description && <span className={styles.err}>{errors.description.message}</span>}
          </div>

          <button type="submit" className={styles.submitBtn}>Update Product</button>
          <p onClick={() => router.back()} className={styles.cancel}>Cancel</p>
        </form>
      </div>
    </div>
  );
}


