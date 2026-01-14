"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "../../src/types/product";
import axios from "axios";
import styles from "./Product.module.css";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const API_URL = "http://localhost:3000/products";

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    void (async () => {
      await fetchData();
    })();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("ยืนยันการลบสินค้า?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      // update state locally
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Apple Inventory</h1>
        <Link href="/product/create">
          <button className={styles.addButton}>+ Add Product</button>
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.theadRow}>
              <th className={styles.th}>PRODUCT NAME</th>
              <th className={styles.th}>PRICE</th>
              <th className={styles.th}>DESCRIPTION</th>
              <th className={styles.thCenter}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className={styles.tr}>
                <td className={styles.tdBold}>{p.name}</td>
                <td className={styles.td}>฿{p.price.toLocaleString()}</td>
                <td className={styles.tdLight}>{p.description}</td>
                <td className={styles.tdCenter}>
                  <Link href={`/product/${p.id}`} className={styles.editLink}>
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(p.id)} className={styles.deleteBtn}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
