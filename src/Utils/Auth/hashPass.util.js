import bcrypt from "bcrypt";

export const hashPassword = async (plainPass) => {
    const saltRounds = 13;
    
    return await bcrypt.hash(plainPass, saltRounds);
}