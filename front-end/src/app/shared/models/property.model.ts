export default interface Property {
  id?: string;
  titulo: string;
  descricao: string;
  area: number;
  valor: number;
  endereco: {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
  }
}
