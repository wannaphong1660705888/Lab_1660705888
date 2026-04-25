import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import { useInventory } from "./hooks/useInventory";

export default function App() {
  const inventory = useInventory();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard inventory={inventory} />} />
        <Route path="/products" element={<Products inventory={inventory} />} />
      </Routes>
    </BrowserRouter>
  );
}
