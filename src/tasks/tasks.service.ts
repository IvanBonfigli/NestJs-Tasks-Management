import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
import { filterTasksDto } from './dto/filter-task.dto';
import { updateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks() : Task[]
    {
        return this.tasks;
    }

    getTasksWithFilters(filterDto : filterTasksDto) : Task[]{
        const {status, search} = filterDto;

        let tasks = this.getAllTasks();

        if(status)
        {
            tasks = tasks.filter(x => x.status.toLowerCase() === status.toLowerCase());
        }

        if(search)
        {
            tasks = tasks.filter((task) => {
                if(task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase()))
                {
                    return true;
                }
                return false;
            });
        }

        return tasks;
    }

    getTaskById(id : string): Task{
        //return this.tasks.find((task) => task.id === id);
        let found =  this.tasks.find(x => x.id === id);

        if(!found){
            throw new NotFoundException(`Task with id ${id} does not exist`);
        }

        return found;
    }

    createTask(createTaskDto: createTaskDto) : Task{

        const {title, description} = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);

        return task; 
    }

    deleteTask(id: string): Task[] {
        //otra manera de hacerlo mas sencilla
        //this.tasks = this.tasks.filter((task) => task.id !== id);

        let item = this.getTaskById(id);
        let index = this.tasks.indexOf(item);
        return this.tasks.splice(index, 1);

    }

    updateStatus(updateTaskDto: updateTaskDto, id: string) : Task
    {
        const {title, description, status} = updateTaskDto;

        let item = this.getTaskById(id);

        if(title)
        {
            item.title = title;
        }

        if(description)
        {
            item.description = description;
        }

        if(status)
        {
            item.status = status;
        }

        return item;

    }

}
