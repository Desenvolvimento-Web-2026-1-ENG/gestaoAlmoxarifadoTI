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
    imagem: "",
    status: "Disponível"
  });
  const [imagemPreview, setImagemPreview] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (editando) {
      api
        .get(`/equipamentos/${id}`)
        .then(res => {
          const dados = res.data || {};
          setForm({
            patrimonio: dados.patrimonio || "",
            nome: dados.nome || "",
            categoria: dados.categoria || "",
            imagem: dados.imagem || "",
            status: dados.status || "Disponível"
          });
          setImagemPreview(dados.imagem || "");
        })
        .catch(() => setErro("Equipamento não encontrado."));
    }
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "imagem") {
      setImagemPreview(value);
    }
  }

  function handleFileChange(e) {
    const arquivo = e.target.files?.[0];

    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
      setErro("Selecione um arquivo de imagem válido.");
      return;
    }

    const leitor = new FileReader();
    leitor.onload = () => {
      const imagemDataUrl = leitor.result;
      setForm(prev => ({ ...prev, imagem: imagemDataUrl }));
      setImagemPreview(imagemDataUrl);
      setErro("");
    };
    leitor.readAsDataURL(arquivo);
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

        <div className="mb-3">
          <label className="form-label">Imagem do Equipamento</label>
          <input
            className="form-control mb-2"
            type="url"
            name="imagem"
            value={form.imagem}
            onChange={handleChange}
            placeholder="Insira o link da imagem aqui ou selecione um arquivo abaixo"
          />
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
          />

          {imagemPreview && (
            <div className="mt-3 text-center">
              <img
                src={imagemPreview}
                alt="Pré-visualização do equipamento"
                style={{
                  maxWidth: "100%",
                  maxHeight: 240,
                  objectFit: "cover",
                  borderRadius: 12,
                  border: "1px solid #dfe3e8",
                  background: "#f8f9fa"
                }}
              />
            </div>
          )}
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