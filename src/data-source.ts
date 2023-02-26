import { fixDescriptionColumn1677247350244 } from './migrations/1677247350244-fixDescriptionColumn';
import "dotenv/config";
import path from "path";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Movie } from "./entities";
import { firstMigration1677184800364 } from "./migrations/1677184800364-firstMigration";

const dataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(
    __dirname,
    "./entities/**.{ts,js}"
  );
  const migrationPath: string = path.join(
    __dirname,
    "./migrations/**.{ts,js}"
  );

  const dbUrl: string | undefined = process.env.DATABASE_URL;

  if (!dbUrl) throw new Error("Missing env var: 'DATABASE_URL'");

  const nodeEnv: string | undefined = process.env.NODE_ENV;

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [Movie],
    };
  }

  return {
    type: "postgres",
    url: dbUrl,
    synchronize: false,
    logging: true,
    entities: [Movie],
    migrations: [fixDescriptionColumn1677247350244],
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());
