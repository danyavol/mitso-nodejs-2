import { EntityRepository, AbstractRepository, DeleteResult, UpdateResult } from 'typeorm';
import Project from './project.entity';

@EntityRepository(Project)
export class ProjectRepository extends AbstractRepository<Project> {

    create(project: Project): Promise<Project> {
        const projects = this.repository.create(project);
        return this.manager.save(projects);
    }

    getAll(): Promise<Project[]> {
        return this.repository.find();
    }

    getById(id: string): Promise<Project | undefined> {
        return this.repository.findOne({ id });
    }

    updateById(id: string, project: Project): Promise<UpdateResult> {
        return this.repository.update({ id }, project);
    }

    deleteById(id: string): Promise<DeleteResult> {
        return this.repository.delete({ id });
    }
}
