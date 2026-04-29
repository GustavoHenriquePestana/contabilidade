import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LoginResponse, AuthError } from '../types/auth';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Preencha e-mail e senha.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const errData: AuthError = await response.json();
        throw new Error(errData.detail || 'Falha no login');
      }
      
      const data: LoginResponse = await response.json();
      login(data.user, data.token);
      
      // Animação de saída antes de navegar (simulação)
      setTimeout(() => {
        navigate('/dashboard');
      }, 400);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-overlay">
      <div className="lp-bg"></div>
      <div className="lp-blob lp-blob-1"></div>
      <div className="lp-blob lp-blob-2"></div>
      <div className="lp-blob lp-blob-3"></div>
      <div className="lp-grid"></div>
      <div className="lp-wave">
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#0e7ef7" d="M0,160 C240,220 480,60 720,120 C960,180 1200,40 1440,100 L1440,220 L0,220 Z"/>
          <path fill="#10b981" opacity=".5" d="M0,180 C360,120 720,200 1080,140 C1260,110 1380,170 1440,160 L1440,220 L0,220 Z"/>
        </svg>
      </div>

      <div className="lp-left">
        <div className="lp-logo">
          <div className="lp-logo-name">Cony<span className="cx">x</span></div>
          <div className="lp-logo-sub">
            <div className="dash"></div>
            <span>ERP Contábil</span>
          </div>
        </div>
        <div className="lp-headline">
          <h1>Controle total da<br /><span className="hl">operação contábil</span></h1>
          <p>A plataforma completa para escritórios contábeis gerenciarem sua operação com inteligência, precisão e eficiência.</p>
        </div>
        <div className="lp-security">
          <div className="lp-sec-icon">🛡️</div>
          <div className="lp-sec-text">
            <strong>Sistema 100% seguro</strong>
            <span>Seus dados protegidos com tecnologia de ponta</span>
          </div>
        </div>
      </div>

      <div className="lp-right">
        <div className="lp-card">
          <div className="lp-lock">🔒</div>
          <div className="lp-card-header">
            <h2>Bem-vindo ao Conyx</h2>
            <p>Faça login para acessar sua conta</p>
          </div>

          {error && <div className="lp-error-msg" style={{display: 'block'}}>{error}</div>}

          <div className="lp-field">
            <label className="lp-label" htmlFor="lp-email">E-mail ou usuário</label>
            <div className="lp-input-wrap">
              <span className="lp-ico">👤</span>
              <input 
                className={`lp-input ${error ? 'error' : ''}`} 
                id="lp-email" 
                type="email" 
                placeholder="Digite seu e-mail ou usuário"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
            </div>
          </div>

          <div className="lp-field">
            <label className="lp-label" htmlFor="lp-senha">Senha</label>
            <div className="lp-input-wrap">
              <span className="lp-ico">🔒</span>
              <input 
                className={`lp-input ${error ? 'error' : ''}`} 
                id="lp-senha" 
                type={showPw ? "text" : "password"} 
                placeholder="Digite sua senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
              <button className="lp-toggle-pw" type="button" onClick={() => setShowPw(!showPw)}>👁️</button>
            </div>
          </div>

          <div className="lp-options">
            <label className="lp-remember">
              <input type="checkbox" id="lp-remember" />
              <span>Lembrar-me</span>
            </label>
            <span className="lp-forgot">Esqueci minha senha</span>
          </div>

          <button className="lp-btn" onClick={handleLogin} disabled={loading}>
            {loading ? <div className="lp-spinner" style={{display:'block'}}></div> : <div className="lp-btn-inner">Entrar</div>}
          </button>
        </div>
      </div>
    </div>
  );
}
