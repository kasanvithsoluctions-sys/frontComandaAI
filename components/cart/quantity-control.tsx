"use client";

import { Minus, Plus } from "lucide-react";

export function QuantityControl({ value, onChange }: { value: number; onChange: (quantity: number) => void }) {
  return <div className="qty"><button onClick={() => onChange(value - 1)} aria-label="Diminuir"><Minus size={14}/></button><b style={{ fontSize: 14, minWidth: 12, textAlign: "center" }}>{value}</b><button onClick={() => onChange(value + 1)} aria-label="Aumentar"><Plus size={14}/></button></div>;
}
