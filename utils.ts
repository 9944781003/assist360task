import axios from "axios";
import { DistanceMatrixResult, GeocodeResponse } from "./types";
const GoogleMapsApiKey = "AIzaSyC5aPEnI7salGCruJLKR2vKtM_RGJC0ASc"

const hereMapsApiKey = "JX6YlBkJ3tnWC_rV2GqhqsGP5iNQCyMEnH6jRvvw73E";

export const getNavigatorPosition = () => {
  return new Promise<{
    lat: number;
    lng: number;
  }>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};



export async function getAsyncDistance(args: {
  origin: string;
  destination: string;
}) {
  const url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${args.origin}&destination=${args.destination}&return=summary&apiKey=${hereMapsApiKey}`;

  return axios
    .get(url)
    .then((response) => response.data) 
    .catch((error) => {
      console.error("Error fetching distance", error);
    }) as Promise<DistanceMatrixResult>
}

export async function getGeoCodeAddress() {

    const { lat, lng } = await getNavigatorPosition();



  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GoogleMapsApiKey}`;
  return axios
    .get(url)
    .then((response) => response.data) ;
}
export function GetKilometerByLength(length?:number){
  return length ? (length/1000).toFixed(1) :0
}