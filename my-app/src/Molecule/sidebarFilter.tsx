import React from 'react';
import {flex, hstack} from '../../styled-system/patterns';
import {css} from '../../styled-system/css';
import {input} from "../../styled-system/recipes";

interface SidebarFilterProps {
    authors: string[];
    types: string[];
    publishers: string[];
    filters: {
        type: string;
        author: string;
        ratingMin: number;
        ratingMax: number;
        publisher: string;
    };
    onFilterChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({
                                                         authors,
                                                         types,
                                                         publishers,
                                                         filters,
                                                         onFilterChange,
                                                         onCheckboxChange,
                                                     }) => {
    return (
        <div className={css({width: '20%', padding: '1rem', bgColor: 'white', height: "100vh", position: 'sticky'})}>
            <h3 className={css({fontWeight: "bold", fontSize: 'large'})}>Filters</h3>

            <h4 className={css({fontWeight: "bold"})}>Type</h4>

            <div className={flex({gap: '0.5rem', direction: 'column'})}>
                {types.map((type, index) => (
                    <label key={index} className={hstack({gap: "0.5rem"})}>
                        <input
                            type="checkbox"
                            className={input({variant: "checkbox"})}
                            name="type"
                            value={type}
                            checked={filters.type === type}
                            onChange={onCheckboxChange}
                        />
                        {type}
                    </label>
                ))}
            </div>
            <h4 className={css({fontWeight: "bold"})}>Author</h4>

            <div className={flex({gap: '0.5rem', direction: 'column'})}>
                {authors.map((author, index) => (
                    <label key={index} className={hstack({gap: "0.5rem"})}>
                        <input
                            type="checkbox"
                            className={input({variant: "checkbox"})}
                            name="author"
                            value={author}
                            checked={filters.author === author}
                            onChange={onCheckboxChange}
                        />
                        {author}
                    </label>
                ))}
            </div>
            <h4 className={css({fontWeight: "bold"})}>Publisher</h4>
            <div className={flex({gap: '0.5rem', direction: 'column'})}>
                {publishers.map((publisher, index) => (
                    <label key={index} className={hstack({gap: "0.5rem"})}>
                        <input
                            type="checkbox"
                            name="publisher"
                            className={input({variant: "checkbox"})}
                            value={publisher}
                            checked={filters.publisher === publisher}
                            onChange={onCheckboxChange}
                        />
                        {publisher}
                    </label>
                ))}
            </div>
            <h4 className={css({fontWeight: "bold"})}>Rating Range</h4>
            <label>
                Min Rating: {filters.ratingMin}
                <input
                    type="range"
                    name="ratingMin"
                    min="0"
                    max="5"
                    value={filters.ratingMin}
                    onChange={onFilterChange}
                />
            </label>
            <label>
                Max Rating: {filters.ratingMax}
                <input
                    type="range"
                    name="ratingMax"
                    min="0"
                    max="5"
                    value={filters.ratingMax}
                    onChange={onFilterChange}
                />
            </label>
        </div>
    );
};

export default SidebarFilter;
