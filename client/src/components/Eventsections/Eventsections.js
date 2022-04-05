import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Button,Card } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import eventcard from '../../images/eventcard.png'
import './Eventsections.css'

const Eventsections = (props) => {
  return (
    <div className="event_section_container">
          <div className="event_section_inner_heading">
        <h2>{props.title}</h2>
        <DropdownButton variant='secondary' id="dropdown-basic-button" title="Category">
  <Dropdown.Item href="#/action-1">Sport</Dropdown.Item>
  <Dropdown.Item href="#/action-2">Tech</Dropdown.Item>
  <Dropdown.Item href="#/action-3">Webinar</Dropdown.Item>
</DropdownButton>
</div>
        
        <div className='event_card_container'>
            <Card style={{ maxWidth: '20rem',borderRadius:'15px',margin:'1rem'}}>
  <Card.Img variant="top" src={eventcard} />
  <Card.Body>
    <div className='event_card_content'>
    <div>
    <Card.Title>Sep 18</Card.Title>
    </div>
    <div className='left_card_content'>
    <Card.Title><center>Indonesia Conference</center></Card.Title>
    <Card.Text>   
Acropolis Institute of Technology and Research
Indore, Madhya Pradesh.
    </Card.Text>
    </div>
    </div>
    
  </Card.Body>
</Card>
<Card style={{ maxWidth: '20rem',borderRadius:'15px'}}>
  <Card.Img variant="top" src={eventcard} />
  <Card.Body>
    <div className='event_card_content'>
    <div>
    <Card.Title>Sep 18</Card.Title>
    </div>
    <div className='left_card_content'>
    <Card.Title><center>Indonesia Conference</center></Card.Title>
    <Card.Text>   
Acropolis Institute of Technology and Research
Indore, Madhya Pradesh.
    </Card.Text>
    </div>
    </div>
    
  </Card.Body>
</Card>
        </div>
        <Button variant='secondary' className="card_button">View All</Button>
        </div> 
  )
}

export default Eventsections;