import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function EmprestimoForm() {
  const navigate = useNavigate();

  const [alunos, setAlunos] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);
  const [alunoId, setAlunoId] = useState("");
  const [equipamentoIds, setEquipamentoIds] = useState([]);
  const [dataDevolucaoPrevista, setDataDevolucaoPrevista] = useState("");
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    api.get("/alunos").then(res => setAlunos(res.data));
    api
      .get("/equipamentos?status=Disponível")
      .then(res => setEquipamentos(res.data));
  }, []);

  function toggleEquipamento(id) {
    setEquipamentoIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setAviso("");

    api
      .post("/emprestimos", {
        alunoId: Number(alunoId),
        equipamentoIds,
        dataDevolucaoPrevista
      })
      .then(res => {
        if (res.data.aviso) {
          setAviso(res.data.aviso);
          setTimeout(() => navigate("/emprestimos"), 2500);
        } else {
          navigate("/emprestimos");
        }
      })
      .catch(err =>
        setErro(err.response?.data?.erro || "Erro ao registrar empréstimo.")
      );
  }

  return (
    <div className="container">
      <h2>Novo Empréstimo</h2>
      {erro && <div className="alert alert-danger">{erro}</div>}
      {aviso && <div className="alert alert-warning">{aviso}</div>}

      <form onSubmit={handleSubmit} className="mt-3" style={{ maxWidth: 480 }}>
        <div className="mb-3">
          <label className="form-label">Aluno</label>
          <select
            className="form-select"
            value={alunoId}
            onChange={e => setAlunoId(e.target.value)}
            required
          >
            <option value="">Selecione um aluno...</option>
            {alunos.map(aluno => (
              <option key={aluno.id} value={aluno.id}>
                {aluno.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Equipamentos disponíveis</label>
          {equipamentos.length === 0 && (
            <p className="text-muted">Nenhum equipamento disponível.</p>
          )}
          {equipamentos.map(equip => (
            <div className="form-check" key={equip.id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`equip-${equip.id}`}
                checked={equipamentoIds.includes(equip.id)}
                onChange={() => toggleEquipamento(equip.id)}
              />
              <label className="form-check-label" htmlFor={`equip-${equip.id}`}>
                {equip.nome} ({equip.patrimonio})
              </label>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label className="form-label">Data de Devolução Prevista</label>
          <input
            type="date"
            className="form-control"
            value={dataDevolucaoPrevista}
            onChange={e => setDataDevolucaoPrevista(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={equipamentoIds.length === 0}
        >
          Registrar Empréstimo
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/emprestimos")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EmprestimoForm;