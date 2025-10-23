import { useState, useEffect } from 'react';
import '../styles/anuncios.scss';
import Menu from '../utils/Menu';
import { userController } from '../controller/user.controller';
import { anounceController } from '../controller/anounce.controller';

interface Anuncio {
  id: string;
  title: string;
  description: string;
  date: string;
  createdBy: string;
  roles: string[];
}

interface User {
  id: string;
  name: string;
  role: string;
  number: string;
}

function Anuncios() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const storedID = localStorage.getItem('ID');
    if (!storedID) return;

    userController(
      { id: storedID },
      (data) => setCurrentUser(data.user),
      (error) => console.error(error)
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const newAnuncio: Anuncio = {
      id: String(Date.now()),
      title,
      description,
      date,
      createdBy: currentUser.name,
      roles: selectedRoles,
    };

    try {
        setLoading(true);
        setFeedback(null);

        for(const role of selectedRoles) {
            await anounceController.send({
                title,
                description,
                date,
                role,
            });
        }

        setAnuncios([newAnuncio, ...anuncios]);
        setTitle('');
        setDescription('');
        setDate('');
        setSelectedRoles([]);

        setFeedback({ type: 'success', message: 'Anúncio enviado com sucesso ao WhatsApp!' })
    } catch (err: any) {
        console.clear();
        console.error(err);
        setFeedback({ type: 'error', message: 'Erro ao enviar anúncio. Verifique o backend.' });
    } finally {
        setLoading(false);
    }
  };

  const preview: Anuncio = {
      id: 'preview',
      title,
      description,
      date,
      createdBy: currentUser?.name || 'Carregando...',
      roles: []
  };

    return (
        <>
            <Menu />
            <main className="anuncios-container">
                <section className="create-section">
                    <header>
                        <h1>Criar Novo Anúncio</h1>
                    </header>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Título
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Título do anúncio"
                                required
                            />
                        </label>
                        <label>
                            Descrição
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Descrição do anúncio"
                                required
                            />
                        </label>
                        <label>
                            Data
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Destinatários
                            <select
                                multiple
                                value={selectedRoles}
                                onChange={(e) => {
                                const options = Array.from(e.target.selectedOptions, option => option.value);
                                setSelectedRoles(options);
                                }}
                            >
                                <option value="admin">Admin</option>
                                <option value="mecanico">Mecanico</option>
                                <option value="recepcao">Recepção</option>
                                <option value="limpeza">Limpeza</option>
                                <option value="geral">Todos</option>
                            </select>
                        </label>

                        <button type="submit" disabled={loading}>
                            {loading ? 'Enviando...' : 'Criar Anúncio'}
                        </button>

                        {feedback && (
                            <p className={`feedback ${feedback.type}`}>
                                {feedback.message}
                            </p>
                        )}
                    </form>
                </section>

                <section className="preview-section">
                    <div className="preview">
                        <header>
                            <h2>Pré-visualização</h2>
                        </header>
                        <article className="anuncio-preview">
                            <h3>{preview.title || 'Título do anúncio'}</h3>
                            <p>{preview.description || 'Descrição do anúncio...'}</p>
                            <time>{preview.date || 'Data do anúncio'}</time>
                            <p className="created-by">Criado por: {preview.createdBy}</p>
                        </article>
                    </div>

                    <div className="anuncios-list">
                        <header>
                            <h2>Anúncios Criados</h2>
                        </header>
                        <div className="scroll">
                            {anuncios.length === 0 && <p>Nenhum anúncio criado hoje.</p>}
                            {anuncios.map((anuncio) => (
                                <article key={anuncio.id} className="anuncio">
                                    <h3>{anuncio.title}</h3>
                                    <p>{anuncio.description}</p>
                                    <time>{anuncio.date}</time>
                                    <p className="created-by">Criado por: {anuncio.createdBy}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Anuncios;