import React from "react";
import worldMap from '../../assets/images/other/world-map.svg';
import WorldMap from "./WorldMap";



const Location = ({data}) => {
  
  // const countryName = "Finland";
  // const finland = document.getElementsByName("Finland");
  // console.log(finland);

  //finland.setAttribute("fill", '#FEB449');

  return (
    <WorldMap countryData={data}/>
  );
};

export default Location;
