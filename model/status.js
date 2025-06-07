import database from "infra/database.js";

async function databaseVersionValue() {
  const databaseVersionResult = await database.query("SHOW server_version");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;
  return databaseVersionValue;
}

async function databaseMaxConnectionsValue() {
  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections"
  );

  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  return databaseMaxConnectionsValue;
}

async function databaseOpenedConnectionsValue() {
  const databaseName = process.env.POSTGRES_DB;
  const databaseMaxOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseMaxOpenedConnectionsValue =
    databaseMaxOpenedConnectionsResult.rows[0].count;
  return databaseMaxOpenedConnectionsValue;
}

const status = {
  databaseVersionValue,
  databaseMaxConnectionsValue,
  databaseOpenedConnectionsValue,
};

export default status;
