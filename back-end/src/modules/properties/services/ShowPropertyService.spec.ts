import FakePropertiesRepository from '@modules/properties/repositories/fakes/FakePropertiesRepository';
import ShowPropertyService from './ShowPropertyService';

let fakePropertiesRepository: FakePropertiesRepository;
let showPropertyServices: ShowPropertyService;

describe('ShowProperty', () => {
  beforeEach(() => {
    fakePropertiesRepository = new FakePropertiesRepository();

    showPropertyServices = new ShowPropertyService(fakePropertiesRepository);
  });

  it('should be able to show the property', async () => {
    const property = await fakePropertiesRepository.create({
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

    const foundProperty = await showPropertyServices.execute(property.id);

    expect(foundProperty.id).toBe(property.id);
  });
});
