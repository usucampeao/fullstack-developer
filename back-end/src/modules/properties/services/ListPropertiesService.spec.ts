import FakePropertiesRepository from '@modules/properties/repositories/fakes/FakePropertiesRepository';
import ListPropertiesServices from './ListPropertiesService';

let fakePropertiesRepository: FakePropertiesRepository;
let listPropertiesServices: ListPropertiesServices;

describe('ListProperties', () => {
  beforeEach(() => {
    fakePropertiesRepository = new FakePropertiesRepository();

    listPropertiesServices = new ListPropertiesServices(
      fakePropertiesRepository,
    );
  });

  it('should be able to list the properties', async () => {
    const property1 = await fakePropertiesRepository.create({
      title: 'Casa de dois quartos',
      description: 'Casa de dois quartos e dois banheiros',
      area: 60,
      price: 50000,
      address: 'Rua 18 Quadra 20 Lote 10',
      address_number: 'SN',
      address_complement: 'Próximo ao metrô',
      address_district: 'Centro',
      address_zipcode: '7384000',
      address_state: 'DF',
      address_city: 'Taguatinga',
    });

    const property2 = await fakePropertiesRepository.create({
      title: 'Casa de dois quartos',
      description: 'Casa de três quartos e dois banheiros',
      area: 50,
      price: 80000,
      address: 'Rua 12 Quadra 1 Lote 1',
      address_number: '1',
      address_complement: '',
      address_district: 'Centro',
      address_zipcode: '74100000',
      address_state: 'GO',
      address_city: 'Campos Belos',
    });

    const properties = await listPropertiesServices.execute();

    expect(properties).toEqual([property1, property2]);
  });
});
