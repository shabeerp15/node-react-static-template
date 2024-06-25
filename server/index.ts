import express, { type Request, type Response } from "express";
import path from "path";

const app = express();
const port = 3000;  

app.use(express.json());

// app.get("/", (req: Request, res: Response) => {
//     res.send("Hello World!");
// }); 

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});



app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

