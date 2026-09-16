import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AlunosList() {
  const [alunos, setAlunos] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  function carregar() {
    setCarregando(true);
    api
      .get("/alunos")
      .then(res => setAlunos(res.data))
      .catch(() => setErro("Não foi possível carregar os alunos."))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregar();
  }, []);

  function excluir(id) {
    if (!window.confirm("Deseja realmente excluir este aluno?")) return;

    api
      .delete(`/alunos/${id}`)
      .then(() => carregar())
      .catch(() => setErro("Não foi possível excluir o aluno."));
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Alunos</h2>
        <Link to="/alunos/novo" className="btn btn-primary">
          + Novo Aluno
        </Link>
      </div>

      {erro && <div className="alert alert-danger">{erro}</div>}

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <table className="table table-striped bg-white">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Matrícula</th>
              <th>Curso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map(aluno => (
              <tr key={aluno.id}>
                <td>{aluno.nome}</td>
                <td>{aluno.matricula}</td>
                <td>{aluno.curso}</td>
                <td>
                  <Link
                    to={`/alunos/${aluno.id}/editar`}
                    className="btn btn-sm btn-outline-secondary me-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => excluir(aluno.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {alunos.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  Nenhum aluno cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AlunosList;