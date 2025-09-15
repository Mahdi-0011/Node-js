import { createServer } from "http";


const server = createServer((req, res) => {
    const title = "hello";
    const header = "Hello world!";
    const content = "lorem ipsum ...";


    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.statusCode = 200;
    res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>
            <h1>${header}</h1>
            <p>${content}</p>
        </body>
        </html>
        `);
});


server.listen(3000);
