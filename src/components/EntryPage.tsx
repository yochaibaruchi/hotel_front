import { Button, Card } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { insertDateAndNumber } from "../features/order/order-slice";
import { useNavigate } from "react-router-dom";
function EntryPage() {
  const [number, setNumber] = useState(2);
  const dispatch = useAppDispatch();
  const [start, setStart] = useState<string>();
  const [end, setEnd] = useState<string>();
  const navigate = useNavigate();
  useEffect(() => {
    const startDate = new Date();
    setStart(startDate.toISOString().slice(0, 10));
    const twoDaysAfter = startDate.setDate(startDate.getDate() + 2);
    setEnd(new Date(twoDaysAfter).toISOString().slice(0, 10));
  }, []);
  type hotelsSearch = {
    start_date: Date;
    end_date: Date;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<hotelsSearch>();

  const onSubmit = async (data: hotelsSearch) => {
    dispatch(
      insertDateAndNumber({
        startDate: data.start_date,
        endDate: data.end_date,
        numberOfGuests: number,
      })
    );
    navigate("/hotel");
  };

  return (
    <Card className="bg-dark text-white">
      <Card.Img
        src="https://www.itraveljerusalem.com/wp-content/uploads/2016/07/plh-crd-jaffa-street-light-train-night-ministry-of-tourism-2.jpg"
        alt="Card image"
        width="300px"
        height="600px"
      />
      <Card.ImgOverlay>
        <Card.Title style={{ textAlign: "center" }}>
          find your next stay
        </Card.Title>
        <Card.Text style={{ textAlign: "center" }}>
          just an easier way to book your next vacation...
        </Card.Text>
        <form style={{ marginLeft: "30%" }} onSubmit={handleSubmit(onSubmit)}>
          <Stack style={{ textAlign: "center" }} direction="horizontal" gap={5}>
            <div>
              <label>from</label> <br />
              <input
                type={"date"}
                className="input"
                defaultValue={start}
                {...register("start_date", {
                  required: true,
                })}
              />
              {errors?.start_date?.type === "required" && (
                <span className="p">This field is required</span>
              )}{" "}
            </div>
            <div>
              <label>to</label> <br />
              <input
                defaultValue={end}
                type={"date"}
                className="input"
                {...register("end_date", {
                  required: true,
                })}
              />
              {errors?.end_date?.type === "required" && (
                <span className="p">This field is required</span>
              )}{" "}
            </div>
            <div style={{ textAlign: "center" }}>
              <label>people</label>
              <Stack direction="horizontal" gap={2}>
                <Button
                  disabled={number <= 2}
                  onClick={() =>
                    setNumber((correntNumber) => {
                      return correntNumber - 1;
                    })
                  }
                  variant="dark"
                >
                  -
                </Button>
                {number}
                <Button
                  onClick={() => {
                    setNumber((correntNumber) => correntNumber + 1);
                  }}
                  variant="dark"
                >
                  +
                </Button>
              </Stack>
            </div>
            <input type={"submit"} />
          </Stack>
        </form>
        <p style={{ marginTop: "25%", textAlign: "center" }}>
          This is a demo application for booking. application built with
          react.tsx and redux design pattern{" "}
        </p>
      </Card.ImgOverlay>
    </Card>
  );
}

export default EntryPage;
