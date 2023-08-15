import React, { useEffect } from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
	const { data, loading, error } = useFetch(
		`/${mediaType}/${id}/recommendations`
	);
	return (
		<>
			{data?.total_results > 0 && (
				<Carousel
					title="Recommendations"
					data={data?.results}
					loading={loading}
					endpoint={mediaType}
				/>
			)}
		</>
	);
};

export default Recommendation;
