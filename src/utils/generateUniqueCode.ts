// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// Function to generate a random alphanumeric code
import {userModel} from "../modules/users/models/userModel";
const generateCode = async (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    console.log('code',code);
    return code;
}

// Function to check if a code already exists in the database
const isCodeUnique = async (code) => {
    const existingUser = await userModel.findOne({
        where: {
            code: String(code),
        },
    });
    console.log('existingUser',existingUser);

    return !existingUser; // If existingUser is null, the code is unique
}

// Function to generate a unique code
const generateUniqueCode = async (length) => {
    let uniqueCode;

    do {
        uniqueCode = generateCode(length);
    } while (!(await isCodeUnique(uniqueCode)));

    return uniqueCode;
}


export { generateUniqueCode, generateCode }
