import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Méthode non autorisée" });
    }

    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token manquant" });
    }

    // @ts-ignore
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/token/refresh`, {
            refresh_token: refreshToken,
        });

        const { token, refresh_token: newRefreshToken } = response.data;

        res.setHeader("Set-Cookie", [
            serialize("refresh_token", newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            }),
        ]);

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(401).json({ message: "Impossible de rafraîchir le token" });
    }
}
