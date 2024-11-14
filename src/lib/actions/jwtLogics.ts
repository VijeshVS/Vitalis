'use server'

import jwt from 'jsonwebtoken'
const JWT_SECRET_KEY = process.env.SECRET_KEY || "testKey";

export async function generateToken(payload: any){
    const expiryTime = '4h';
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: expiryTime });

    return token;
}

