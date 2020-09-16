import FakePropertiesRepository from '../repositories/fakes/FakePropertiesRepository';
import UpdatePropertyService from './UpdatePropertyService';

let fakePropertiesRepository: FakePropertiesRepository;
let updateProperty: UpdatePropertyService;

describe('UpdateProperty', () => {
  beforeEach(() => {
    fakePropertiesRepository = new FakePropertiesRepository();

    updateProperty = new UpdatePropertyService(fakePropertiesRepository);
  });

  it('should be able to update a property', async () => {
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

    const updatedProperty = await updateProperty.execute({
      id: property.id,
      title: 'Casa de três quartos',
    });

    expect(updatedProperty.title).toBe('Casa de três quartos');
  });
});
