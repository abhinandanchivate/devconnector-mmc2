// entry point for our server.
import express from "express";
import server from "./server.js";
const PORT = 3001;
const app = server;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
