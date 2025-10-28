import bcrypt from "bcrypt";

export const verifyPassword = async (plainPass, hash) => {
    return await bcrypt.compare(plainPass, hash);
};