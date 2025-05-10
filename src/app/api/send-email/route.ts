import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.RESEND_TO_EMAIL;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

const ALLOWED_ORIGINS = [
  'https://sb-form-bobbybenices-projects.vercel.app',
  'http://localhost:3000',
];

export async function POST(req: Request) {
  const origin = req.headers.get('origin') || req.headers.get('referer');

  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: 'Unauthorized origin' }, { status: 403 });
  }

  if (!process.env.RESEND_API_KEY || !TO_EMAIL || !FROM_EMAIL) {
    return NextResponse.json(
      { error: 'Missing required Resend environment variables.' },
      { status: 500 }
    );
  }

  try {
    const { firstName, lastName, email, message } = await req.json();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing form fields' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: 'New Form Submission',
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Unexpected error:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * THOUGHTS
 * Requiring valid origin/referer manually, but could be done through Vercel Web Application Firewall.
 * Rate limiting logic was tested but omitted. Vercel WAF rate-limiting requires PRO plan.
 * CORS management
 * Captcha, or something equivalent, for bot protection
 */
