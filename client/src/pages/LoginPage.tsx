import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate("/");
		}
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Handle login logic here
		console.log("Login submitted", { email, password });
		localStorage.setItem("token", "token");

		navigate("/");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
			<motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-md w-full space-y-8">
				<div>
					<motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="mt-6 text-center text-3xl font-extrabold text-green-900">
						Sign in to your account
					</motion.h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<input type="hidden" name="remember" value="true" />
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<motion.input
								whileFocus={{ scale: 1.05 }}
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<motion.input
								whileFocus={{ scale: 1.05 }}
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded" />
							<label htmlFor="remember-me" className="ml-2 block text-sm text-green-900">
								Remember me
							</label>
						</div>

						<div className="text-sm">
							<a href="#" className="font-medium text-green-600 hover:text-green-500">
								Forgot your password?
							</a>
						</div>
					</div>

					<div>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
						>
							Sign in
						</motion.button>
					</div>
				</form>
			</motion.div>
		</div>
	);
};

export default LoginPage;
