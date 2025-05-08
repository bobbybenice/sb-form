import { NextRequest, NextResponse } from 'next/server';

const RATE_LIMIT_WINDOW = 60;
const RATE_LIMIT_MAX = 5;

const rateLimits: Record<string, { count: number; timestamp: number }> = {};

export function middleware(req: NextRequest) {
  const xForwardedFor = req.headers.get('x-forwarded-for');
  const ip =
    xForwardedFor && typeof xForwardedFor === 'string'
      ? xForwardedFor.split(',')[0].trim()
      : 'anonymous';

  const currentTime = Math.floor(Date.now() / 1000);

  console.log(`This request is from IP: ${ip} at ${currentTime}`);

  if (ip && rateLimits[ip]) {
    const { count, timestamp } = rateLimits[ip];

    if (timestamp && count >= 0) {
      if (currentTime - timestamp <= RATE_LIMIT_WINDOW) {
        if (count >= RATE_LIMIT_MAX) {
          return new NextResponse('Rate limit exceeded', { status: 429 });
        }
        rateLimits[ip].count += 1;
      } else {
        rateLimits[ip] = { count: 1, timestamp: currentTime };
      }
    } else {
      rateLimits[ip] = { count: 1, timestamp: currentTime };
    }
  } else {
    rateLimits[ip] = { count: 1, timestamp: currentTime };
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/*',
};
