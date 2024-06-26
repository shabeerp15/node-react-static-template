import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex h-screen bg-white">
			<Sidebar />
			<div className="flex-1 flex flex-col overflow-hidden">
				<Navbar />
				<main className="flex-1 overflow-x-hidden overflow-y-auto">
					<div className="container mx-auto px-6 py-8">{children}</div>
				</main>
			</div>
		</div>
	);
};

export default Layout;
