import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import httpService from "../app/httpService";
import HotelCard from "./HotelCard";
import Stack from "react-bootstrap/Stack";
import CarouselComponent from "./CarouselComponent";

function HotelsPageComponent() {
  type hotel = {
    beds_left: number;
    hotel_address: string;
    hotel_id: number;
    hotel_location_Latitude: GLfloat;
    hotel_location_Longitude: GLfloat;
    hotel_name: string;
    hotel_pic_path: string;
    hotel_rating: GLfloat;
    rooms_left: number;
  };

  const [hotels, setHotels] = useState<hotel[]>();
  const numberOfGuests = useAppSelector((state) => state.order.numberOfPeople);
  const startDate = useAppSelector((state) => state.order.start_date);
  const endDate = useAppSelector((state) => state.order.end_date);

  useEffect(() => {
    const gethotels = async () => {
      const http = new httpService();
      const result = await http.getHotels(startDate, endDate, numberOfGuests);
      setHotels(result);
    };
    gethotels();
  }, [numberOfGuests, startDate, endDate]);

  return (
    <div style={{ backgroundColor: "WindowFrame" }}>
      <Stack direction="vertical" gap={2} style={{ alignItems: "baseline" }}>
        <div className="container">
          {hotels?.map<JSX.Element>((hotel) => {
            return (
              <Stack key={hotel.hotel_id} direction="horizontal" gap={2}>
                <HotelCard
                  beds_left={hotel.beds_left}
                  hotel_address={hotel.hotel_address}
                  hotel_id={hotel.hotel_id}
                  hotel_location_Latitude={hotel.hotel_location_Latitude}
                  hotel_location_Longitude={hotel.hotel_location_Longitude}
                  hotel_name={hotel.hotel_name}
                  hotel_pic_path={hotel.hotel_pic_path}
                  hotel_rating={hotel.hotel_rating}
                  rooms_left={hotel.rooms_left}
                />
              </Stack>
            );
          })}
        </div>

        <CarouselComponent />
      </Stack>
    </div>
  );
}

export default HotelsPageComponent;
