/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { IoLocationOutline } from "react-icons/io5";
import AutoComplete from "react-google-autocomplete";
import {
  GetKilometerByLength,
  getAsyncDistance,
  getGeoCodeAddress,
} from "@/utils";
import {  DistanceMatrixResult, GeocodeResponse, GoogleAutoCompleteRespose, Result } from "@/types";
import { RiMotorbikeFill } from "react-icons/ri";
export default function distance() {
  const [location, setLocation] = useState<GeocodeResponse>();

  const [origin, setOrigin] = useState<GoogleAutoCompleteRespose>();
  const [destination, setDestination] = useState<GoogleAutoCompleteRespose>();
  const [matrixResult,setMatrixResult]=useState<DistanceMatrixResult>()


  useEffect(() => {
    const asyncFetch = async () => {
      if ("geolocation" in navigator) {
       
        const results = await getGeoCodeAddress();
        setLocation(results);
      } else {
        console.log("Geolocation is not available in your browser.");
      }
    };
    asyncFetch();
  }, []);

 const getDistance= useCallback(()=>{
    if(!(origin?.geometry.location.lat() || location?.results?.[0].geometry?.location?.lat && origin?.geometry.location.lng() || location?.results?.[0].geometry?.location?.lng && destination?.geometry.location.lat() && destination?.geometry.location.lng() )){
      return;
    }
    getAsyncDistance({
      origin:`${origin?.geometry.location.lat() || location?.results?.[0].geometry?.location?.lat },${origin?.geometry.location.lng() || location?.results?.[0].geometry?.location?.lng }`,
      destination: `${destination?.geometry.location.lat() },${destination?.geometry.location.lng() }`,
    })
      .then(setMatrixResult)
      .catch((err) => {
        console.log(err);
      });
  },[destination?.geometry.location, location?.results, origin?.geometry.location])

  useEffect(()=>{
    getDistance()
  },[getDistance])
  return (
    <Container>


   
      <Row className="vh-100 d-flex align-items-center justify-content-center">
        <Col xs={12} sm={4}>
          <div className="vw-50 h-50 ">
            <div className="fw-bold text-center"><RiMotorbikeFill size={64}/>Calculate distance</div>
            <div className="d-flex align-items-center justify-content-center mt-4 ">
              <IoLocationOutline size={32} />
              <AutoComplete
                options={{
                  types: ["(cities)"],
                }}
                defaultValue={location?.results?.[0]?.formatted_address}
                // defaultChecked={true}
                className="w-100 rounded-1 py-1"
                apiKey={"AIzaSyC5aPEnI7salGCruJLKR2vKtM_RGJC0ASc"}
                inputStyle={{ width: "100%" }}
                aria-placeholder="Enter your location"
                onPlaceSelected={setOrigin}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <IoLocationOutline size={32} />
              <AutoComplete
                className="w-100 rounded-1 py-1"
                apiKey={"AIzaSyC5aPEnI7salGCruJLKR2vKtM_RGJC0ASc"}
                onPlaceSelected={destination=>setDestination(destination)}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between mt-4">
              <div>
                
   
                Mileage to claim <br />
                <span className="fw-bold fs-3"> {GetKilometerByLength(matrixResult?.routes?.[0]?.sections?.[0]?.summary?.length)} Km</span>
              </div>
              <div>
                <div
                  onClick={() => {
                    alert("Thanks")  
                  }}
                  className="btn btn-primary"
                >
                  Use this distance
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
