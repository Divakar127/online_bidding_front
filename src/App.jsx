import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuctionList from "./components/AuctionList";
import AuctionItem from "./components/AuctionItem";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import BidForm from "./components/BidForm";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/index";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import CreateAuctionItem from "./components/CreateAuctionItem";
import EditAuctionItem from "./components/EditAuctionItem";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = () => {
		setIsLoggedIn(true);
	};

	const logout = () => {
		setIsLoggedIn(false);
	};

	const token = document.cookie
		.split("; ")
		.find((row) => row.startsWith("jwt="))
		?.split("=")[1];

	useEffect(() => {
		if (token) {
			login();
		} else {
			logout();
		}
	}, [token]);

	return (
		<AuthProvider value={{ isLoggedIn, login, logout }}>
			<Router>
				<NavBar />
				<div className="container mx-auto">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route
							path="/profile"
							element={<ProtectedRoute component={Profile} />}
						/>
						<Route path="/logout" element={<Logout />} />
						<Route path="/auctions" element={<AuctionList />} />
						<Route
							path="/auction/:id"
							element={<ProtectedRoute component={AuctionItem} />}
						/>
						<Route
							path="/auction/create"
							element={
								<ProtectedRoute component={CreateAuctionItem} />
							}
						/>
						<Route
							path="/auction/edit/:id"
							element={
								<ProtectedRoute component={EditAuctionItem} />
							}
						/>
						<Route
							path="/auction/bid/:id"
							element={<ProtectedRoute component={BidForm} />}
						/>
					</Routes>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
