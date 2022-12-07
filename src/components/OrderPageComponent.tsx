import { useAppSelector } from "../app/hooks";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import httpService from "../app/httpService";
import { useNavigate } from "react-router-dom";
function OrderPageComponent() {
  const { hotelName } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Row[]>([]);
  const order = useAppSelector((state) => state.order);
  const user_id = useAppSelector((state) => state.user.id);
  const startDate = useAppSelector((state) => state.order.start_date);
  const endDate = useAppSelector((state) => state.order.end_date);
  const orderButton = async () => {
    const http = new httpService();
    if (
      user_id !== null &&
      startDate !== null &&
      endDate !== null &&
      order.hotelId !== null
    ) {
      const data = await http.order(
        user_id,
        startDate,
        endDate,
        order.hotelId,
        order.twoBeds.qty,
        order.threeBeds.qty,
        order.fourBeds.qty
      );
      if (data !== undefined) {
        console.log(data);
        navigate(`/reservation/${data.data}`);
      }
    } else console.log("sdfghjkl");
  };
  const TAX_RATE = 0.17;

  function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
  }
  function getDaysDiff(start: Date | null, end: Date | null): number {
    if (start !== null && end !== null) {
      {
        const st = new Date(start);
        const en = new Date(end);
        const _MS_PER_DAY = 1000 * 3600 * 24;
        // Discard the time and time-zone information.
        let timediff = Math.abs(en.getTime() - st.getTime());
        return Math.floor(timediff / _MS_PER_DAY);
      }
    } else {
      return 1;
    }
  }

  function priceRow(qty: number, unit: number, nights: number) {
    return qty * unit * nights;
  }

  function createRow(desc: string, qty: number, unit: number, nights: number) {
    const price = priceRow(qty, unit, nights);
    return { desc, qty, unit, price, nights };
  }

  interface Row {
    desc: string;
    qty: number;
    unit: number;
    price: number;
    nights: number;
  }

  function subtotal(items: readonly Row[]) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const rows = [
    createRow(
      `2 beds room in ${hotelName}`,
      order.twoBeds.qty,
      500,
      getDaysDiff(startDate, endDate)
    ),
    createRow(
      `3 beds room in ${hotelName}`,
      order.threeBeds.qty,
      750,
      getDaysDiff(startDate, endDate)
    ),
    createRow(
      `4 beds room in ${hotelName}`,
      order.fourBeds.qty,
      1000,
      getDaysDiff(startDate, endDate)
    ),
  ];
  useEffect(() => {
    const validRows = rows.filter((x: Row) => x.qty > 0);
    setRooms(validRows);
  }, []);

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Desc</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Unit price</TableCell>
              <TableCell align="right">nights</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((row) => (
              <TableRow key={row.desc}>
                <TableCell>{row.desc}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{row.nights}</TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                0
              )} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="d-grid gap-2">
        <Button onClick={orderButton} variant="dark" size="lg">
          Confirm and Order
        </Button>
      </div>
    </div>
  );
}

export default OrderPageComponent;
