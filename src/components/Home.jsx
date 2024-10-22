import PropTypes from "prop-types";

const Home = () => {
	const Logo = () => (
		<div className="flex items-center text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
			<svg
				className="w-16 h-16 mr-4"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<linearGradient
						id="gradient1"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="100%"
					>
						<stop offset="0%" stopColor="#ff8a00" />
						<stop offset="25%" stopColor="#e52e71" />
						<stop offset="50%" stopColor="#9b51e0" />
						<stop offset="75%" stopColor="#4facfe" />
						<stop offset="100%" stopColor="#00f2fe" />
					</linearGradient>
				</defs>
				<path
					d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-1.39-.26-2.67-.77-3.7-1.47l1.3-1.52c.69.55 1.55.93 2.62 1.07v1.92zM7.8 13.68L6.09 12.1a7.9 7.9 0 0 1-.46-1.36l1.76-.66c.13.39.29.76.49 1.12l-1.08 1.48zm10.5-.51c-.15.52-.37 1.03-.67 1.49l-1.68-1.16c.34-.61.52-1.28.52-1.98 0-1.83-1.48-3.31-3.31-3.31-1.04 0-2.05.38-2.83 1.03l-1.68-1.15C10.67 8.34 11.78 7 13 7c2.76 0 5 2.24 5 5 0 .66-.11 1.31-.3 1.92l-1.41-.58zM12 4.27c-1.22 0-2.36.38-3.31 1.03l-1.68-1.15c1.25-.95 2.74-1.53 4.39-1.53 1.94 0 3.7.7 5.09 1.88L14.72 6.4C13.77 5.84 12.9 5.6 12 5.6c-1.43 0-2.83.49-3.93 1.35l1.68 1.15c.68-.5 1.5-.85 2.39-.85 1.11 0 2.08.55 2.79 1.36l-1.68 1.15c-.92-.66-2.02-1.03-3.13-1.03zm1.24 13.67v-1.92c1.07-.14 1.93-.52 2.62-1.07l1.3 1.52c-1.03.71-2.31 1.22-3.7 1.47z"
					fill="url(#gradient1)"
				/>
			</svg>
			BidBud
		</div>
	);

	return (
		<div className="flex flex-col items-center justify-center w-full min-h-screen p-4 overflow-hidden text-white bg-gradient-to-br from-gray-900 to-black">
			<div className="w-full mx-auto max-w-7xl">
				<div className="flex flex-col items-center mb-8">
					<Logo />
					<h1 className="mt-4 text-4xl font-extrabold text-center text-transparent md:text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
						Welcome to Our Online Bidding System
					</h1>
				</div>
				<p className="max-w-4xl mx-auto mb-12 text-lg text-center text-gray-300 md:text-xl">
					Experience the thrill of competitive bidding with our
					cutting-edge platform. Join live auctions, place your bids,
					and win extraordinary items—all from the comfort of your
					home.
				</p>
				<div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
					<FeatureCard
						title="Live Auctions"
						description="Participate in real-time auctions happening now and place your bids instantly."
						gradient="from-teal-400 to-blue-500"
						icon={<LiveIcon />}
					/>
					<FeatureCard
						title="Strategize Bids"
						description="Preview and prepare for auctions to strategize your bidding approach."
						gradient="from-purple-400 to-pink-500"
						icon={<CalendarIcon />}
					/>
					<FeatureCard
						title="Manage Your Auctions"
						description="Effortlessly create, edit, and oversee your auction items with our intuitive tools."
						gradient="from-green-400 to-blue-400"
						icon={<SettingsIcon />}
					/>
				</div>
			</div>
		</div>
	);
};

const FeatureCard = ({ title, description, gradient, icon }) => (
	<div
		className={`p-6 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg text-center transform transition duration-500 hover:scale-105 border border-gray-700`}
	>
		<div className={`text-4xl mb-4 bg-gradient-to-r ${gradient}`}>
			{icon}
		</div>
		<h2 className="mb-3 text-2xl font-semibold">{title}</h2>
		<p className="text-gray-300">{description}</p>
	</div>
);

FeatureCard.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	gradient: PropTypes.string.isRequired,
	icon: PropTypes.element.isRequired,
};

const LiveIcon = () => (
	<svg
		className="w-12 h-12 mx-auto"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
		/>
	</svg>
);

const CalendarIcon = () => (
	<svg
		className="w-12 h-12 mx-auto"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
		/>
	</svg>
);

const SettingsIcon = () => (
	<svg
		className="w-12 h-12 mx-auto"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.993.606 2.277-.165 2.572-1.065z"
		/>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
		/>
	</svg>
);

export default Home;
