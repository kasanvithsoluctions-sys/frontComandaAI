import { Order, Product, User } from "@/types";

export const user: User = { name: "Marina Costa", email: "marina.costa@email.com", initials: "MC" };
export const categories = ["Todos", "Entradas", "Pratos", "Hambúrgueres", "Bebidas", "Sobremesas"] as const;
export const products: Product[] = [
  { id: "p1", name: "Risoto de cogumelos", description: "Arroz arbóreo, mix de cogumelos, parmesão e azeite trufado.", price: 58, category: "Pratos", tag: "Mais pedido", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=85" },
  { id: "p2", name: "Oliva burger", description: "Blend da casa, queijo meia-cura, cebola caramelizada e aioli.", price: 42, category: "Hambúrgueres", tag: "Favorito", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85" },
  { id: "p3", name: "Burrata tostada", description: "Tomates assados, pesto de manjericão e focaccia da casa.", price: 34, category: "Entradas", image: "https://images.unsplash.com/photo-1625944525092-9b6d37b7b4c4?auto=format&fit=crop&w=900&q=85" },
  { id: "p4", name: "Nhoque al limone", description: "Nhoque artesanal, creme de limão siciliano e sálvia fresca.", price: 49, category: "Pratos", image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=900&q=85" },
  { id: "p5", name: "Spritz da casa", description: "Aperitivo cítrico, espumante brut e água com gás.", price: 28, category: "Bebidas", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85" },
  { id: "p6", name: "Tiramisù", description: "Mascarpone, café espresso, cacau e biscoito savoiardi.", price: 26, category: "Sobremesas", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85" }
];
export const activeOrder: Order = { id: "#OLV-0842", createdAt: "Hoje, 20:14", status: "preparing", total: 100, items: [{ ...products[0], quantity: 1 }, { ...products[4], quantity: 1 }, { ...products[2], quantity: 1, price: 14 }] };
