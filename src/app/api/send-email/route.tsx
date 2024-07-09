import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import ContactEmail from "@/app/emails/ContactEmail";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  const transporter = nodemailer.createTransport({
    // Configure your email service here
    host: "smtp.example.com",
    port: 587,
    auth: {
      user: "your-email@example.com",
      pass: "your-password",
    },
  });

  const emailHtml = render(ContactEmail({ name, email, message }));

  const options = {
    from: "your-email@example.com",
    to: "recipient@example.com",
    subject: "New Contact Form Submission",
    html: emailHtml,
  };

  try {
    await transporter.sendMail(options);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
