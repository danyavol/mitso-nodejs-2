import { getCustomRepository } from 'typeorm';
import { Crypto } from '../../services/crypto.service';
import User, { IUser } from './user.entity';
import { UserRepository } from './user.repository';

async function create(userData: IUser): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const user = new User().update({ ...userData, password: Crypto.encrypt(userData.password) });
    await userRepository.create(user);
}

export default { create };