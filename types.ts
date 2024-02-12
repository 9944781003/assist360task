export type Coordinates = {
    lat: number;
    lng: number;
  };
export type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};


type Bounds = {
  northeast: Coordinates;
  southwest: {
    lat: number;
    lng: number;
  };
};

type Geometry = {
  bounds: Bounds;
  location: Coordinates;
  location_type: string;
  viewport: Bounds;
};

export type Result = {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
  "html_attributions": []
};

export type GeocodeResponse = {
    "plus_code": {
        "compound_code": string,
        "global_code": string
      },
  results: Result[];
  status: string;
};



export type GoogleAutoCompletePlaceChangeResponse = {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: {
        location:Coordinates;
    };
    place_id: string;
    html_attributions: any[];
};





export type GoogleAutoCompleteRespose = {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: {
        location: {
            lat: () => string;
            lng: () => string;
        };
    };
    place_id: string;
    html_attributions: any[];
};

export type DistanceMatrixResult = {
    routes: {
        id: string;
        sections: {
            id: string;
            type: string;
            departure: {
                time: string;
                place: {
                    type: string;
                    location: {
                        lat: number;
                        lng: number;
                    };
                    originalLocation: {
                        lat: number;
                        lng: number;
                    };
                };
            };
            arrival: {
                time: string;
                place: {
                    type: string;
                    location: {
                        lat: number;
                        lng: number;
                    };
                    originalLocation: {
                        lat: number;
                        lng: number;
                    };
                };
            };
            summary: {
                duration: number;
                length: number;
                baseDuration: number;
            };
            transport: {
                mode: string;
            };
        }[];
    }[];
};
