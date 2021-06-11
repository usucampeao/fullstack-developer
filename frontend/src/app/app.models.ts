export class Property {
  constructor(
    public id: number,
    public title: string,
    public desc: string,
    public propertyType: string,
    public propertyStatus: string[],
    public city: string,
    public zipCode: string[],
    public neighborhood: string[],
    public street: string[],
    public location: Location,
    public formattedAddress: string,
    public features: string[],
    public featured: boolean,
    public priceReal: Price,
    public bedrooms: number,
    public bathrooms: number,
    public garages: number,
    public area: Area,
    public yearBuilt: number,
    public ratingsCount: number,
    public ratingsValue: number,
    public additionalFeatures: AdditionalFeature[],
    public gallery: Gallery[],
    public published: string,
    public lastUpdate: string,
    public views: number,
    public photo_url: string,
    public logradouro: string,
    public titulo: string,
    public descricao: string,
    public valor: string,
    public tipo: string,
    public status: string,
    public cep: string,
    public numero: string,
    public complemento: string,
    public bairro: string,
    public cidade: string,
    public estado: string
  ) {}
}

export class Area {
  constructor(public id: number, public value: number, public unit: string) {}
}

export class AdditionalFeature {
  constructor(public id: number, public name: string, public value: string) {}
}

export class Location {
  constructor(
    public propertyId: number,
    public lat: number,
    public lng: number
  ) {}
}

export class Price {
  public sale: number;
  public rent: number;
}

export class Gallery {
  constructor(
    public id: number,
    public small: string,
    public medium: string,
    public big: string
  ) {}
}

export class Plan {
  constructor(
    public id: number,
    public name: string,
    public desc: string,
    public area: Area,
    public rooms: number,
    public baths: number,
    public image: string
  ) {}
}

export class Pagination {
  constructor(
    public page: number,
    public perPage: number,
    public prePage: number,
    public nextPage: number,
    public total: number,
    public totalPages: number
  ) {}
}

export class User {
  constructor(public userName: string, public password: string, public fullname: string) {}
}

export interface UserReturn {
  id?: number;
  name?: string;
  email?: string;
}

export class CEP {
  constructor(
    public cep: string,
    public state: string,
    public city: string,
    public street: string,
    public neighborhood: string,
    public complement: string
  ) {}
}
