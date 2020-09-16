import FakePropertiesRepository from '../repositories/fakes/FakePropertiesRepository';
import DeletePropertyService from './DeletePropertyService';

let fakePropertiesRepository: FakePropertiesRepository;
let deleteProperty: DeletePropertyService;

describe('DeleteProperty', () => {
  beforeEach(() => {
    fakePropertiesRepository = new FakePropertiesRepository();
    deleteProperty = new DeletePropertyService(fakePropertiesRepository);
  });

  it('should be able to delete a property', async () => {
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

    await deleteProperty.execute(property.id);

    await expect(
      fakePropertiesRepository.findById(property.id),
    ).resolves.toBeUndefined();
  });
});
