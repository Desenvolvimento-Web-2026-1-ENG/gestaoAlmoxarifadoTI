import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <h1 className="mb-4">Painel do Almoxarifado de TI</h1>
      <p className="text-muted mb-4">
        Selecione uma das opções abaixo para gerenciar equipamentos, alunos
        e empréstimos do laboratório.
      </p>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Equipamentos</h5>
              <p className="card-text">
                Cadastre, edite e acompanhe a disponibilidade dos itens.
              </p>
              <Link to="/equipamentos" className="btn btn-primary">
                Acessar
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Alunos</h5>
              <p className="card-text">
                Gerencie o cadastro dos alunos do laboratório.
              </p>
              <Link to="/alunos" className="btn btn-primary">
                Acessar
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Empréstimos</h5>
              <p className="card-text">
                Registre novos empréstimos e devoluções de equipamentos.
              </p>
              <Link to="/emprestimos" className="btn btn-primary">
                Acessar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;