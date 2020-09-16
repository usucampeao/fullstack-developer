import { injectable, inject } from 'tsyringe';

import Property from '@modules/properties/infra/typeorm/entities/Property';
import IPropertiesRepository from '@modules/properties/repositories/IPropertiesRepository';

interface IRequest {
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
class CreatePropertyService {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,
  ) {}

  public async execute({
    title,
    description,
    price,
    area,
    address,
    address_number,
    address_complement,
    address_district,
    address_zipcode,
    address_city,
    address_state,
  }: IRequest): Promise<Property> {
    const property = await this.propertiesRepository.create({
      title,
      description,
      price,
      area,
      address,
      address_number,
      address_complement,
      address_district,
      address_zipcode,
      address_city,
      address_state,
    });

    return property;
  }
}

export default CreatePropertyService;
