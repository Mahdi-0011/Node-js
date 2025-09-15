import { createServer } from "http";

const server = createServer((req, res) => {
  const route = req.url;
  let title = "Not Found";
  let header = "404";
  let content = "Page not found.";

  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (route === "/") {
    title = "Home";
    header = "Hello world!";
    content = "This is the home page.";
    res.statusCode = 200;
  } else if (route === "/contact") {
    title = "Contact";
    header = "Contact us";
    content = "You can reach us at contact@example.com";
    res.statusCode = 200;
  } else if (route === "/about") {
    title = "About";
    header = "About page";
    content = "This is the about page.";
    res.statusCode = 200;
  } else {
    res.statusCode = 404;
  }

  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
    </head>
    <body>
        <h1>${header}</h1>
        <p>${content}</p>
    </body>
    </html>
  `);
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
