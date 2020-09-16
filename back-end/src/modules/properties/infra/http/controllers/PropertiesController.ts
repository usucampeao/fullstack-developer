import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePropertyService from '@modules/properties/services/CreatePropertyService';
import ListPropertyService from '@modules/properties/services/ListPropertiesService';
import ShowPropertyService from '@modules/properties/services/ShowPropertyService';
import UpdatePropertyService from '@modules/properties/services/UpdatePropertyService';
import DeletePropertyService from '@modules/properties/services/DeletePropertyService';

import Property from '../../typeorm/entities/Property';

interface IResponseObject {
  id: string;
  titulo: string;
  descricao: string;
  area: number;
  valor: number;
  endereco: {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
  };
}

export default class PropertiesController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listProperties = container.resolve(ListPropertyService);

    const properties = await listProperties.execute();

    const translatedProperties = properties.map(property =>
      PropertiesController.translateObject(property),
    );

    return response.json(translatedProperties);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProperty = container.resolve(ShowPropertyService);

    const property = await showProperty.execute(id);

    return response.json(PropertiesController.translateObject(property));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { titulo, descricao, area, valor, endereco } = request.body;

    const createProperty = container.resolve(CreatePropertyService);

    const property = await createProperty.execute({
      title: titulo,
      description: descricao,
      area,
      price: valor,
      address: endereco.logradouro,
      address_number: endereco.numero,
      address_complement: endereco.complemento,
      address_district: endereco.bairro,
      address_zipcode: endereco.cep,
      address_city: endereco.cidade,
      address_state: endereco.estado,
    });

    return response.json(PropertiesController.translateObject(property));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { titulo, descricao, area, valor, endereco } = request.body;

    const udpateProperty = container.resolve(UpdatePropertyService);

    const property = await udpateProperty.execute({
      id,
      title: titulo,
      description: descricao,
      area,
      price: valor,
      address: endereco.logradouro,
      address_number: endereco.numero,
      address_complement: endereco.complemento,
      address_district: endereco.bairro,
      address_zipcode: endereco.cep,
      address_city: endereco.cidade,
      address_state: endereco.estado,
    });

    return response.json(PropertiesController.translateObject(property));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProperty = container.resolve(DeletePropertyService);

    await deleteProperty.execute(id);

    return response.status(204).send();
  }

  private static translateObject(property: Property): IResponseObject {
    return {
      id: property.id,
      titulo: property.title,
      descricao: property.description,
      area: property.area,
      valor: property.price,
      endereco: {
        logradouro: property.address,
        numero: property.address_number,
        complemento: property.address_complement,
        bairro: property.address_district,
        cep: property.address_zipcode,
        cidade: property.address_city,
        estado: property.address_state,
      },
    } as IResponseObject;
  }
}
