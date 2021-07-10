import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Immobiles extends BaseSchema {
  protected tableName = 'immobiles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table
        .increments('id')
      table
        .string('title', 244)
        .notNullable()
      table
        .text('description')
        .notNullable()
      table
        .decimal('amount')
        .notNullable()
      table
        .decimal('area')
        .notNullable()
      table
        .string('address', 244)
        .notNullable()
      table
        .string('address_number', 50)
      table
        .string('complement', 244)
      table
        .string('district', 100)
        .notNullable()
      table
        .string('city', 244)
        .notNullable()
      table
        .string('state', 2)
        .notNullable()
      table
        .string('zip_code', 10)
        .notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table
        .timestamp('created_at', { useTz: true })
      table
        .timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
