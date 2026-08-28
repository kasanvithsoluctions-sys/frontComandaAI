export type Category = "Todos" | "Entradas" | "Pratos" | "Hambúrgueres" | "Bebidas" | "Sobremesas";
export type OrderStatus = "received" | "kitchen" | "preparing" | "ready" | "delivered";
export interface Product { id: string; name: string; description: string; price: number; category: Category; image: string; tag?: string; }
export interface CartItem extends Product { quantity: number; }
export interface Order { id: string; createdAt: string; status: OrderStatus; items: CartItem[]; total: number; }
export interface User { name: string; email: string; initials: string; }
