import { Layout } from '../components/Layout';

export function Onboarding() {
  const mockOnboardings = [
    { cliente: 'Tech Inovações LTDA', regime: 'Lucro Presumido', origem: 'Indicação', inicio: '2023-11-01', progresso: 45, status: 'Em andamento', responsavel: 'Ana Lima' },
    { cliente: 'Comércio Silva ME', regime: 'Simples Nacional', origem: 'Google', inicio: '2023-11-05', progresso: 10, status: 'Atrasado', responsavel: 'Bruno Carvalho' },
    { cliente: 'Agência Criativa S.A', regime: 'Lucro Real', origem: 'Outbound', inicio: '2023-10-15', progresso: 100, status: 'Concluído', responsavel: 'Carla Santos' }
  ];

  return (
    <Layout title="Onboarding">
      <div id="sec-onboarding">
        <div className="ph" style={{ marginBottom: '20px' }}>
          <div>
            <h2 style={{ margin: 0, color: 'var(--navy)', fontFamily: 'Sora' }}>Onboarding</h2>
            <p style={{ margin: 0, color: 'var(--g500)' }}>Gestão de entrada de clientes com tarefas automáticas</p>
          </div>
        </div>

        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
          <div className="stat-card">
            <div className="sl">Em andamento</div>
            <div className="sv">11</div>
          </div>
          <div className="stat-card danger">
            <div className="sl">Com atraso</div>
            <div className="sv">7</div>
          </div>
          <div className="stat-card success">
            <div className="sl">Concluídos (mês)</div>
            <div className="sv">9</div>
          </div>
          <div className="stat-card warning">
            <div className="sl">Tarefas abertas</div>
            <div className="sv">84</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header" style={{ padding: '15px 20px', borderBottom: '1px solid var(--g200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="card-title" style={{ fontWeight: 600, color: 'var(--navy)' }}>Lista de Onboardings</div>
            <div className="fbar" style={{ display: 'flex', gap: '10px' }}>
              <div className="si" style={{ display: 'flex', alignItems: 'center', background: 'var(--g50)', border: '1px solid var(--g200)', borderRadius: '6px', padding: '0 10px' }}>
                <span style={{ marginRight: '8px' }}>🔍</span>
                <input type="text" placeholder="Buscar..." style={{ border: 'none', background: 'transparent', outline: 'none', padding: '8px 0' }} />
              </div>
              <select className="fs" style={{ padding: '8px 12px', border: '1px solid var(--g200)', borderRadius: '6px', background: 'var(--g50)' }}>
                <option>Todos</option>
                <option>Em andamento</option>
                <option>Atrasado</option>
                <option>Concluído</option>
              </select>
            </div>
          </div>

          <div className="tw" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: 'var(--g50)', borderBottom: '2px solid var(--g200)' }}>
                <tr>
                  <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--g600)' }}>Cliente</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--g600)' }}>Regime</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--g600)' }}>Origem</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--g600)' }}>Início</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--g600)' }}>Progresso</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--g600)' }}>Status</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--g600)' }}>Responsável</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--g600)' }}>Ação</th>
                </tr>
              </thead>
              <tbody>
                {mockOnboardings.map((onb, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--g100)' }}>
                    <td style={{ padding: '12px 20px', fontWeight: 500, color: 'var(--navy)' }}>{onb.cliente}</td>
                    <td style={{ padding: '12px 20px' }}>
                      <span className="badge" style={{ background: 'var(--g100)', color: 'var(--g700)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>{onb.regime}</span>
                    </td>
                    <td style={{ padding: '12px 20px', color: 'var(--g600)' }}>{onb.origem}</td>
                    <td style={{ padding: '12px 20px', color: 'var(--g600)' }}>{new Date(onb.inicio).toLocaleDateString('pt-BR')}</td>
                    <td style={{ padding: '12px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '100px', height: '6px', background: 'var(--g200)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${onb.progresso}%`, height: '100%', background: onb.progresso === 100 ? '#10b981' : 'var(--primary)' }}></div>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--g600)', width: '30px' }}>{onb.progresso}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 20px' }}>
                      <span className="badge" style={{ 
                        background: onb.status === 'Concluído' ? '#dcfce7' : onb.status === 'Em andamento' ? '#dbeafe' : '#fee2e2', 
                        color: onb.status === 'Concluído' ? '#166534' : onb.status === 'Em andamento' ? '#1e40af' : '#b91c1c',
                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 
                      }}>
                        {onb.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 20px', color: 'var(--g600)' }}>{onb.responsavel}</td>
                    <td style={{ padding: '12px 20px' }}>
                      <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>Detalhes</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
