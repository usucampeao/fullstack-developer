import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';

import Property from '@modules/properties/infra/typeorm/entities/Property';
import IPropertiesRepository from '@modules/properties/repositories/IPropertiesRepository';

@injectable()
class ShowPropertyService {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,
  ) {}

  public async execute(id: string): Promise<Property> {
    const property = await this.propertiesRepository.findById(id);

    if (!property) {
      throw new AppError(locale.resources.properties.notFound, 404);
    }

    return property;
  }
}

export default ShowPropertyService;
