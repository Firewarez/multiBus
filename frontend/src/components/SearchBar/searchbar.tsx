import { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import Fuse from 'fuse.js';

interface SearchBarProps {
    data: string[];
    drawerOpen: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ data, drawerOpen }) => {
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState<string[]>([]);

    const fuse = new Fuse(data, { includeScore: true, threshold: 0.4 });

    useEffect(() => {
        if (query === '') {
            setFilteredItems([]);
        } else {
            const results = fuse.search(query);
            setFilteredItems(results.map(result => result.item));
        }
    }, [query]);

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 10,
                left: drawerOpen ? 270 : 100,
                zIndex: 1000,
                width: 300,
                transition: 'left 0.2s ease'
            }}
        >
            <Autocomplete
                freeSolo
                options={filteredItems}
                inputValue={query}
                onInputChange={(event, newInputValue) => {
                    setQuery(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Pesquisar..."
                        variant="outlined"
                        size="small"
                        sx={{
                            bgcolor: 'white',
                            borderRadius: 1,
                            boxShadow: 2
                        }}
                    />
                )}
            />
        </Box>
    );
};

export default SearchBar;