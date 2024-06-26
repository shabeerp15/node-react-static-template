import React from "react";

const PageNotFound = () => {
	return (
		<div className="flex items-center justify-center h-screen bg-green-50">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-red-600">404</h1>
				<p className="text-2xl text-green-800 mb-4">Page Not Found</p>
				<a href="/" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300">
					Go Home
				</a>
			</div>
		</div>
	);
};

export default PageNotFound;
