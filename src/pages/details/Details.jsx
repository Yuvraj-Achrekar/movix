import React from "react";
import "./style.scss";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner.jsx/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideoSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";

const Details = () => {
	const { mediaType, id } = useParams();
	const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
	const { data: credits, loading: creditsLoading } = useFetch(
		`/${mediaType}/${id}/credits`
	);

	return (
		<div>
			<DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
			{credits?.cast.length > 0 && (
				<Cast data={credits?.cast} loading={credits?.loading} />
			)}
			{data?.results.length > 0 && (
				<VideosSection data={data} loading={loading} />
			)}
			<Similar mediaType={mediaType} id={id} />
			<Recommendation mediaType={mediaType} id={id} />
		</div>
	);
};

export default Details;
