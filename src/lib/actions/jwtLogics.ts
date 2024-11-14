'use server'

import jwt from 'jsonwebtoken'
const JWT_SECRET_KEY = "testKey";

export async function generateToken(payload: any){
    const expiryTime = '4h';
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: expiryTime });

    return token;
}

export async function checkToken(token: string){
    try {
        jwt.verify(token,JWT_SECRET_KEY);
        return true;
    }
    catch(e) {
        return false;
    }
}

export async function getDecoded(token: string){
    const ans = jwt.decode(token);

    return ans;
}
