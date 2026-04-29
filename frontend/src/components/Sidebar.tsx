import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function Sidebar() {
  const { user } = useAuthStore();
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'clientes', label: 'Clientes', icon: '👥', path: '/clientes' },
    { id: 'onboarding', label: 'Onboarding', icon: '🚀', path: '/onboarding', badge: 7 },
    { id: 'relacionamento', label: 'Relacionamento', icon: '💬', path: '/relacionamento', badge: 4 },
    { id: 'offboarding', label: 'Offboarding', icon: '🔄', path: '/offboarding' },
    { id: 'precificacao', label: 'Precificação', icon: '💰', path: '/precificacao' },
    { id: 'relatorios', label: 'Relatórios', icon: '📄', path: '/relatorios' },
    { id: 'configuracoes', label: 'Configurações', icon: '⚙️', path: '/configuracoes' },
  ];

  return (
    <aside id="sidebar">
      <div className="sl-logo">
        <div className="brand">Cony<span>x</span></div>
        <div className="tag">ERP Contábil</div>
      </div>
      <nav className="sl-nav">
        {navItems.map(item => (
          <Link
            key={item.id}
            to={item.path}
            className={`nav-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
            style={{ textDecoration: 'none' }}
          >
            <span className="ni">{item.icon}</span>
            {item.label}
            {item.badge && <span className="nb">{item.badge}</span>}
          </Link>
        ))}
      </nav>
      <div className="sl-foot">
        <div className="u-info">
          <div className="u-av">{user?.name ? user.name.substring(0, 2).toUpperCase() : 'U'}</div>
          <div>
            <div className="u-name">{user?.name || 'Usuário'}</div>
            <div className="u-role">
              {user?.role === 'admin' ? 'Administrador' : 'Colaborador'}
              <span className="role-badge">{user?.role === 'admin' ? 'Admin' : 'Membro'}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
