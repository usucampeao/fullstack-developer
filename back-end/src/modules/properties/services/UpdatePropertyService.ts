import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';

import Property from '@modules/properties/infra/typeorm/entities/Property';
import IPropertiesRepository from '@modules/properties/repositories/IPropertiesRepository';

interface IRequest {
  id: string;
  title?: string;
  description?: string;
  area?: number;
  price?: number;
  address?: string;
  address_number?: string;
  address_complement?: string;
  address_district?: string;
  address_zipcode?: string;
  address_city?: string;
  address_state?: string;
}

@injectable()
class UpdatePropertyService {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,
  ) {}

  public async execute({
    id,
    title,
    description,
    area,
    price,
    address,
    address_number,
    address_complement,
    address_district,
    address_zipcode,
    address_city,
    address_state,
  }: IRequest): Promise<Property> {
    const property = await this.propertiesRepository.findById(id);

    if (!property) {
      throw new AppError(locale.resources.properties.notFound, 404);
    }

    property.title = title || property.title;
    property.description = description || property.description;
    property.area = area || property.area;
    property.price = price || property.price;
    property.address = address || property.address;
    property.address_number = address_number || property.address_number;
    property.address_complement =
      address_complement || property.address_complement;
    property.address_district = address_district || property.address_district;
    property.address_zipcode = address_zipcode || property.address_zipcode;
    property.address_city = address_city || property.address_city;
    property.address_state = address_state || property.address_state;

    return this.propertiesRepository.save(property);
  }
}

export default UpdatePropertyService;
