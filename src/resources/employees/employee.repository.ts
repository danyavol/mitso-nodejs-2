import { EntityRepository, AbstractRepository, DeleteResult, UpdateResult } from 'typeorm';
import Employee from './employee.entity';

@EntityRepository(Employee)
export class EmployeeRepository extends AbstractRepository<Employee> {

    create(employee: Employee): Promise<Employee> {
        const employees = this.repository.create(employee);
        return this.manager.save(employees);
    }

    getAll(): Promise<Employee[]> {
        return this.repository.find();
    }

    getById(id: string): Promise<Employee | undefined> {
        return this.repository.findOne({ id });
    }

    updateById(id: string, employee: Employee): Promise<UpdateResult> {
        return this.repository.update({ id }, employee);
    }

    deleteById(id: string): Promise<DeleteResult> {
        return this.repository.delete({ id });
    }
}
