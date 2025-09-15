/** @format */

import { renderPage } from "../render.js";

export function notFoundHandler() {
  return {
    statusCode: 404,
    body: renderPage({
      title: "Not Found",
      header: "404",
      content: "Page not found.",
    }),
  };
}
