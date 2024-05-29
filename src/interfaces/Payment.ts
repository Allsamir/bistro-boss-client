interface Payment {
  email: string;
  name: string;
  price: number;
  transactionID: string;
  time: Date; // utc data convert. use moment.js to convert to local date time
  order: string[];
  status: string;
}

export default Payment;
