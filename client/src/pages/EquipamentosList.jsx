import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function EquipamentosList() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  function carregar() {
    setCarregando(true);
    api
      .get("/equipamentos")
      .then(res => setEquipamentos(res.data))
      .catch(() => setErro("Não foi possível carregar os equipamentos."))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregar();
  }, []);

  function excluir(id) {
    if (!window.confirm("Deseja realmente excluir este equipamento?")) return;

    api
      .delete(`/equipamentos/${id}`)
      .then(() => carregar())
      .catch(() => setErro("Não foi possível excluir o equipamento."));
  }

  function badgeStatus(status) {
    const cores = {
      "Disponível": "success",
      "Em Uso": "warning",
      "Em Manutenção": "danger"
    };
    return `badge bg-${cores[status] || "secondary"}`;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Equipamentos</h2>
        <Link to="/equipamentos/novo" className="btn btn-primary">
          + Novo Equipamento
        </Link>
      </div>

      {erro && <div className="alert alert-danger">{erro}</div>}

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <table className="table table-striped bg-white">
          <thead>
            <tr>
              <th>Patrimônio</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipamentos.map(equip => (
              <tr key={equip.id}>
                <td>{equip.patrimonio}</td>
                <td>{equip.nome}</td>
                <td>{equip.categoria}</td>
                <td>
                  <span className={badgeStatus(equip.status)}>
                    {equip.status}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/equipamentos/${equip.id}/editar`}
                    className="btn btn-sm btn-outline-secondary me-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => excluir(equip.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {equipamentos.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  Nenhum equipamento cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EquipamentosList;