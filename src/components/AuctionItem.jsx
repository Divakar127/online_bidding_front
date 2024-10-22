import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./AuctionItem.css";

const ITEMS_PER_PAGE = 10;

function AuctionItem() {
    const { id } = useParams();
    const [auctionItem, setAuctionItem] = useState(null);
    const [user, setUser] = useState(null);
    const [bids, setBids] = useState([]);
    const [winner, setWinner] = useState("");
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loadingBids, setLoadingBids] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuctionItem = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/auctions/${id}`);
                setAuctionItem(res.data);
            } catch (error) {
                console.error("Error fetching auction item:", error);
            }
        };

        const fetchUser = async () => {
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("jwt="))
                ?.split("=")[1];
            if (token) {
                try {
                    const res = await axios.post(
                        `${import.meta.env.VITE_API_URL}/users/profile`,
                        {},
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    setUser(res.data);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            }
        };

        const fetchWinner = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/auctions/winner/${id}`);
                setWinner(res.data.winner);
            } catch (error) {
                if (error.response.data.winner !== "") {
                    console.error("Error fetching auction winner:", error);
                }
            }
        };

        fetchAuctionItem();
        fetchUser();
        fetchWinner();
    }, [id]);

    useEffect(() => {
        const fetchBids = async () => {
            setLoadingBids(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/bids/${id}`);
                const sortedBids = res.data.sort(
                    (a, b) => b.bidAmount - a.bidAmount
                );
                setBids(sortedBids);
                setTotalPages(
                    Math.ceil(sortedBids.length / ITEMS_PER_PAGE) || 0
                );
            } catch (error) {
                console.error("Error fetching bids:", error);
            } finally {
                setLoadingBids(false);
            }
        };

        fetchBids();
    }, [id]);

    useEffect(() => {
        const updateCountdown = () => {
            if (auctionItem) {
                const endDate = new Date(auctionItem.endDate);
                const now = new Date();
                const timeDiff = endDate - now;

                if (timeDiff > 0) {
                    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor(
                        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    );
                    const minutes = Math.floor(
                        (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
                    );
                    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                    setCountdown({ days, hours, minutes, seconds });
                } else {
                    setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                }
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [auctionItem]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/auctions/${id}`);
            navigate("/auctions");
        } catch (error) {
            console.error("Error deleting auction item:", error);
        }
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedBids = bids.slice(startIndex, endIndex);

    if (!auctionItem) {
        return <p className="mt-10 text-center text-white">Auction item not found.</p>;
    }

    if (!user) {
        return <p className="mt-10 text-center text-white">Loading user profile...</p>;
    }

    const highestBid =
        bids.length > 0 ? Math.max(...bids.map((bid) => bid.bidAmount)) : 0;
    const isAuctionEnded =
        countdown.days <= 0 &&
        countdown.hours <= 0 &&
        countdown.minutes <= 0 &&
        countdown.seconds <= 0;

    return (
        <div className="max-w-4xl p-8 mx-auto mt-10 text-white bg-gray-900 rounded-lg shadow-lg">
            <h2 className="mb-4 text-4xl font-bold">{auctionItem.title}</h2>
            <p className="mb-4 text-lg">{auctionItem.description}</p>
            <p className="mb-4 text-lg">
                Starting Bid:{" "}
                <span className="font-semibold">
                    ${auctionItem.startingBid}
                </span>
            </p>
            <p className="mb-4 text-lg">
                Current Highest Bid:{" "}
                <span className="font-semibold">${highestBid}</span>
            </p>
            <div
                className={`text-center mb-4 p-6 rounded-lg shadow-lg ${
                    isAuctionEnded ? "bg-red-600" : "bg-green-600"
                }`}
            >
                <h3 className="mb-2 text-3xl font-bold">
                    {isAuctionEnded ? "Auction Ended" : "Time Remaining"}
                </h3>
                <div className="countdown-grid">
                    {Object.entries(countdown).map(([unit, value]) => (
                        <div key={unit} className="countdown-card">
                            <div className="countdown-front">
                                {value < 10 ? `0${value}` : value}
                            </div>
                            <div className="countdown-back">
                                {unit.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    ))}
                </div>
                {isAuctionEnded && winner && (
                    <div className="p-4 mt-6 font-bold text-center text-black bg-yellow-500 rounded-lg">
                        <h3 className="text-2xl">
                            Congratulations {winner.username}!
                        </h3>
                        <p>You have won the auction!</p>
                    </div>
                )}
            </div>

            {user.role === "admin" && (
                <div className="flex justify-between mb-4">
                    <Link
                        to={`/edit-auction/${auctionItem._id}`}
                        className="text-blue-500 hover:underline"
                    >
                        Edit Auction
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="text-red-500 hover:underline"
                    >
                        Delete Auction
                    </button>
                </div>
            )}

            <h3 className="mb-4 text-2xl font-bold">Bids</h3>
            {loadingBids ? (
                <p className="text-center">Loading bids...</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {paginatedBids.length > 0 ? (
                            paginatedBids.map((bid) => (
                                <li
                                    key={bid._id}
                                    className="p-4 bg-gray-800 rounded-lg shadow-lg"
                                >
                                    <p>
                                        <strong>{bid.username}</strong> bid: $
                                        {bid.bidAmount}
                                    </p>
                                    <p>Time: {new Date(bid.createdAt).toLocaleString()}</p>
                                </li>
                            ))
                        ) : (
                            <p>No bids placed yet.</p>
                        )}
                    </ul>

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="text-blue-500 hover:underline"
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="text-blue-500 hover:underline"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default AuctionItem;
