import { Response } from "express";
import { getCustomRepository } from "typeorm";
import { createUserToken } from "../../services/auth.service";
import { Crypto } from "../../services/crypto.service";
import { RequestError } from "../../services/errors";
import { UserRepository } from "../users/user.repository";


async function authorizeUser(res: Response, login: string, password: string): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.getByLogin(login);
    if (user) {
        const goodPassword = Crypto.compare(password, user.password);
        if (goodPassword) {
            createUserToken(res, { id: user.id, login: user.login });
            return;
        }
    }
    throw new RequestError(403, "Invalid login or password");
}

export default { authorizeUser };