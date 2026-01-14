"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

// กำหนดข้อมูล Apple 10 รายการไว้ในนี้เลย เพื่อให้แสดงผลบน Vercel ได้ทันที
const initialProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 41900,
    description: "Titanium design, A17 Pro chip",
  },
  {
    id: 2,
    name: "iPhone 15",
    price: 32900,
    description: "Dynamic Island, 48MP Main camera",
  },
  {
    id: 3,
    name: "iPad Pro M4",
    price: 39900,
    description: "Ultra Retina XDR, M4 chip",
  },
  {
    id: 4,
    name: "iPad Air M2",
    price: 23900,
    description: "M2 chip, 11-inch display",
  },
  {
    id: 5,
    name: "MacBook Air M3",
    price: 39900,
    description: "13-inch, M3 chip, 8GB RAM",
  },
  {
    id: 6,
    name: "MacBook Pro 14",
    price: 59900,
    description: "M3 chip, Liquid Retina XDR",
  },
  {
    id: 7,
    name: "Apple Watch S9",
    price: 15900,
    description: "S9 SiP, Double tap gesture",
  },
  {
    id: 8,
    name: "Apple Watch Ultra 2",
    price: 31900,
    description: "3000 nits, Rugged design",
  },
  {
    id: 9,
    name: "AirPods Pro 2",
    price: 8990,
    description: "Active Noise Cancellation",
  },
  {
    id: 10,
    name: "AirPods Max",
    price: 19900,
    description: "High-fidelity audio, Space Gray",
  },
];

export default function HomePage() {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (id: number) => {
    if (confirm("ยืนยันการลบสินค้า?")) {
      setProducts(products.filter((p) => p.id !== id));
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
                  <button
                    onClick={() => handleDelete(p.id)}
                    className={styles.deleteBtn}
                  >
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

// styles moved to ./page.module.css
