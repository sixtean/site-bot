import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState, type JSX } from 'react';
import { userController } from './controller/user.controller';
import './styles/App.css';

const LoginPage = lazy(() => import('./screens/login'));
const HomePage = lazy(() => import('./screens/home'));
const AnunciosPage = lazy(() => import('./screens/anuncios'));
const Config = lazy(() => import('./screens/config'));

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const storedID = localStorage.getItem('ID');
    if(!storedID) {
      setIsAdmin(false);
      return;
    }

    userController(
      { id: storedID },
      (data) => {
        if(data.user?.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      },
      (error) => {
        console.error(error);
        setIsAdmin(false);
      }
    );
  }, []);

  if(isAdmin === null) return <div>Carregando...</div>;
  return isAdmin ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="loading">Carregando...</div>}>
        <Routes>

          {/* 🏠 Rotas públicas */}
          <Route path="/" element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/settings' element={<Config />} />

          {/* 🔒 Rotas privadas */}
          <Route
            path="/announcement"
            element={
              <AdminRoute>
                <AnunciosPage />
              </AdminRoute>
            }
          />
          {/* 🚫 Rota padrão para páginas não encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Suspense>
    </Router>
  )
}

export default App