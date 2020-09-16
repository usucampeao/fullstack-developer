import { v4 as uuid } from 'uuid';

import IPropertiesRepository from '@modules/properties/repositories/IPropertiesRepository';
import ICreatePropertyDTO from '@modules/properties/dtos/ICreatePropertyDTO';

import Property from '@modules/properties/infra/typeorm/entities/Property';

class FakePropertiesRepository implements IPropertiesRepository {
  private properties: Property[] = [];

  public async find(): Promise<Property[]> {
    const { properties } = this;

    return properties;
  }

  public async findById(id: string): Promise<Property | undefined> {
    const foundProperty = this.properties.find(property => property.id === id);

    return foundProperty;
  }

  public async create(propertyData: ICreatePropertyDTO): Promise<Property> {
    const property = new Property();

    Object.assign(property, { id: uuid() }, propertyData);

    this.properties.push(property);

    return property;
  }

  public async save(property: Property): Promise<Property> {
    const propertyIndex = this.properties.findIndex(
      findProperty => findProperty.id === property.id,
    );

    this.properties[propertyIndex] = property;

    return property;
  }

  public async delete(id: string): Promise<void> {
    const propertyIndex = this.properties.findIndex(
      findProperty => findProperty.id === id,
    );

    this.properties.splice(propertyIndex, 1);
  }
}

export default FakePropertiesRepository;
