import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EquipamentosList from "./pages/EquipamentosList";
import EquipamentoForm from "./pages/EquipamentoForm";
import AlunosList from "./pages/AlunosList";
import AlunoForm from "./pages/AlunoForm";
import EmprestimosList from "./pages/EmprestimosList";
import EmprestimoForm from "./pages/EmprestimoForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/equipamentos" element={<EquipamentosList />} />
          <Route path="/equipamentos/novo" element={<EquipamentoForm />} />
          <Route path="/equipamentos/:id/editar" element={<EquipamentoForm />} />

          <Route path="/alunos" element={<AlunosList />} />
          <Route path="/alunos/novo" element={<AlunoForm />} />
          <Route path="/alunos/:id/editar" element={<AlunoForm />} />

          <Route path="/emprestimos" element={<EmprestimosList />} />
          <Route path="/emprestimos/novo" element={<EmprestimoForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;