import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoLS.png';
import '../styles/login.scss';

import { loginController } from '../controller/login.controller';

function LoginPage() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await loginController(
      { id, password },
      (data) =>{
        setLoading(false);
        localStorage.setItem('ID', data.user.id);
        navigate('/home');
      },
      (message) => {
        setLoading(false);
        setError(message);
      }
    )
  }

  return (
    <main className="login-page">
      <section className="login-box">
        <header className="login-header">
          <img src={logo} alt="Logo da Empresa" className="login-logo" />
          <h1>Bem-vindo de volta</h1>
          <p>Entre na sua conta para continuar</p>
        </header>

        {/* FORMULÁRIO */}
        <form className="login-form" onSubmit={onSubmit}>
        {error && <p className="login-error">{error}</p>}
          <div className="form-group">
            <label htmlFor="userId">ID do Usuário</label>
            <input
              type="text"
              id="userId"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Digite seu ID"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

      </section>
    </main>
  )
}

export default LoginPage