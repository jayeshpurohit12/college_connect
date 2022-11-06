import React from 'react'
import Eventcarouselimg from '../../images/Eventcarouselimg.jpeg'
import Card from "react-bootstrap/Card";
import {Badge} from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
// import {useAuth} from '../../contexts/AuthContext';

const EventCard = (props) => {
  // const {currentUser} = useAuth();
  {console.log(props)}
  return (   
    <div><Card style={{ width: '18rem',alignItems:"center"}}>
    <Card.Img variant="top" src={props.image} style={{maxHeight:"20rem"}} />
    <Card.Body>
      <Card.Title style={{textAlign:"center"}}>{props.title}</Card.Title>
      <Card.Text style={{padding:"1rem",textAlign:'center',margin:"auto"}}>
       
       <p>
        <span><strong>Date: </strong>{props.startdate && props.startdate.substring(0,10)}</span>
        </p>
        <p>
        <span><strong>Start-Time: </strong>{props.starttime} </span>
        </p>
        <p>
        <span><strong>End-Time: </strong>{props.endtime}</span>
        </p>
       
        {/* <div style={{margin:"1rem 0rem"}}>SHARE: <span><InstagramIcon/> <TwitterIcon/> <FacebookIcon/> <LinkedInIcon/></span></div> */}
      </Card.Text>
      <div></div>
      {/* <Button variant='danger' style={{margin:"auto 4rem"}}>Register</Button> */}
    </Card.Body>
  </Card></div>
  )
}

export default EventCard