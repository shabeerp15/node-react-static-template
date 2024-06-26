import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "./ui/input";

// const todos = [
// 	{ id: 1, task: "Complete project proposal", status: "In Progress" },
// 	{ id: 2, task: "Review code changes", status: "Pending" },
// 	{ id: 3, task: "Update documentation", status: "Completed" },
// 	// Add more todos as needed
// ];

const TodoList = () => {
	const [todos, setTodos] = useState<any>([]);
	const [selectedTodo, setSelectedTodo] = useState<any>(null);
	const [filteredTodos, setFilteredTodos] = useState(todos);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value.toLowerCase();
		const filtered = todos.filter((todo: any) => todo.task.toLowerCase().includes(searchTerm) || todo.status.toLowerCase().includes(searchTerm));
		setFilteredTodos(filtered);
	};

	useEffect(() => {
		async function fetchTodos() {
			const response = await fetch("/api/todos");
			if (!response.ok) {
				return;
			}
			const data = await response.json();
			console.log(data);
			setTodos(data);
			setFilteredTodos(data);
		}

		fetchTodos();
	}, []);

	const handleSort = (key: any) => {
		let direction = "ascending";
		if (sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });

		const sorted = [...filteredTodos].sort((a: any, b: any) => {
			if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
			if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
			return 0;
		});
		setFilteredTodos(sorted);
	};

	return (
		<div className="p-4">
			<div className="mb-4">
				<Input type="text" placeholder="Search todos..." onChange={handleSearch} className="w-full" />
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead onClick={() => handleSort("id")}>
							ID <ArrowUpDown className="ml-2 h-4 w-4" />
						</TableHead>
						<TableHead onClick={() => handleSort("task")}>
							Task <ArrowUpDown className="ml-2 h-4 w-4" />
						</TableHead>
						<TableHead onClick={() => handleSort("status")}>
							Status <ArrowUpDown className="ml-2 h-4 w-4" />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredTodos.map((todo: any) => (
						<TableRow key={todo.id} onClick={() => setSelectedTodo(todo)}>
							<TableCell>{todo.id}</TableCell>
							<TableCell>{todo.task}</TableCell>
							<TableCell>{todo.status}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{selectedTodo && (
				<Card className="mt-4">
					<CardHeader>Selected Todo Details</CardHeader>
					<CardContent>
						<img src="/api/placeholder/400/320" alt="Todo details placeholder" className="mb-4" />
						<p>
							<strong>Task:</strong> {selectedTodo.task}
						</p>
						<p>
							<strong>Status:</strong> {selectedTodo.status}
						</p>
						{/* Add more details as needed */}
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default TodoList;
