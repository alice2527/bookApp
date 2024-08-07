import React, {ChangeEvent} from 'react';
import {input} from '../../styled-system/recipes';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        onSearch(searchTerm);
    };

    return (
        <input
            className={input({variant: 'search'})}
            type="search"
            placeholder="Search..."
            autoFocus
            required
            onChange={handleInputChange}
        />
    );
};

export default SearchBar;
