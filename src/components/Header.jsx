import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useScrollTrigger,
  Box,
  Container,
  Slide
} from '@material-ui/core';
import PetsIcon  from '@material-ui/icons/Pets';
import Body from "./Body";

import SearchBar from './SearchBar';

const HideOnScroll = ({ children, window }) => {
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide 
      appear={false} 
      direction="down" 
      in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Header = (props) => {
  const [input, setInput] = useState("");
  const [breed, setBreed] = useState(false);
  const [status, setStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBreed(input);
    setStatus(true);
  }

  const handleChange = (e) =>{
    setInput(e.target.value)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar color="default">
          <Toolbar>
            <Typography variant="h6"><PetsIcon /> Dog Search</Typography>
            <SearchBar 
              handleSubmit={handleSubmit} 
              input={input} 
              handleChange={handleChange}
            />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      {<Container maxWidth={false}>
        <Box my={2}>
          <Body breed={breed} status={status}/>
        </Box>
      </Container>}
    </React.Fragment>
  );
}

export default Header;
