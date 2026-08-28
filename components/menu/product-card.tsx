"use client";

import { Plus } from "lucide-react";
import { money } from "@/lib/format";
import type { Product } from "@/types";

export function ProductCard({ product, onSelect }: { product: Product; onSelect: (product: Product) => void }) {
  return <article className="card product"><div style={{ position: "relative" }}><img src={product.image} alt={product.name}/>{product.tag && <span style={{ position: "absolute", top: 12, left: 12, background: "#fffefa", borderRadius: 999, padding: "5px 9px", fontSize: 11, fontWeight: 700, color: "#315b45" }}>{product.tag}</span>}</div><div style={{ padding: 16 }}><p style={{ fontSize: 12, color: "#87928b", margin: "0 0 5px" }}>{product.category}</p><h3 style={{ margin: 0, fontSize: 16 }}>{product.name}</h3><p style={{ fontSize: 13, lineHeight: 1.4, color: "#68736c", height: 37, margin: "7px 0 13px" }}>{product.description}</p><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><b style={{ color: "#315b45" }}>{money(product.price)}</b><button className="secondary" onClick={() => onSelect(product)} style={{ padding: "8px 11px" }} aria-label={`Ver ${product.name}`}><Plus size={17}/></button></div></div></article>;
}
