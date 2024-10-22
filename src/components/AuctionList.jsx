import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

function AuctionList() {
	const [auctionItems, setAuctionItems] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAuctionItems = async () => {
			try {
				const res = await axios.get(`${import.meta.env.VITE_API_PATH}/api/auctions`);
				setAuctionItems(res.data);
				setSearchResults(res.data);
				setTotalPages(Math.ceil(res.data.length / ITEMS_PER_PAGE));
			} catch (error) {
				console.error("Error fetching auction items:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchAuctionItems();
	}, []);

	useEffect(() => {
		const filterItems = () => {
			const filteredItems = auctionItems.filter((item) => {
				const title = item.title || "";
				const description = item.description || "";
				const startingBid = item.startingBid ? item.startingBid.toString() : "";
				const endDate = item.endDate ? new Date(item.endDate).toLocaleDateString() : "";

				const searchTermString = searchTerm.toLowerCase();

				return (
					title.toLowerCase().includes(searchTermString) ||
					description.toLowerCase().includes(searchTermString) ||
					startingBid.includes(searchTermString) ||
					endDate.includes(searchTermString)
				);
			});
			setSearchResults(filteredItems);
			setTotalPages(Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 0);
			setCurrentPage(1);
		};
		filterItems();
	}, [searchTerm, auctionItems]);

	const handlePageChange = (page) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const paginatedItems = searchResults.slice(startIndex, endIndex);

	if (loading) {
		return <div className="text-white text-center">Loading auction items...</div>;
	}

	return (
		<div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
			<h2 className="text-4xl font-bold mb-6">Auction Items</h2>
			<div className="mb-6 flex flex-col gap-4">
				<input
					type="text"
					placeholder="Search by Title, Description, Starting Bid, End Date"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="p-3 border border-gray-700 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>
			</div>
			<ul className="space-y-4">
				{paginatedItems.map((item) => (
					<li
						key={item._id}
						className="border border-gray-700 rounded-lg p-4 bg-gray-800 shadow-md"
					>
						<Link
							to={`/auction/${item._id}`}
							className="text-indigo-400 hover:underline text-lg font-semibold"
						>
							{item.title}
						</Link>
						<p className="text-gray-300 mt-2">
							<b>{item.description}</b>
						</p>
						<p className="text-gray-400 mt-2">
							<b>Starting Bid:</b> ${item.startingBid}
						</p>
						<p className="text-gray-400 mt-2">
							<b>End Date: </b>
							{item.endDate ? new Date(item.endDate).toLocaleDateString() : "N/A"}
						</p>
					</li>
				))}
			</ul>
			<div className="mt-6 flex justify-between items-center">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					className={`bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
						currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
					}`}
					disabled={currentPage === 1}
				>
					Previous
				</button>
				<span className="text-gray-400">
					Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
				</span>
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					className={`bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
						totalPages === 0 || currentPage === totalPages
							? "cursor-not-allowed opacity-50"
							: ""
					}`}
					disabled={totalPages === 0 || currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
}

export default AuctionList;
