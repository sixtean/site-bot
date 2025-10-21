import { useState } from "react";
import Menu from "../utils/Menu";
import packageJson from '../../package.json';
import '../styles/config.scss';

function Config() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <Menu />
      <main className="config-page">
        {/* Cabeçalho */}
        <header className="config-header">
          <h1>
            <i className="bi bi-gear-fill"></i> Configurações
          </h1>
          <p>Gerencie preferências do sistema e opções da conta.</p>
        </header>

        {/* Seção 1 — Preferências Gerais */}
        <section className="config-section">
          <h2><i className="bi bi-sliders"></i> Preferências Gerais</h2>

          <div className="config-item">
            <div className="item-info">
              <h3><i className="bi bi-moon"></i> Tema Escuro</h3>
              <p>Ative o modo escuro para uma aparência mais confortável.</p>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>

          <div className="config-item">
            <div className="item-info">
              <h3><i className="bi bi-bell"></i> Notificações</h3>
              <p>Receba alertas sobre novas atualizações e mensagens.</p>
            </div>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>

          <div className="config-item">
            <div className="item-info">
              <h3><i className="bi bi-translate"></i> Idioma</h3>
              <p>Escolha o idioma preferido para o painel.</p>
            </div>
            <select name="language" id="language">
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">Inglês (EUA)</option>
            </select>
          </div>
        </section>

        {/* Seção 2 — Conta */}
        <section className="config-section">
          <h2><i className="bi bi-person-circle"></i> Conta</h2>

          <div className="config-item">
            <div className="item-info">
              <h3><i className="bi bi-lock"></i> Segurança</h3>
              <p>Altere sua senha e verifique as permissões de login.</p>
            </div>
            <button className="btn-secondary">
              <i className="bi bi-shield-lock"></i> Gerenciar
            </button>
          </div>

          <div className="config-item">
            <div className="item-info">
              <h3><i className="bi bi-person-x"></i> Encerrar Conta</h3>
              <p>Desative permanentemente sua conta do sistema.</p>
            </div>
            <button className="btn-danger">
              <i className="bi bi-trash"></i> Deletar
            </button>
          </div>
        </section>

        {/* Seção 3 — Sobre o Sistema */}
        <section className="config-section">
          <h2><i className="bi bi-info-circle"></i> Sobre o Sistema</h2>
          <div className="config-item about-item">
            <div className="item-info">
              <h3><i className="bi bi-cpu"></i> Informações do Sistema</h3>
              <p>Veja detalhes técnicos e versão da aplicação.</p>
            </div>
            <button
              className="btn-secondary"
              onClick={() => setShowAbout(!showAbout)}
            >
              <i className="bi bi-eye"></i> {showAbout ? "Fechar" : "Ver Mais"}
            </button>
          </div>

          {/* Balão de informações */}
          {showAbout && (
            <div className="about-popup">
                <div className="about-content">
                    <button 
                        className="close-btn" 
                        onClick={() => setShowAbout(false)}
                        aria-label="Fechar"
                    >
                        <i className="bi bi-x"></i>
                    </button>
                    <h4><i className="bi bi-box"></i> Detalhes do Sistema</h4>
                    <ul>
                      <li><i className="bi bi-terminal"></i> Versão: {packageJson.version}</li>
                      <li><i className="bi bi-server"></i> Servidor: Node.js 20</li>
                      <li><i className="bi bi-cloud"></i> Ambiente: Produção</li>
                      <li><i className="bi bi-database"></i> Banco de Dados: MySQL</li>
                    </ul>
                </div>
            </div>
          )}
        </section>

        {/* Rodapé */}
        <footer className="config-footer">
          <button className="btn-primary">
            <i className="bi bi-check-circle"></i> Salvar Alterações
          </button>
        </footer>
      </main>
    </>
  );
}

export default Config;
