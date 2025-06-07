import { Client } from "pg";
import { ServiceError } from "./errors.js";

async function query(queryObject) {
  let client;
  try {
    client = await newClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    const serviceErrorObjec = new ServiceError({
      message: "Erro na conexão com o Banco de Dados ou na Query.",
      cause: error,
    });
  } finally {
    await client?.end();
  }
}

async function newClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValue(),
  });
  await client.connect();
  return client;
}

function getSSLValue() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };

    return process.env.NODE_ENV === "production" ? true : false;
  }
}

const database = {
  query,
  newClient,
};

export default database;
