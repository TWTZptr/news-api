import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Init1689970887522 implements MigrationInterface {
  private readonly tables = [
    new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'email',
          type: 'varchar',
          length: '255',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'password',
          type: 'varchar',
          isUnique: false,
          isNullable: false,
        },
      ],
    }),
    new Table({
      name: 'news',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'title',
          type: 'varchar',
          length: '255',
          isUnique: false,
          isNullable: false,
        },
        {
          name: 'text',
          type: 'varchar',
          isUnique: false,
          isNullable: false,
        },
        {
          name: 'author_id',
          type: 'integer',
          isUnique: false,
          isNullable: false,
        },
      ],
    }),
  ];

  private readonly foreignKeys = [
    {
      table: 'news',
      fk: new TableForeignKey({
        columnNames: ['author_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const table of this.tables) {
      await queryRunner.createTable(table);
    }

    for (const foreignKey of this.foreignKeys) {
      await queryRunner.createForeignKey(foreignKey.table, foreignKey.fk);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const reversedTables = this.tables.reverse();

    for (const table of reversedTables) {
      await queryRunner.dropTable(table);
    }
  }
}
