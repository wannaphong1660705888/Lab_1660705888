import { useState } from "react";
import { useInventory } from "../hooks/useInventory";

interface ProductsProps {
  inventory: ReturnType<typeof useInventory>;
}

export default function Products({ inventory }: ProductsProps) {
  const { products, addProduct, updateQuantity, deleteProduct } = inventory;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [search, setSearch] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !price || !quantity) return;
    addProduct(name.trim(), parseFloat(price), parseInt(quantity));
    setName("");
    setPrice("");
    setQuantity("");
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-2">
            จัดการคลังสินค้า
          </p>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            สินค้าทั้งหมด
          </h1>
        </div>

        {/* Add Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
          <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-4">
            เพิ่มสินค้าใหม่
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <input
              className="bg-slate-800 text-white placeholder-slate-500 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-400 transition"
              placeholder="ชื่อสินค้า"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="bg-slate-800 text-white placeholder-slate-500 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-400 transition"
              placeholder="ราคา (฿)"
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              className="bg-slate-800 text-white placeholder-slate-500 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-400 transition"
              placeholder="จำนวนเริ่มต้น"
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-3 rounded-lg transition"
          >
            + เพิ่มสินค้า
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            className="w-full bg-slate-900 text-white placeholder-slate-500 border border-slate-800 rounded-xl px-5 py-3 focus:outline-none focus:border-amber-400 transition"
            placeholder="🔍  ค้นหาสินค้า..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Product List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-600 font-mono text-sm">
            ไม่พบสินค้าที่ค้นหา
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((p) => {
              const outOfStock = p.quantity === 0;
              return (
                <div
                  key={p.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border px-5 py-4 transition ${
                    outOfStock
                      ? "bg-rose-950/40 border-rose-900"
                      : "bg-slate-900 border-slate-800"
                  }`}
                >
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="text-white font-semibold truncate">
                        {p.name}
                      </p>
                      {outOfStock && (
                        <span className="text-xs bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full">
                          สินค้าหมด
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm mt-0.5">
                      ราคา ฿{p.price.toLocaleString()} · มูลค่าสต๊อก ฿
                      {(p.price * p.quantity).toLocaleString()}
                    </p>
                  </div>

                  {/* Qty Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(p.id, -1)}
                      disabled={p.quantity === 0}
                      className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white font-bold transition text-lg leading-none"
                    >
                      −
                    </button>
                    <span className="text-white font-mono font-bold w-10 text-center text-lg">
                      {p.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(p.id, 1)}
                      className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition text-lg leading-none"
                    >
                      +
                    </button>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="text-rose-500 hover:text-rose-400 hover:bg-rose-950/50 font-semibold text-sm px-3 py-2 rounded-lg transition"
                  >
                    ลบ
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
