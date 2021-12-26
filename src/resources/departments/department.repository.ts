import { EntityRepository, AbstractRepository, DeleteResult, UpdateResult } from 'typeorm';
import Department from './department.entity';

@EntityRepository(Department)
export class DepartmentRepository extends AbstractRepository<Department> {

    create(department: Department): Promise<Department> {
        const departments = this.repository.create(department);
        return this.manager.save(departments);
    }

    getAll(): Promise<Department[]> {
        return this.repository.find();
    }

    getById(id: string): Promise<Department | undefined> {
        return this.repository.findOne({ id });
    }

    updateById(id: string, department: Department): Promise<UpdateResult> {
        return this.repository.update({ id }, department);
    }

    deleteById(id: string): Promise<DeleteResult> {
        return this.repository.delete({ id });
    }
}
