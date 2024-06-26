import express, { type Request, type Response } from "express";
import path from "path";

const app = express();
const router = express.Router();
const port = 3000;

app.use(express.json());

app.use("/api", router);

router.get("/test", (req: Request, res: Response) => {
	res.send("Hello World!");
});

router.get("/todos", (req: Request, res: Response) => {
	try {
		const todos = [
			{ id: 1, task: "MERN Stack Crash Course", status: "In Progress" },
			{ id: 2, task: "Typescript Crash Course", status: "Pending" },
			{ id: 3, task: "React Crash Course", status: "Completed" },
			{ id: 4, task: "Intro to GraphQL", status: "In Progress" },
			{ id: 5, task: "Advanced GraphQL", status: "In Progress" },
		];

		res.json(todos);
	} catch (error) {
		console.log(error);
	}
});

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});



app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

