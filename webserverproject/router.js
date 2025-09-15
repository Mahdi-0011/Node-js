import { routes } from "./routes.js";
import { notFoundHandler } from "./handlers.js/notfound.js";

export function resolveRoute(url) {
  const handler = routes[url] || notFoundHandler;
  return handler();
}
