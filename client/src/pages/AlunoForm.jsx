import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function AlunoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [form, setForm] = useState({
    nome: "",
    matricula: "",
    curso: ""
  });
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (editando) {
      api
        .get(`/alunos/${id}`)
        .then(res => setForm(res.data))
        .catch(() => setErro("Aluno não encontrado."));
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    const request = editando
      ? api.put(`/alunos/${id}`, form)
      : api.post("/alunos", form);

    request
      .then(() => navigate("/alunos"))
      .catch(err => setErro(err.response?.data?.erro || "Erro ao salvar aluno."));
  }

  return (
    <div className="container">
      <h2>{editando ? "Editar" : "Novo"} Aluno</h2>
      {erro && <div className="alert alert-danger">{erro}</div>}

      <form onSubmit={handleSubmit} className="mt-3" style={{ maxWidth: 480 }}>
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
          <label className="form-label">Matrícula</label>
          <input
            className="form-control"
            name="matricula"
            value={form.matricula}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Curso</label>
          <input
            className="form-control"
            name="curso"
            value={form.curso}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/alunos")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default AlunoForm;