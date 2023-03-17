import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "mypassword",
        database: "nest_api",
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true
      });

      return dataSource.initialize();
    },
  },
];