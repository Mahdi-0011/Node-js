import { homeHandler } from "./handlers.js/home.js";
import { contactHandler } from "./handlers.js/contact.js";
import { aboutHandler } from "./handlers.js/about.js";

export const routes = {
  "/": homeHandler,
  "/contact": contactHandler,
  "/about": aboutHandler,
};
