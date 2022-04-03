import React from 'react'
import "./Filter.css";

const Filter = (props) => {
  return (
    <>
    <div className="filter_container">
        <div className="filter_heading_container">
            <h1 className="filter_heading">{props.heading}</h1>
        </div>
    </div>
    </>
  )
}

export default Filter