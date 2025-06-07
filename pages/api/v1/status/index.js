import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import status from "model/status.js";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const updateAt = new Date().toISOString();

  const databaseVersionValue = await status.databaseVersionValue();
  const databaseMaxConnectionValue = await status.databaseMaxConnectionsValue();
  const databaseOpenedConnectionsValue =
    await status.databaseOpenedConnectionsValue();

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}
