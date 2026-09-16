import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function EmprestimosList() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  function carregar() {
    setCarregando(true);
    Promise.all([api.get("/emprestimos"), api.get("/equipamentos")])
      .then(([resEmprestimos, resEquipamentos]) => {
        setEmprestimos(resEmprestimos.data);
        setEquipamentos(resEquipamentos.data);
      })
      .catch(() => setErro("Não foi possível carregar os empréstimos."))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregar();
  }, []);

  function nomesEquipamentos(ids) {
    return ids
      .map(id => equipamentos.find(equip => equip.id === id)?.nome || `#${id}`)
      .join(", ");
  }

  function devolver(id) {
    if (!window.confirm("Confirmar devolução deste empréstimo?")) return;

    api
      .put(`/emprestimos/${id}`)
      .then(() => carregar())
      .catch(err =>
        setErro(err.response?.data?.erro || "Erro ao registrar devolução.")
      );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Empréstimos</h2>
        <Link to="/emprestimos/novo" className="btn btn-primary">
          + Novo Empréstimo
        </Link>
      </div>

      {erro && <div className="alert alert-danger">{erro}</div>}

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <table className="table table-striped bg-white">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Equipamentos</th>
              <th>Empréstimo</th>
              <th>Devolução Prevista</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {emprestimos.map(emp => (
              <tr key={emp.id}>
                <td>{emp.nomeAluno}</td>
                <td>{nomesEquipamentos(emp.equipamentoIds)}</td>
                <td>{emp.dataEmprestimo}</td>
                <td>{emp.dataDevolucaoPrevista}</td>
                <td>
                  <span
                    className={`badge bg-${
                      emp.status === "Ativo" ? "warning" : "success"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td>
                  {emp.status === "Ativo" && (
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => devolver(emp.id)}
                    >
                      Registrar Devolução
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {emprestimos.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  Nenhum empréstimo registrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmprestimosList;