export class TokenUtils {
    static async hash(token) {
        return bcrypt.hash(token, 12);
    }
    static async compare(token, hash) {
        return bcrypt.compare(token, hash);
    }
}
