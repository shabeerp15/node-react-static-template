import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, Users, Settings, HelpCircle, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const menuItems = [
		{ icon: Home, name: "Home", path: "/" },
		{ icon: Users, name: "Notes", path: "/notes" },
		{ icon: Settings, name: "Settings", path: "/settings" },
		{ icon: HelpCircle, name: "Help", path: "/help" },
	];

	const sidebarVariants = {
		open: { x: 0 },
		closed: { x: "-100%" },
	};

	const listItemVariants = {
		open: { opacity: 1, x: 0 },
		closed: { opacity: 0, x: -20 },
	};

	return (
		<>
			<button onClick={() => setIsOpen(!isOpen)} className="fixed top-4 left-4 z-50 p-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300">
				{isOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			<motion.div
				initial="closed"
				animate={isOpen ? "open" : "closed"}
				variants={sidebarVariants}
				transition={{ duration: 0.3, type: "tween" }}
				className="fixed top-0 left-0 h-full w-64 bg-white bg-opacity-20 backdrop-blur-lg shadow-lg z-40"
			>
				<div className="p-4 h-full flex flex-col">
					<h2 className="text-2xl font-bold text-green-700 mb-8 mt-1 m-auto">My App</h2>
					<nav className="flex-grow">
						<ul className="space-y-2">
							{menuItems.map((item, index) => (
								<motion.li key={item.name} variants={listItemVariants} transition={{ delay: index * 0.1 }}>
									<Link to={`${item.path}`} className="flex items-center p-2 rounded-lg text-green-700 hover:bg-green-100 transition-colors duration-300 group">
										<item.icon className="w-6 h-6 mr-3 text-green-500 group-hover:text-green-700 transition-colors duration-300" />
										<span className="font-medium">{item.name}</span>
									</Link>
								</motion.li>
							))}
						</ul>
					</nav>
					<div className="mt-auto">
						<p className="text-sm text-green-600">© 2024 My App</p>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default Sidebar;
