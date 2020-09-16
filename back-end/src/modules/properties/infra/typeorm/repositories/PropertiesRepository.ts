import { getRepository, Repository } from 'typeorm';

import IPropertiesRepository from '@modules/properties/repositories/IPropertiesRepository';
import ICreatePropertyDTO from '@modules/properties/dtos/ICreatePropertyDTO';

import Property from '@modules/properties/infra/typeorm/entities/Property';

class PropertiesRepository implements IPropertiesRepository {
  private ormRepository: Repository<Property>;

  constructor() {
    this.ormRepository = getRepository(Property);
  }

  public async find(): Promise<Property[]> {
    const properties = await this.ormRepository.find({
      order: { title: 'ASC' },
    });
    return properties;
  }

  public async findById(id: string): Promise<Property | undefined> {
    const property = await this.ormRepository.findOne(id);
    return property;
  }

  public async create(propertyData: ICreatePropertyDTO): Promise<Property> {
    const property = this.ormRepository.create(propertyData);
    await this.ormRepository.save(property);

    return property;
  }

  public async save(property: Property): Promise<Property> {
    return this.ormRepository.save(property);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default PropertiesRepository;
