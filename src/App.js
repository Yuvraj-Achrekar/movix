import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResults from "./pages/searchResults/SearchResults";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
	const dispatch = useDispatch();
	const { url } = useSelector((state) => state.home);

	useEffect(() => {
		fetchApiConfig();
		genreCall();
	}, []);

	const fetchApiConfig = () => {
		fetchDataFromApi("/configuration").then((res) => {
			const url = {
				backdrop: res.images.secure_base_url + "original",
				profile: res.images.secure_base_url + "original",
				poster: res.images.secure_base_url + "original",
			};
			dispatch(getApiConfiguration(url));
		});
	};

	async function genreCall() {
		let promise = [];
		let endpoints = ["tv", "movie"];
		let allGenre = {};

		endpoints.forEach((url) => {
			promise.push(fetchDataFromApi(`/genre/${url}/list`));
		});

		const data = await Promise.all(promise);

		data.map(({ genres }) => {
			return genres.map((item) => {
				allGenre[item.id] = item;
			});
		});

		dispatch(getGenres(allGenre));
	}

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/:mediaType/:id" element={<Details />} />
				<Route path="/search/:query" element={<SearchResults />} />
				<Route path="/explore/:mediaType" element={<Explore />} />
				// Whenever it goes to any other route then page-not-found will dhow up
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
