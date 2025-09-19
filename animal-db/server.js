import express from "express";
import animalsRouter from "./routes/animalRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;


app.use("/api/animals", animalsRouter);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
