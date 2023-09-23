import {useParams} from "react-router-dom";

const SearchPage = () => {
    const { query } = useParams();

    return <h1>Search page {query}</h1>
}

export default SearchPage;
