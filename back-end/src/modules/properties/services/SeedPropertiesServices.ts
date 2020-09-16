import { injectable, inject } from 'tsyringe';

import IPropertiesRepository from '@modules/properties/repositories/IPropertiesRepository';

interface IProperty {
  title: string;
  description: string;
  area: number;
  price: number;
  address: string;
  address_number: string;
  address_complement: string;
  address_district: string;
  address_zipcode: string;
  address_city: string;
  address_state: string;
}

@injectable()
class SeedPropertiesService {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,
  ) {}

  private properties: IProperty[] = [
    {
      title: 'Condominio Terras de Florenca - Sobrado, condominio na Vila',
      description:
        'Condominio Terras de Florenca - Sobrado, condominio na Vila do Golf, 03 suites, living em 02 ambientes, varanda gourmet com churrasqueira, piscina, vestiario, deposito, quintal, home TV, escritorio, rica em armarios, ar condicionado, 05 banheiros, 04 vagas, alto padrao, excelente localizacao, proximo ao Condominio Siena.CARACTERISTICAS DO CONDOMINIO: Churrasqueira, Espaco Gourmet, Fitness, Quadra Poliesportiva, Quadra Tenis, Salao de Festa, Portao Eletronico. - Bairro: Vila do Golf Ref. Imovel: V2010.',
      price: 50000,
      area: 270,
      address: 'Vila do Golf',
      address_number: 'SN',
      address_complement: '',
      address_district: 'Centro',
      address_zipcode: '7384000',
      address_city: 'Ribeirão Preto',
      address_state: 'SP',
    },
    {
      title: 'Sobrado maravilhoso com 157m² de área privativa em 03 pisos',
      description:
        'Sobrado maravilhoso com 157m² de área privativa em 03 pisos. Possui 03 dormitórios, sendo 01 suíte, área de lazer na cobertura com churrasqueira e garagem para 04 carros. Venha morar em grande estilo ao lado de via de acesso para São Paulo e cidades do Grande ABC. Agende já sua visita com um de nossos corretores e venha conhecer!',
      price: 75000,
      area: 157,
      address: 'Rua Alvaro Anes',
      address_number: '10',
      address_complement: '',
      address_district: 'Santa Maria',
      address_zipcode: '87440000',
      address_city: 'Santo André',
      address_state: 'SP',
    },
    {
      title:
        'Linda casa com 3 dormitórios, sala de tv, sala de estar integrada',
      description:
        'Linda casa com 3 dormitórios, sala de tv, sala de estar integrada com a cozinha, quintal, entrada lateral. Toda reformada.Próximo a USP e ao metrô Butantã. Vale a pena conhecer.',
      price: 105000,
      area: 230,
      address: 'Rua Doutor da Gama Corrêa',
      address_number: 'SN',
      address_complement: '',
      address_district: 'Butantã',
      address_zipcode: '4571000',
      address_city: 'São Paulo',
      address_state: 'SP',
    },
  ];

  public async execute(): Promise<void> {
    this.properties.forEach(async property => {
      await this.propertiesRepository.create(property);
    });
  }
}

export default SeedPropertiesService;
