import Menu from "../utils/Menu";
import '../styles/home.scss';

function Home() {
  return (
    <>
      <Menu />

      <main className="home-page">
        {/* Cabeçalho da Home */}
        <header className="home-header">
          <h1>Bem-vindo ao Painel</h1>
          <p>Visão geral do sistema e informações rápidas.</p>
        </header>

        {/* Seções principais da Home */}
        <section className="home-overview">
          {/* Aqui podemos adicionar cards, estatísticas, gráficos, etc */}
        </section>

        <section className="home-quick-actions">
          {/* Aqui podemos adicionar botões rápidos ou atalhos */}
        </section>
      </main>
    </>
  );
}

export default Home;