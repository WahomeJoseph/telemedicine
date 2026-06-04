import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { UserRole, JWTPayload } from '../../../shared/src/types.js';

const ACCESS_SECRET = process.env.JWT_SECRET! as string;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET! as string;
const ACCESS_EXPIRY = '1h';
const REFRESH_EXPIRY = '30d';
const REFRESH_SALT_ROUNDS = 10;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error('JWT_SECRET and JWT_REFRESH_SECRET must be set in environment');
}

// access token

export function signAccessToken(payload: {
  userId: string;
  email: string;
  role: UserRole;
}): string {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRY,
    issuer: 'telemedicine-api',
    audience: 'telemedicine-web',
  });
}

export function verifyAccessToken(token: string): JWTPayload {
  return jwt.verify(token, ACCESS_SECRET, {
    issuer: 'telemedicine-api',
    audience: 'telemedicine-web',
  }) as JWTPayload;
}

// refresh token

export async function generateRefreshToken(): Promise<{
  raw: string;
  hashed: string;
}> {
  const raw = crypto.randomBytes(64).toString('hex');
  const hashed = await bcrypt.hash(raw, REFRESH_SALT_ROUNDS);
  return { raw, hashed };
}

export function signRefreshToken(userId: string): string {
  return jwt.sign({ userId }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRY,
    issuer: 'telemedicine-api',
  });
}

export function verifyRefreshToken(token: string): { userId: string } {
  return jwt.verify(token, REFRESH_SECRET, {
    issuer: 'telemedicine-api',
  }) as { userId: string };
}

// match to the hashed tokens

export async function findMatchingRefreshToken(
  rawToken: string,
  hashedTokens: string[]
): Promise<string | null> {
  for (const hashed of hashedTokens) {
    const match = await bcrypt.compare(rawToken, hashed);
    if (match) return hashed;
  }
  return null;
}

// issue new token pair

export async function issueTokenPair(user: {
  _id: string;
  email: string;
  role: UserRole;
}): Promise<{
  accessToken: string;
  refreshToken: string;
  refreshTokenHashed: string;
}> {
  const accessToken = signAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  const { raw: refreshToken, hashed: refreshTokenHashed } =
    await generateRefreshToken();

  return { accessToken, refreshToken, refreshTokenHashed };
}
