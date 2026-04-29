import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '../components/Layout';
import { Cliente } from '../types/client';

const fetchClientes = async (): Promise<Cliente[]> => {
  const res = await fetch('/api/clientes');
  if (!res.ok) throw new Error('Falha ao carregar clientes');
  return res.json();
};

export function Clientes() {
  const { data: clientes, isLoading, error } = useQuery({
    queryKey: ['clientes'],
    queryFn: fetchClientes
  });

  const [search, setSearch] = useState('');
  const [regime, setRegime] = useState('');
  const [status, setStatus] = useState('');
  const [responsavel, setResponsavel] = useState('');

  if (isLoading) {
    return (
      <Layout title="Clientes">
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <div className="lp-spinner" style={{ display: 'inline-block', borderColor: 'var(--primary)', borderTopColor: 'transparent' }}></div>
          <p style={{ marginTop: '10px', color: 'var(--g500)' }}>Carregando base de clientes...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Clientes">
        <div style={{ padding: '20px' }}>
          <div className="card" style={{ borderLeft: '4px solid #ef4444' }}>
            <div className="card-body">⚠️ Não foi possível carregar os clientes. Verifique a conexão com o servidor.</div>
          </div>
        </div>
      </Layout>
    );
  }

  const clientesFiltrados = clientes?.filter(c => {
    const matchSearch = c.razao_social.toLowerCase().includes(search.toLowerCase()) || c.cnpj.includes(search);
    const matchRegime = regime ? c.regime === regime : true;
    const matchStatus = status ? c.status === status : true;
    const matchResp = responsavel ? c.responsavel === responsavel : true;
    return matchSearch && matchRegime && matchStatus && matchResp;
  }) || [];

  return (
    <Layout title="Gestão de Clientes">
      <div id="view-list">
        <div className="ph" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ margin: 0, color: 'var(--navy)', fontFamily: 'Sora' }}>Clientes</h2>
            <p style={{ margin: 0, color: 'var(--g500)' }}>Base central — <span id="client-count">{clientesFiltrados.length}</span> clientes cadastrados</p>
          </div>
          <button className="btn btn-primary">+ Novo Cliente</button>
        </div>

        <div className="card">
          <div className="card-header" style={{ padding: '15px 20px', borderBottom: '1px solid var(--g200)' }}>
            <div className="fbar" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div className="si" style={{ display: 'flex', alignItems: 'center', background: 'var(--g50)', border: '1px solid var(--g200)', borderRadius: '6px', padding: '0 10px', flex: 1, minWidth: '200px' }}>
                <span style={{ marginRight: '8px' }}>🔍</span>
                <input 
                  type="text" 
                  placeholder="Buscar por nome ou CNPJ..." 
                  style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', padding: '8px 0' }}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <select className="fs" style={{ padding: '8px 12px', border: '1px solid var(--g200)', borderRadius: '6px', background: 'var(--g50)' }} value={regime} onChange={e => setRegime(e.target.value)}>
                <option value="">Todos os regimes</option>
                <option>Simples Nacional</option>
                <option>Lucro Presumido</option>
                <option>Lucro Real</option>
                <option>MEI</option>
              </select>
              <select className="fs" style={{ padding: '8px 12px', border: '1px solid var(--g200)', borderRadius: '6px', background: 'var(--g50)' }} value={status} onChange={e => setStatus(e.target.value)}>
                <option value="">Todos os status</option>
                <option>Ativo</option>
                <option>Em implantação</option>
                <option>Em atenção</option>
                <option>Em saída</option>
              </select>
              <select className="fs" style={{ padding: '8px 12px', border: '1px solid var(--g200)', borderRadius: '6px', background: 'var(--g50)' }} value={responsavel} onChange={e => setResponsavel(e.target.value)}>
                <option value="">Todos os responsáveis</option>
                <option>Ana Lima</option>
                <option>Bruno Carvalho</option>
                <option>Carla Santos</option>
              </select>
            </div>
          </div>

          <div className="tw" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: 'var(--g50)', borderBottom: '2px solid var(--g200)' }}>
                <tr>
                  <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--g600)' }}>Razão Social</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--g600)' }}>CNPJ</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--g600)' }}>Regime</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--g600)' }}>Origem</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--g600)' }}>Status</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--g600)' }}>Responsável</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--g600)' }}>Entrada</th>
                  <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--g600)' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientesFiltrados.map(cliente => (
                  <tr key={cliente.id} style={{ borderBottom: '1px solid var(--g100)', cursor: 'pointer' }} className="hover:bg-gray-50">
                    <td style={{ padding: '12px 20px', fontWeight: 500, color: 'var(--navy)' }}>{cliente.razao_social}</td>
                    <td style={{ padding: '12px 20px', color: 'var(--g600)' }}>{cliente.cnpj}</td>
                    <td style={{ padding: '12px 20px' }}>
                      <span className="badge" style={{ background: 'var(--g100)', color: 'var(--g700)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>{cliente.regime}</span>
                    </td>
                    <td style={{ padding: '12px 20px', color: 'var(--g600)' }}>{cliente.origem}</td>
                    <td style={{ padding: '12px 20px' }}>
                      <span className="badge" style={{ 
                        background: cliente.status === 'Ativo' ? '#dcfce7' : cliente.status === 'Em implantação' ? '#dbeafe' : '#fef08a', 
                        color: cliente.status === 'Ativo' ? '#166534' : cliente.status === 'Em implantação' ? '#1e40af' : '#854d0e',
                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 
                      }}>
                        {cliente.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 20px', color: 'var(--g600)' }}>{cliente.responsavel}</td>
                    <td style={{ padding: '12px 20px', color: 'var(--g600)' }}>{new Date(cliente.entrada).toLocaleDateString('pt-BR')}</td>
                    <td style={{ padding: '12px 20px' }}>
                      <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>Abrir</button>
                    </td>
                  </tr>
                ))}
                {clientesFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ padding: '30px', textAlign: 'center', color: 'var(--g400)' }}>
                      Nenhum cliente encontrado com os filtros atuais.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
