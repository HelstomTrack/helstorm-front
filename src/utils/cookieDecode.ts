import Cookies from "js-cookie";
import jwt, {JwtPayload} from "jsonwebtoken";


interface CustomJwtPayload extends JwtPayload {
    id: number;
}
export function getUserId()  {
    const token = Cookies.get('token');
    if (!token) return null;
    try {
        const decoded = jwt.decode(token) as CustomJwtPayload;
        console.log('Token décodé:', decoded);
        return decoded.id;
    } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        return null;
    }
}
export function getToken() {
    const token = Cookies.get('token');
    if (!token) return null;
    return token;
}