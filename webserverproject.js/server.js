import { createServer } from "http";
import { resolveRoute } from "./router.js";

const server = createServer((req, res) => {
  const { statusCode, body } = resolveRoute(req.url);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.statusCode = statusCode;
  res.end(body);
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
