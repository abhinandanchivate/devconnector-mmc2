//  i will consume it in my index.js from routers.

import userRouter from "../api/users";
import server from "../server";

// import profileRouter from "../api/profiles";
// import userRouter from "../api/users";

server.use("/api/users", userRouter);
server.use("/api/profiles", profileRouter);
