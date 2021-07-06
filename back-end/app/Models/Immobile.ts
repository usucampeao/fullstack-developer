import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Immobile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public amount: number

  @column()
  public area: number

  @column()
  public address: string

  @column({ columnName: 'address_number' })
  public addressNumber: string

  @column()
  public complement: string

  @column()
  public district: string

  @column()
  public city: string

  @column()
  public state: string

  @column({ columnName: 'zip_code' })
  public zipCode: string

  //Será usado como data de postagem
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
