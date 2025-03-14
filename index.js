import express from "express"
import cors from "cors";
import connectDB from "./db/db.js";

import authRouter from "./routes/auth.js"
import departmentRouter from "./routes/department.js"
import settingsRouter from "./routes/settings.js"
import employeeRouter from "./routes/employee.js"
import salaryRouter from "./routes/salary.js"
import inquireRouter from "./routes/inquire.js"
import dashboardRouter from "./routes/dashboard.js"

const app = express();
connectDB();

app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/uploads"));

app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/inquire", inquireRouter);
app.use("/api/dashboard", dashboardRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`)
})

