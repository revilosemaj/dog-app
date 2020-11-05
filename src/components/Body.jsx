import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "200px",
        width: "100%",
      }
}));

const FormRow = ({ imgSrc, title }) => {
    const classes = useStyles();
    const [isLoaded, setLoaded] = useState(false);
    
    
      return (
        <React.Fragment >
          <Grid item xs={3} className={"shadow-drop-2-center"} >
            <Paper className={classes.paper} >
                {!isLoaded && <CircularProgress style={{marginTop: "50px"}} disableShrink />}
                <img 
                    src={imgSrc} 
                    alt={title} 
                    width="100%" 
                    height="100%" 
                    style={!isLoaded ? { display: "none" } : { display: "block" }} 
                    onLoad={() => setLoaded(true)}/>
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
        const breed = _.kebabCase(props.breed);
        
        useEffect(() => { 
                if(!!props.status) {
                    setError(null);
                    setLoading(false);
                    setDog([]);
                    const fetchAPI = () => {
                        const api_url = "https://dog.ceo/api/breed/" + breed + "/images";
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
                
        }, [breed, props.status]);
        
       if(error && !!props.status) {
            return (
                <Container maxWidth={false} style={{ textAlign: "center", marginTop: "50px"}}>
                    <p>{error.message}</p>
                </Container>
            );
       } else if(!loading && !!props.status) {
            return (
                        <Container maxWidth={false} style={{ textAlign: "center", marginTop: "50px"}}>
                            <p>Please wait while fetching . . . </p>
                        </Container>
            );
        }else {
            return (
                <div className={classes.root}>
                    <Grid container spacing={1} >
                    <Grid container item spacing={2}>
                        {props.status && dog.map((src, index) => <FormRow imgSrc={src} title={breed} key={index}/>)}
                    </Grid>
                    </Grid>
                </div>
            );
        }
    }

export default Body;