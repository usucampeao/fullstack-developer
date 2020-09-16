import { injectable, inject } from 'tsyringe';

import Property from '@modules/properties/infra/typeorm/entities/Property';
import IPropertiesRepository from '@modules/properties/repositories/IPropertiesRepository';

@injectable()
class ListPropertyService {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,
  ) {}

  public async execute(): Promise<Property[]> {
    const properties = await this.propertiesRepository.find();

    return properties;
  }
}

export default ListPropertyService;
