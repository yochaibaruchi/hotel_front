import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { useRef } from "react";
import mapStyle from "../app/mapStyle";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/esm/Card";
type mapProps = {
  lat: number;
  lng: number;
  hotelName: string;
  flag: boolean;
};
function Map(props: mapProps): JSX.Element {
  const { isLoaded } = useJsApiLoader({
    id: " google-map_id",
    googleMapsApiKey: "AIzaSyB57K30x-5CU9KKGoiaqoXOopmDMT4FpuI",
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map): void => {
    mapRef.current = map;
  };
  const unMount = (): void => {
    mapRef.current = null;
  };

  const containerStyle = {
    width: "24rem",
    height: "26vh",
  };
  const containerStyleHover = {
    width: "24rem",
    height: "26vh",
  };

  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,
  };
  if (!isLoaded) {
    return <Spinner animation="grow" variant="primary" />;
  } else {
    return (
      <Card>
        <GoogleMap
          mapContainerStyle={props.flag ? containerStyleHover : containerStyle}
          options={options as google.maps.MapOptions}
          center={new google.maps.LatLng(props.lat, props.lng)}
          zoom={15}
          onLoad={onLoad}
          onUnmount={unMount}
        >
          <MarkerF
            title={props.hotelName}
            position={new google.maps.LatLng(props.lat, props.lng)}
          />
        </GoogleMap>
      </Card>
    );
  }
}

export default Map;
