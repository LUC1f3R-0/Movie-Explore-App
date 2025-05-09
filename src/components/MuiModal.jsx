import { alpha, InputBase, styled } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const MuiModal = () => {

    const [searchText, setSearchText] = React.useState('');

    const navigate = useNavigate();

    const handleSearchSubmit = () => {
        if (searchText.trim() !== '') {
            navigate(`/movies/search?q=${encodeURIComponent(searchText.trim())}`);
        }
    };

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
        borderRadius: theme.shape.borderRadius,
        width: '100%',
        padding: theme.spacing(1),
    }));
    return (
        <StyledInputBase
            autoFocus
            placeholder="Type to search..."
            inputProps={{ 'aria-label': 'search' }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearchSubmit();
                }
            }}
        />
    )
}

export default MuiModal
