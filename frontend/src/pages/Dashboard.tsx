import { useQuery } from '@tanstack/react-query';
import { Layout } from '../components/Layout';
import { DashboardStats } from '../types/dashboard';

const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const res = await fetch('/api/dashboard/stats');
  if (!res.ok) throw new Error('Falha ao carregar dashboard');
  return res.json();
};

export function Dashboard() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  if (isLoading) {
    return (
      <Layout title="Dashboard">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--g500)' }}>
          <div className="lp-spinner" style={{ display: 'block', borderColor: 'var(--g300)', borderTopColor: 'var(--accent)', marginRight: '10px' }}></div>
          Carregando dados...
        </div>
      </Layout>
    );
  }

  if (error || !stats) {
    return (
      <Layout title="Dashboard">
        <div className="empty">
          <div className="ei">⚠️</div>
          <p>Não foi possível carregar os dados.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <div className="stats-grid">
        <div className="stat-card"><div className="sl">Clientes Ativos</div><div className="sv">{stats.clientes_ativos}</div><div className="ss">↑ {stats.clientes_novos_mes} este mês</div></div>
        <div className="stat-card warning"><div className="sl">Em Onboarding</div><div className="sv">{stats.em_onboarding}</div><div className="ss">{stats.onboarding_atraso} com atraso</div></div>
        <div className="stat-card danger"><div className="sl">Em Atenção</div><div className="sv">{stats.em_atencao}</div><div className="ss">Requer ação</div></div>
        <div className="stat-card"><div className="sl">Em Offboarding</div><div className="sv">{stats.em_offboarding}</div><div className="ss">{stats.offboarding_atraso} atrasados</div></div>
        <div className="stat-card"><div className="sl">Tarefas em Aberto</div><div className="sv">{stats.tarefas_aberto}</div><div className="ss">Todos os setores</div></div>
        <div className="stat-card danger"><div className="sl">Tarefas Atrasadas</div><div className="sv">{stats.tarefas_atrasadas}</div><div className="ss">↑ {stats.tarefas_novas_semana} esta semana</div></div>
      </div>

      <div className="card" style={{ marginBottom: '18px' }}>
        <div className="card-header">
          <div className="card-title">🚨 Alertas Operacionais</div>
          <span style={{ fontSize: '.7rem', color: 'var(--g400)' }}>Atualizado agora</span>
        </div>
        <div className="card-body">
          <div className="alert-grid">
            <div className="ai red"><span className="aico">⏰</span><div className="atxt"><strong>31 tarefas atrasadas</strong><span>Fiscal, DP e Contábil</span></div></div>
            <div className="ai red"><span className="aico">📂</span><div className="atxt"><strong>14 docs pendentes</strong><span>Clientes sem envio</span></div></div>
            <div className="ai red"><span className="aico">🚧</span><div className="atxt"><strong>7 onboardings travados</strong><span>Mais de 15 dias parados</span></div></div>
            <div className="ai yellow"><span className="aico">📅</span><div className="atxt"><strong>8 obrigações próximas</strong><span>Vencimento em 3 dias</span></div></div>
            <div className="ai yellow"><span className="aico">👤</span><div className="atxt"><strong>9 sem contato +30d</strong><span>Clientes em risco</span></div></div>
          </div>
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-header"><div className="card-title">Volume por Setor</div></div>
          <div className="card-body">
            <div className="sbi"><div className="sbn">⚖️ Fiscal</div><div className="sbt"><div className="sbf" style={{ width: '78%' }}></div></div><div className="sbc">58</div><div className="sblate">12 ⚠️</div></div>
            <div className="sbi"><div className="sbn">👷 Dep. Pessoal</div><div className="sbt"><div className="sbf" style={{ width: '55%', background: '#8b5cf6' }}></div></div><div className="sbc">41</div><div className="sblate">8 ⚠️</div></div>
            <div className="sbi"><div className="sbn">📒 Contábil</div><div className="sbt"><div className="sbf" style={{ width: '42%', background: '#10b981' }}></div></div><div className="sbc">31</div><div className="sblate">6 ⚠️</div></div>
            <div className="sbi"><div className="sbn">🏢 Societário</div><div className="sbt"><div className="sbf" style={{ width: '22%', background: '#f59e0b' }}></div></div><div className="sbc">16</div><div className="sblate">3 ⚠️</div></div>
            <div className="sbi"><div className="sbn">💳 Financeiro</div><div className="sbt"><div className="sbf" style={{ width: '3%', background: '#ef4444' }}></div></div><div className="sbc">1</div><div className="sblate">2 ⚠️</div></div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">📈 Produtividade</div></div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px', textAlign: 'center' }}>
              <div><div style={{ fontFamily: "'Sora',sans-serif", fontSize: '2rem', fontWeight: 800, color: 'var(--green)' }}>14</div><div style={{ fontSize: '.74rem', color: 'var(--g400)', marginTop: '3px' }}>Tarefas concluídas hoje</div></div>
              <div><div style={{ fontFamily: "'Sora',sans-serif", fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>73</div><div style={{ fontSize: '.74rem', color: 'var(--g400)', marginTop: '3px' }}>Concluídas esta semana</div></div>
              <div><div style={{ fontFamily: "'Sora',sans-serif", fontSize: '2rem', fontWeight: 800, color: 'var(--navy)' }}>2,4d</div><div style={{ fontSize: '.74rem', color: 'var(--g400)', marginTop: '3px' }}>Tempo médio de conclusão</div></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
