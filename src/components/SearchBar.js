import React from 'react'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../styles/styles'

const SearchBar = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.search}>
            <form onSubmit={props.handleSubmit}>
            <div className={classes.searchIcon}>
            <SearchIcon />
            </div>
            <InputBase
                placeholder="Enter breed..."
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={props.handleChange}
                value={props.input}
            />
            </form>
        </div>
    )
}

export default SearchBar
