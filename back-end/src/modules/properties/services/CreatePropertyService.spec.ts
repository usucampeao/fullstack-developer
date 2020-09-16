import FakePropertiesRepository from '../repositories/fakes/FakePropertiesRepository';
import CreatePropertyService from './CreatePropertyService';

let fakePropertiesRepository: FakePropertiesRepository;
let createProperty: CreatePropertyService;

describe('CreateProperty', () => {
  beforeEach(() => {
    fakePropertiesRepository = new FakePropertiesRepository();

    createProperty = new CreatePropertyService(fakePropertiesRepository);
  });

  it('should be able to create a new property', async () => {
    const property = await createProperty.execute({
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

    expect(property).toHaveProperty('id');
    expect(property.title).toBe('Casa de dois quartos');
  });
});
