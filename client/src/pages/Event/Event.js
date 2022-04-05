import React from 'react'
import Banner from '../../components/Banner/Banner'
import NavbarrAfterLogin from '../../components/Navbar/NavbarrAfterLogin'
import eventBanner from "../../images/eventBanner.png"
import Eventsections from '../../components/Eventsections/Eventsections'
import Footer from '../../components/Footer/Footer'

const Event = () => {
  return (
   <>
   <NavbarrAfterLogin />
   <div className="event_container">
       <div className='event_carousel'>
           <Banner image={eventBanner}/>
        </div>
        <div className='event_inside_sections'>
            <Eventsections title="Upcomming Events"/>
            <Eventsections title="Live Events"/>
            <Eventsections title="Past Events"/>
        </div>
   </div>
   <Footer/>
   </>
  )
}

export default Event