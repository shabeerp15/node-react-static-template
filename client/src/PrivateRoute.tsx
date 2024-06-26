import React from "react";
import { Navigate, useNavigate, Outlet, Route } from "react-router-dom";
import Layout from "./Layout";

const PrivateRoute = () => {
	// const navigate = useNavigate();

	const isAuthenticated = () => {
		const token = localStorage.getItem("token");
		return !!token;
	};

	return isAuthenticated() ? (
		<Layout>
			<Outlet />
		</Layout>
	) : (
		<Navigate to="/login" />
	);
};

export default PrivateRoute;
