// server.js
import { createServer } from "node:http";
import { writeFile, appendFile } from "node:fs/promises";
import { parse } from "node:url";

// Konfiguration
const CONFIG = {
	port: process.env.PORT || 3000,
	dataFile: "submissions.json",
};

// HTML-template
const createFormHTML = () => `
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kontaktformulär</title>
    <style>
        * { box-sizing: border-box; }
        body { 
            font-family: system-ui, -apple-system, sans-serif; 
            max-width: 600px; 
            margin: 2rem auto; 
            padding: 1rem;
            line-height: 1.6;
        }
        form { 
            background: #f8fafc; 
            padding: 2rem; 
            border-radius: 12px; 
            border: 1px solid #e2e8f0;
        }
        label { 
            display: block; 
            margin-bottom: 0.5rem; 
            font-weight: 500; 
            color: #374151;
        }
        input, textarea { 
            width: 100%; 
            padding: 0.75rem; 
            margin-bottom: 1rem; 
            border: 1px solid #d1d5db; 
            border-radius: 6px;
            font-size: 1rem;
        }
        input:focus, textarea:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        button { 
            background: #3b82f6; 
            color: white; 
            padding: 0.75rem 1.5rem; 
            border: none; 
            border-radius: 6px; 
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
            transition: background-color 0.2s;
        }
        button:hover { background: #2563eb; }
        .success { color: #059669; }
        .error { color: #dc2626; }
    </style>
</head>
<body>
    <h1>Kontaktformulär</h1>
    <form method="POST" action="/submit">
        <label for="name">Namn:</label>
        <input type="text" id="name" name="name" required minlength="2">
        
        <label for="email">E-post:</label>
        <input type="email" id="email" name="email" required>
        
        <label for="message">Meddelande:</label>
        <textarea id="message" name="message" rows="5" required minlength="10"></textarea>
        
        <button type="submit">Skicka meddelande</button>
    </form>
</body>
</html>`;

// Utility functions
const parseRequestBody = async (request) => {
	const chunks = [];

	for await (const chunk of request) {
		chunks.push(chunk);
	}

	const body = Buffer.concat(chunks).toString();
	return Object.fromEntries(new URLSearchParams(body));
};

const validateFormData = (data) => {
	const { name, email, message } = data;

	if (!name?.trim() || name.length < 2) {
		return { valid: false, error: "Namn måste vara minst 2 tecken" };
	}

	if (!email?.includes("@")) {
		return { valid: false, error: "Ogiltig e-postadress" };
	}

	if (!message?.trim() || message.length < 10) {
		return { valid: false, error: "Meddelandet måste vara minst 10 tecken" };
	}

	return { valid: true };
};

const saveSubmission = async (data) => {
	const submission = {
		timestamp: new Date().toISOString(),
		name: data.name.trim(),
		email: data.email.trim().toLowerCase(),
		message: data.message.trim(),
		id: crypto.randomUUID(),
	};

	try {
		await appendFile(
			CONFIG.dataFile,
			JSON.stringify(submission) + "\n",
			"utf8"
		);
		console.log("📝 Ny inlämning sparad:", submission.id);
		return submission;
	} catch (error) {
		console.error("❌ Fel vid filskrivning:", error);
		throw error;
	}
};

const sendResponse = (response, status, contentType, body) => {
	response.writeHead(status, {
		"Content-Type": contentType,
		"X-Powered-By": "Node.js",
	});
	response.end(body);
};

const createSuccessHTML = (data) => `
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meddelande skickat</title>
    <style>
        body { font-family: system-ui, sans-serif; max-width: 600px; margin: 2rem auto; padding: 1rem; }
        .success { background: #ecfdf5; border: 1px solid #10b981; padding: 1rem; border-radius: 6px; color: #047857; }
        .back-link { display: inline-block; margin-top: 1rem; color: #3b82f6; text-decoration: none; }
    </style>
</head>
<body>
    <div class="success">
        <h1>✅ Tack ${data.name}!</h1>
        <p>Ditt meddelande har sparats med ID: <code>${data.id}</code></p>
        <p><strong>E-post:</strong> ${data.email}</p>
    </div>
    <a href="/" class="back-link">← Skicka nytt meddelande</a>
</body>
</html>`;

const createErrorHTML = (message) => `
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <title>Fel</title>
    <style>
        body { font-family: system-ui, sans-serif; max-width: 600px; margin: 2rem auto; padding: 1rem; }
        .error { background: #fef2f2; border: 1px solid #ef4444; padding: 1rem; border-radius: 6px; color: #dc2626; }
    </style>
</head>
<body>
    <div class="error">
        <h1>❌ Fel</h1>
        <p>${message}</p>
    </div>
    <a href="/">← Tillbaka till formuläret</a>
</body>
</html>`;

// Router
const handleRequest = async (request, response) => {
	const { pathname } = parse(request.url);
	const method = request.method;

	console.log(`${method} ${pathname} - ${new Date().toISOString()}`);

	try {
		// Routes
		if (method === "GET" && pathname === "/") {
			sendResponse(
				response,
				200,
				"text/html; charset=utf-8",
				createFormHTML()
			);
			return;
		}

		if (method === "POST" && pathname === "/submit") {
			const formData = await parseRequestBody(request);

			// Validering
			const validation = validateFormData(formData);
			if (!validation.valid) {
				sendResponse(
					response,
					400,
					"text/html; charset=utf-8",
					createErrorHTML(validation.error)
				);
				return;
			}

			// Spara och bekräfta
			const submission = await saveSubmission(formData);
			sendResponse(
				response,
				201,
				"text/html; charset=utf-8",
				createSuccessHTML(submission)
			);
			return;
		}

		// 404
		sendResponse(
			response,
			404,
			"text/html; charset=utf-8",
			createErrorHTML("Sidan hittades inte")
		);
	} catch (error) {
		console.error("💥 Serverfel:", error);
		sendResponse(
			response,
			500,
			"text/html; charset=utf-8",
			createErrorHTML("Internt serverfel")
		);
	}
};

// Server setup
const server = createServer(handleRequest);

const startServer = async () => {
	return new Promise((resolve) => {
		server.listen(CONFIG.port, () => {
			console.log(`🚀 Server igång på http://localhost:${CONFIG.port}`);
			console.log("📁 Data sparas i:", CONFIG.dataFile);
			console.log("⏹️  Tryck Ctrl+C för att stoppa");
			resolve();
		});
	});
};

// Graceful shutdown
const shutdown = () => {
	console.log("\n🛑 Stänger av servern...");
	server.close(() => {
		console.log("✅ Server avstängd");
		process.exit(0);
	});
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Start
await startServer();