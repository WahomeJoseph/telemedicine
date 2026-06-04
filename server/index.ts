import express, { Application, Request, Response, NextFunction } from "express"
import dontenv from "dotenv"
import helmet from "helmet"
import cors from "cors"
import { connectDB } from "./src/config/db.js"
import { apiLimiter, authLimiter } from "./src/middleware/ratelimit.js"
import { authRouter } from "./src/routes/auth.route.js"
import { userRouter } from "./src/routes/user.route.js"
import { serviceRouter } from "./src/routes/service.route.js"
import { adminRouter } from "./src/routes/admin.route.js"
import { appointmentRouter } from "./src/routes/appointment.route.js"

dontenv.config();

const app:Application = express();
const PORT = process.env.PORT

// security headers
app.use(helmet())

// CORS:Connect to the frontend
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json());
app.get("/", (req, res) => {
    res.json({message: "Database is active!"})
})

// Rate limit
app.use('/api/auth', authLimiter);
app.use('/api/auth', apiLimiter);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/services', serviceRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/admin', adminRouter);

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV, timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

const startServer = async () => {
    await connectDB()

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}

startServer()
