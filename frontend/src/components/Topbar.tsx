import { useAuthStore } from '../store/authStore';

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  const { logout } = useAuthStore();

  return (
    <header className="topbar">
      <div className="tb-title">{title}</div>
      <div className="tb-actions">
        <select className="fs" title="Simular perfil de acesso" defaultValue="admin">
          <option value="admin">👑 Admin</option>
          <option value="gestor">🎯 Gestor</option>
          <option value="fiscal">📋 Fiscal</option>
          <option value="colaborador">👤 Colaborador</option>
        </select>
        <button className="btn btn-ghost btn-sm">💬 Interação</button>
        <button className="btn btn-primary btn-sm">+ Novo Cliente</button>
        <button className="btn btn-danger btn-sm" onClick={logout} style={{ marginLeft: '10px' }}>Sair</button>
      </div>
    </header>
  );
}
