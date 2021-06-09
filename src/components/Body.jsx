import React, { useReducer, useEffect } from "react";
import { Grid, Container } from '@material-ui/core';
import _ from "lodash";
import useStyles from '../styles/styles'
import ImageContainer from './ImageContainer';

const initialState = {
    isLoading : false,
    dog : [],
    error : ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_REQUEST' :
            return {
                ...state,
                isLoading : true,
            }
        case 'FETCH_SUCCESS' :
            return {
                isLoading : false,
                dog : action.payload,
                error : ''
            }
        case 'FETCH_ERROR' :
            return {
                isLoading : false,
                dog : [],
                error : 'Breed not found!'
            }
        default :
            return state
    }
}

const Body = ({ breed, status }) => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState)
    const dogBreed = _.kebabCase(breed);
    
    useEffect(() => { 
            if(status) {
                dispatch({ type : 'FETCH_REQUEST'})
                fetch(`https://dog.ceo/api/breed/${dogBreed}/images`)
                    .then(res => res.json())
                    .then((data) => {
                        if(data.status === "success") {
                            dispatch({ type : 'FETCH_SUCCESS', payload : data.message })
                        } else {
                            dispatch({ type : 'FETCH_ERROR'})
                        }
                    },
                    (e) => dispatch({ type : 'FETCH_ERROR'}));
            }
    }, [dogBreed, status]);
       
    const { isLoading, dog, error } = state;

    return (
        <div>
        {
            error ? (
                <Container maxWidth={false} style={{ textAlign: "center", marginTop: "50px"}}>
                    <p>{error}</p>
                </Container>
            ) : isLoading ? (
            <Container maxWidth={false} style={{ textAlign: "center", marginTop: "50px"}}>
                <p>Please wait while fetching . . . </p>
            </Container>
            ) : (<div className={classes.root}>
                    <Grid container spacing={1} >
                    <Grid container item spacing={2}>
                        {status && dog.map((src, index) => <ImageContainer imgSrc={src} title={dogBreed} key={index}/>)}
                    </Grid>
                    </Grid>
                </div>
            ) 
        }
        </div>
    )        
} 

export default Body;