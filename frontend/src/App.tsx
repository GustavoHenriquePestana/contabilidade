import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { useAuthStore } from './store/authStore';
import { Login } from './pages/Login';
import { Clientes } from './pages/Clientes';
import { Onboarding } from './pages/Onboarding';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { ToastContainer } from './components/ToastContainer';

function App() {
  const { token } = useAuthStore();

  // Função helper para proteger rotas
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!token) return <Navigate to="/" />;
    return children;
  };

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        
        {/* Rotas Protegidas do ERP */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        <Route path="/clientes" element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/relacionamento" element={<ProtectedRoute><PlaceholderPage title="Relacionamento" /></ProtectedRoute>} />
        <Route path="/offboarding" element={<ProtectedRoute><PlaceholderPage title="Offboarding" /></ProtectedRoute>} />
        <Route path="/precificacao" element={<ProtectedRoute><PlaceholderPage title="Precificação" /></ProtectedRoute>} />
        <Route path="/relatorios" element={<ProtectedRoute><PlaceholderPage title="Relatórios" /></ProtectedRoute>} />
        <Route path="/configuracoes" element={<ProtectedRoute><PlaceholderPage title="Configurações" /></ProtectedRoute>} />
        
        {/* Rota de Fallback (Página não encontrada) */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

export default App;
