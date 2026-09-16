import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EquipamentoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [form, setForm] = useState({
    patrimonio: "",
    nome: "",
    categoria: "",
    status: "Disponível"
  });
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (editando) {
      api
        .get(`/equipamentos/${id}`)
        .then(res => setForm(res.data))
        .catch(() => setErro("Equipamento não encontrado."));
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    const request = editando
      ? api.put(`/equipamentos/${id}`, form)
      : api.post("/equipamentos", form);

    request
      .then(() => navigate("/equipamentos"))
      .catch(err =>
        setErro(err.response?.data?.erro || "Erro ao salvar equipamento.")
      );
  }

  return (
    <div className="container">
      <h2 className="text-center">{editando ? "Editar" : "Novo"} Equipamento</h2>
       {erro && <div className="alert alert-danger mx-auto" style={{ maxWidth: 480 }}>{erro}</div>}

      <form onSubmit={handleSubmit} className="mt-3 mx-auto" style={{ maxWidth: 480 }}>
        <div className="mb-3">
          <label className="form-label">Patrimônio</label>
          <input
            className="form-control"
            name="patrimonio"
            value={form.patrimonio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            className="form-control"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Categoria</label>
          <input
            className="form-control"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            required
          />
        </div>

        {editando && (
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Disponível">Disponível</option>
              <option value="Em Uso">Em Uso</option>
              <option value="Em Manutenção">Em Manutenção</option>
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/equipamentos")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EquipamentoForm;