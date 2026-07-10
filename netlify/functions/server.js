import { createRequestHandler } from "@tanstack/react-start/server";
import { createServer } from "http";
import { readFileSync } from "fs";

const handler = async (event) => {
  const request = new Request(event.rawUrl, {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body,
  });

  const response = await createRequestHandler({
    request,
    getRouter: () => import("../../dist/server/server.js").then((m) => m.router),
  });

  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers),
    body: await response.text(),
  };
};

export { handler };
