import bcrypt from "bcrypt";

export class PasswordUtils {
    static async hashPassword(password) {
        return await bcrypt.hash(password, 12);
    }

    static async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
}
