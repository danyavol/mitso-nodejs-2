import { EntityRepository, AbstractRepository } from 'typeorm';
import User from './user.entity';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {

    create(user: User): Promise<User> {
        const users = this.repository.create(user);
        return this.manager.save(users);
    }

    getByLogin(login: string): Promise<User | undefined> {
        return this.repository.findOne({ login });
    }
}
