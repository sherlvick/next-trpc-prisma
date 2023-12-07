import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const compare = (password: string, hash: string) =>
    bycrypt.compareSync(password, hash);

export const sign = (claims: object) => {
    const secret = process.env.PRIVATE_KEY!;

    let token = jwt.sign(claims, secret, {
        expiresIn: "60d", //TODO: through config
    });
    return token;
};

export const snackBarErrorOptions = {
    position: "top-center",
    style: {
        backgroundColor: "#f44336",
        color: "#ffffff",
        textAlign: "center",
    },
    closeStyle: {},
};
