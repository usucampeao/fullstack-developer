import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProperties1600130698171
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'properties',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'numeric',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'address_number',
            type: 'varchar',
          },
          {
            name: 'address_complement',
            type: 'varchar',
          },
          {
            name: 'address_district',
            type: 'varchar',
          },
          {
            name: 'address_zipcode',
            type: 'varchar',
          },
          {
            name: 'address_city',
            type: 'varchar',
          },
          {
            name: 'address_state',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('properties');
  }
}
