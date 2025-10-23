import { useEffect, useState } from "react";
import { userController } from "../controller/user.controller";
import { type UserDTO } from "../DTOs/userDTO";
import Menu from "../utils/Menu";
import "../styles/home.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function Home() {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [plate, setPlate] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [estimatedTime, setEstimatedTime] = useState<string>("--:--")

  useEffect(() => {
    const id = localStorage.getItem("ID");
    if (!id) return;

    userController(
      { id },
      (data) => setUser(data.user as UserDTO),
      (error) => console.error(error)
    );
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const checkStatus = () => {
    // Aqui você pode chamar sua API de status do veículo
    // Por enquanto vamos simular com dados aleatórios
    const statuses = ["Aguardando", "Iniciando", "Em andamento", "Concluído"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setStatus(randomStatus);

    // Simula % de conclusão
    const progressMap: Record<string, number> = {
      "Aguardando": 0,
      "Iniciando": 25,
      "Em andamento": 65,
      "Concluído": 100
    };
    setProgress(progressMap[randomStatus]);

    const now = new Date();
    now.setMinutes(now.getMinutes() + Math.floor(Math.random() * 120));
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    setEstimatedTime(`${hours}:${minutes}`);
  };

  return (
    <>
      <Menu />
      <main className="home-page">
        {/* Cabeçalho */}
        <header className="home-header">
          <section className="user-section">
            <div className="user-avatar">
              <img
                src={profileImage || "/default-avatar.png"}
                alt="Foto do usuário"
              />
              <label htmlFor="upload" className="upload-icon">
                <i className="bi bi-camera-fill"></i>
              </label>
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="user-info">
              <h1>
                <i className="bi bi-person-circle"></i>{" "}
                {user?.name || "Usuário LS Molas"}
              </h1>
              <div className="user-details">
                <p>
                  <i className="bi bi-telephone"></i> (11) 99999-9999
                </p>
                <p>
                  <i className="bi bi-geo-alt"></i> São Paulo - SP
                </p>
              </div>
            </div>

            <div className="company-info">
              <h2>LS Molas</h2>
              <p><i className="bi bi-buildings"></i> CNPJ: 12.345.678/0001-90</p>
              <p><i className="bi bi-globe"></i> www.lsmolas.com.br</p>
              <p><i className="bi bi-gear"></i> Fabricando qualidade desde 1998</p>
            </div>
          </section>
        </header>

        {/* Seção de verificar servoço */}
        <section className="vehicle-status-card">
          <h3><i className="bi bi-car-front-fill"></i> Status do Veículo</h3>
          <div className="input-group">
            <input
              type="text"
              placeholder="Digite a placa"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
            />
            <button onClick={checkStatus}><i className="bi bi-search"></i></button>
          </div>

          {status && (
            <div className="status-info">
              <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
              </div>
              <p>Previsto: {estimatedTime}</p>
              <button className="contact-btn">
                <i className="bi bi-chat-dots"></i> Falar com atendente
              </button>
            </div>
          )}
        </section>
        
        {/* Ações Rápidas */}
        <section className="home-quick-actions">
          
        </section>
      </main>
    </>
  );
}

export default Home;