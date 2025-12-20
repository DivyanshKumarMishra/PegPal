import dotenv from 'dotenv/config';
import express, { urlencoded } from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { CORS_OPTIONS, NODE_ENV, PORT } from './config/app_config';
import authRouter from './routes/auth.route';
import { CustomError } from './utils/CustomError';
import colors from 'colors'

const app = express();

app.use(cors(CORS_OPTIONS));
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      error: error.message,
      details: error.details,
    });
  }

  if (error instanceof Error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  return res.status(500).json({
    error: 'Something went wrong',
  });
});

async function runServer() {
  try {
    app.listen(PORT, async () => {
      console.log(`${NODE_ENV.toLocaleUpperCase()} Server is running on port: ${PORT}`.yellow);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Something went wrong');
    }
  }
}

runServer();
