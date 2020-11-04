import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }
}));

const FormRow = ({ imgSrc, title }) => {
    const classes = useStyles();

      return (
        <React.Fragment >
          <Grid item xs={3}>
            <Paper className={classes.paper}>
                <img src={imgSrc} alt={title} width="100%" height="200"/>
            </Paper>
          </Grid>
        </React.Fragment>
      );
  }

const Body = (props) => {
        const classes = useStyles();
        const [dog, setDog] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        
        useEffect(() => { 
                if(!!props.status) {
                    setError(null);
                    setLoading(false);
                    const fetchAPI = () => {
                        const api_url = "https://dog.ceo/api/breed/" + props.breed + "/images";
                        fetch(api_url)
                            .then(res => res.json())
                                .then((data) => {
                                    setLoading(true);
                                    if(data.status === "success") {
                                        setDog([...data.message]);
                                    } else {
                                        setError(data);
                                    }
                                },
                                (error) => {
                                    setLoading(true);
                                    setError(error);
                                });
                    };
    
                     fetchAPI(); 
                }
                
        }, [props.breed, props.status]);
        
       if(error && !!props.status) {
       return <p>{error.message}</p>
       } else if(!loading && !!props.status) {
            return <p>Loading. . .</p>
        }else {
            return (
                <div className={classes.root}>
                    <Grid container spacing={1} >
                    <Grid container item spacing={2}>
                        {props.status && dog.map((src, index) => <FormRow imgSrc={src} title={props.breed} key={index} />)}
                    </Grid>
                    </Grid>
                </div>
            );
        }
    }

export default Body;