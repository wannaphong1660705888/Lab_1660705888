import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg text-sm font-semibold transition ${
      isActive
        ? "bg-amber-400 text-slate-950"
        : "text-slate-400 hover:text-white"
    }`;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-3 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-xl">📦</span>
          <span className="text-white font-black text-lg tracking-tight">
            StockOS
          </span>
        </div>
        <div className="flex gap-2">
          <NavLink to="/" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            สินค้า
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
