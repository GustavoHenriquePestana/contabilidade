import { Layout } from '../components/Layout';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <Layout title={title}>
      <div className="sec-coming" style={{ height: 'calc(100vh - 120px)' }}>
        <div className="ci">🚧</div>
        <h4>Módulo em Desenvolvimento</h4>
        <p>{description || `A funcionalidade de ${title} está sendo construída e estará disponível em breve.`}</p>
      </div>
    </Layout>
  );
}
