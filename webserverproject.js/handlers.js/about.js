import { renderPage } from "../render.js";

export function aboutHandler() {
  return {
    statusCode: 200,
    body: renderPage({
      title: "About",
      header: "About page",
      content: "This is the about page.",
    }),
  };
}
