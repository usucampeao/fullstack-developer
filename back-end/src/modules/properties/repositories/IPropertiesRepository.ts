import Property from '@modules/properties/infra/typeorm/entities/Property';
import ICreatePropertyDTO from '@modules/properties/dtos/ICreatePropertyDTO';

export default interface IPropertiesRepository {
  find(): Promise<Property[]>;
  findById(id: string): Promise<Property | undefined>;
  create(data: ICreatePropertyDTO): Promise<Property>;
  save(data: Property): Promise<Property>;
  delete(id: string): Promise<void>;
}
