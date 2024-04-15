const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config();

app.use(
  cors({
    origin: process.env.BNPL_PAYMNET_API_URL, // 요청을 허용할 클라이언트의 오리진
  })
);

app.use(express.static("public"));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect(302, "/products");
});

app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "product.html"));
});

app.get("/order-complete", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "order-complete.html"));
});

app.post("/api/bnpl-order/callback", (req, res) => {
  console.log(`[BNPL] Order Callback: ${JSON.stringify(req.body)}`);
  const query = new URLSearchParams(req.body).toString();
  res.redirect(`/order-complete.html?${query}`);
});

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
