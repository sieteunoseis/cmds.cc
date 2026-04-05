import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hooks from "./pages/Hooks";
import Skills from "./pages/Skills";
import Mcp from "./pages/Mcp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hooks" element={<Hooks />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/mcp" element={<Mcp />} />
      </Routes>
    </BrowserRouter>
  );
}
