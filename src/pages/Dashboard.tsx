import { useInventory } from "../hooks/useInventory";

interface DashboardProps {
  inventory: ReturnType<typeof useInventory>;
}

export default function Dashboard({ inventory }: DashboardProps) {
  const { totalItems, totalValue, outOfStock, products } = inventory;

  const topProducts = [...products]
    .sort((a, b) => b.price * b.quantity - a.price * a.quantity)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-2">
            ภาพรวมสต๊อก
          </p>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard
            label="จำนวนสินค้าทั้งหมด"
            value={`${totalItems} รายการ`}
            icon="📦"
            accent="border-sky-500"
          />
          <StatCard
            label="มูลค่ารวมสต๊อก"
            value={`฿${totalValue.toLocaleString()}`}
            icon="💰"
            accent="border-amber-400"
          />
          <StatCard
            label="สินค้าหมด"
            value={`${outOfStock} รายการ`}
            icon="🚨"
            accent="border-rose-500"
          />
        </div>

        {/* Top Products */}
        <div>
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">
            สินค้ามูลค่าสต๊อกสูงสุด
          </p>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div
                key={p.id}
                className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black text-slate-700 w-8">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-white font-semibold">{p.name}</p>
                    <p className="text-slate-400 text-sm">
                      {p.quantity} ชิ้น × ฿{p.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-amber-400 font-bold text-lg">
                  ฿{(p.price * p.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string;
  icon: string;
  accent: string;
}) {
  return (
    <div
      className={`bg-slate-900 border-t-2 ${accent} border-x border-b border-slate-800 rounded-xl p-6`}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  );
}
