import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { Pin, Plus, X } from "lucide-react";

interface StickyNoteProps {
	note: any;
	onPin: any;
	onDelete: any;
	bounds: any;
}

const StickyNote = ({ note, onPin, onDelete, bounds }: StickyNoteProps) => {
	return (
		<Draggable bounds={bounds} defaultPosition={{ x: note.position.x, y: note.position.y }} disabled={note.isPinned}>
			<div className={`absolute w-64 bg-gradient-to-br from-green-50 to-white shadow-md rounded-lg p-4 ${note.isPinned ? "z-50" : "hover:shadow-xl"} transition-all duration-200 ease-in-out`}>
				<button
					onClick={() => onPin(note.id)}
					className={`absolute top-2 right-8 p-1 rounded-full ${note.isPinned ? "bg-green-500 text-white" : "bg-white text-green-500"} hover:bg-green-600 hover:text-white transition duration-200 ease-in-out`}
				>
					<Pin size={14} />
				</button>
				<button onClick={() => onDelete(note.id)} className="absolute top-2 right-2 p-1 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white transition duration-200 ease-in-out">
					<X size={14} />
				</button>
				<p className="text-green-800 mt-3">{note.text}</p>
			</div>
		</Draggable>
	);
};

const StickyNotes = () => {
	const [notes, setNotes] = useState<any>([]);
	const [newNoteText, setNewNoteText] = useState<string>("");
	const containerRef = useRef(null);

	const createNote = () => {
		if (newNoteText.trim() === "") return;
		const newNote = {
			id: Date.now(),
			text: newNoteText,
			position: { x: Math.random() * 100, y: Math.random() * 100 },
			isPinned: false,
		};
		setNotes([...notes, newNote]);
		setNewNoteText("");
		localStorage.setItem("notes", JSON.stringify([...notes, newNote]));
	};

	const togglePin = (id: number) => {
		setNotes(notes.map((note: any) => (note.id === id ? { ...note, isPinned: !note.isPinned } : note)));
		localStorage.setItem("notes", JSON.stringify(notes.map((note: any) => (note.id === id ? { ...note, isPinned: !note.isPinned } : note))));
	};

	const deleteNote = (id: number) => {
		setNotes(notes.filter((note: any) => note.id !== id));
		localStorage.setItem("notes", JSON.stringify(notes.filter((note: any) => note.id !== id)));
	};

	useEffect(() => {
		const savedNotes = localStorage.getItem("notes");
		if (savedNotes) {
			setNotes(JSON.parse(savedNotes));
		}
	}, []);

	return (
		<div className="p-4 min-h-screen">
			<div className="mb-4 flex">
				<input
					type="text"
					value={newNoteText}
					onChange={(e) => setNewNoteText(e.target.value)}
					className="flex-grow border border-green-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
					placeholder="Enter note text"
				/>
				<button onClick={createNote} className="bg-green-500 text-white px-6 py-2 rounded-r hover:bg-green-600 transition duration-200 ease-in-out flex items-center">
					<Plus size={20} className="mr-2" /> Add Note
				</button>
			</div>
			<div ref={containerRef} className="relative w-full h-[calc(100vh-100px)] border border-green-200 rounded-lg bg-white shadow-inner overflow-hidden">
				{notes.map((note: any) => (
					<StickyNote key={note.id} note={note} onPin={togglePin} onDelete={deleteNote} bounds="parent" />
				))}
			</div>
		</div>
	);
};

export default StickyNotes;
