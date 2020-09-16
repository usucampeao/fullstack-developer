import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';
import IPropertiesRepository from '@modules/properties/repositories/IPropertiesRepository';

@injectable()
class DeletePropertyService {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const property = await this.propertiesRepository.findById(id);

    if (!property) {
      throw new AppError(locale.resources.properties.notFound, 404);
    }

    await this.propertiesRepository.delete(property.id);
  }
}

export default DeletePropertyService;
