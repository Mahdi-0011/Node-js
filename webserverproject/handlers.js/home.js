import { renderPage } from "../render.js";

export function homeHandler() {
  return {
    statusCode: 200,
    body: renderPage({
      title: "Home",
      header: "Hello World!",
      content: "This is the home page.",
    }),
  };
}
