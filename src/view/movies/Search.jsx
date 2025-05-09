import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    return (
        <div>
            <h2>Search results for: {query}</h2>
            {/* Render results here */}
        </div>
    );
};

export default Search;
