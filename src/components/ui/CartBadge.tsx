"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";

export default function CartBadge() {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const count = mounted ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <Link href="/cart" className="flex items-center gap-2 hover:text-accent transition-colors relative">
      <ShoppingCart size={20} />
      {count > 0 && (
        <span className="bg-accent text-secondary text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center absolute -top-2 -right-2">
          {count}
        </span>
      )}
    </Link>
  );
}
