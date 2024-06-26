import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="shadow-md">
			<div className="mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					<div className="flex-shrink-0 flex items-center ml-20">
						<span className="font-bold text-xl text-gray-800">Logo</span>
					</div>
					<div className="relative ml-auto" ref={dropdownRef}>
						<div>
							<motion.button
								className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
								onClick={() => setIsOpen(!isOpen)}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
							>
								<User className="h-8 w-8 rounded-full bg-gray-200 p-1" />
							</motion.button>
						</div>
						<AnimatePresence>
							{isOpen && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
								>
									<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										Your Profile
									</a>
									<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										Settings
									</a>
									<button onClick={handleLogout} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
										<LogOut className="h-4 w-4 mr-2" />
										Logout
									</button>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
