export interface Cliente {
  id: string;
  razao_social: string;
  cnpj: string;
  regime: string;
  origem: string;
  status: string;
  responsavel: string;
  entrada: string;
}

export interface ClienteCreate {
  razao_social: string;
  cnpj: string;
  regime: string;
  origem: string;
  responsavel: string;
}
