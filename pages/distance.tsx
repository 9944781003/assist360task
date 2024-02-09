import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IoLocationOutline } from "react-icons/io5";
import AutoComplete from "react-google-autocomplete";
export default function distance() {
  return (
    <Container>
      <Row className="vh-100 d-flex align-items-center justify-content-center">
        <Col xs={12} sm={4}>
          <div className="vw-50 h-50 ">
            <div className="fw-bold text-center">Calculate distance</div>
            <div className="d-flex align-items-center justify-content-center mt-4 ">
              <IoLocationOutline size={32} />
              <AutoComplete
                className="w-100 rounded-1 py-1"
                apiKey={""}
                inputStyle={{ width: "100%" }}
                aria-placeholder="Enter your location"
                onPlaceSelected={(place) => console.log(place)}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <IoLocationOutline size={32} />
              <AutoComplete
                className="w-100 rounded-1 py-1"
                apiKey={""}
                onPlaceSelected={(place) => console.log(place)}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between mt-4">
              <div>
                Mileage to claim <br />
                <span className="fw-bold fs-3"> 13.5 Km</span>
              </div>
              <div>
                <div className="btn btn-primary">Use this distance</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
