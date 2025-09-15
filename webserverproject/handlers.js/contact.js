import { renderPage } from "../render.js";

export function contactHandler() {
  return {
    statusCode: 200,
    body: renderPage({
      title: "Contact",
      header: "Contact us",
      content: "Reach us at contact@example.com",
    }),
  };
}
