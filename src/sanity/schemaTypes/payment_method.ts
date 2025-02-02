export default {
    name: "stripeTransaction",
    type: "document",
    title: "Stripe Transaction",
    fields: [
      {
        name: "transactionId",
        type: "string",
        title: "Transaction ID",
      },
      {
        name: "customerEmail",
        type: "string",
        title: "Customer Email",
      },
      {
        name: "amount",
        type: "number",
        title: "Amount",
      },
      {
        name: "currency",
        type: "string",
        title: "Currency",
      },
      {
        name: "status",
        type: "string",
        title: "Payment Status",
      },
      {
        name: "createdAt",
        type: "datetime",
        title: "Transaction Date",
      },
    ],
  };
  