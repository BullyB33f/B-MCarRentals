//importing necessary packages
import express from "express";
import morgan from "morgan";
import mysql from "mysql2";
import cors from "cors";
import { adminRouter, userRouter, vehicleRouter } from "./routes/managementRoutes.js";
import { authRouter } from "./routes/authRouter.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";


const app = express();


app.options('*', cors(['http://localhost:4200','http://localhost:46500']));
app.use(cors(['http://localhost:4200','http://localhost:46500']));

app.use(express.json({ limit: '1000kb'}));
app.use(express.urlencoded({ extended: true, limit: '1000kb' }));

const port = 8888;

if(process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));

app.use(
    fileUpload({
        limits: {
            fileSize: 100 * 1024 * 1024,
        },
        abortOnLimit: true,
    })
)


app.use('/api/v1/vehicle', vehicleRouter );
app.use('api/v1/admin', adminRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter)

const server = app.listen(port, () => console.log(`Listening on http://localhost:${port}...`))