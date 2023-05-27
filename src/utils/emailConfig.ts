import nodemailer, { Transporter } from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

const transporter: Transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
