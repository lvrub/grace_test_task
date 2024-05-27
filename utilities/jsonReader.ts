import * as fs from "fs";

export const getAuthData = ()=> {
    const rowData = fs.readFileSync("login_data.json");
    const jsonData = JSON.parse(rowData.toString());
    return{
        email: jsonData.EMAIL as string,
        password: jsonData.PASSWORD as string
    }
}