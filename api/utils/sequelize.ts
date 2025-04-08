import { Sequelize } from "sequelize";
import { env } from "./env";

const sequelize = new Sequelize(env.POSTGRES_URI!, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;

export const sequelizeConnect = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("Postgres connected");
};
