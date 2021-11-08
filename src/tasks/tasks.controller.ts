import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { identity } from 'rxjs';
import { createTaskDto } from './dto/create-task.dto';
import { filterTasksDto } from './dto/filter-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskservice: TasksService){}

    @Get()
    getAllTasks(@Query() filterDto : filterTasksDto): Task[]{

        if(Object.keys(filterDto).length){
            return this.taskservice.getTasksWithFilters(filterDto);
        }
        else
        {
            return this.taskservice.getAllTasks();
        }
    }

    @Get(':id')
    getTaskById(@Param('id') id : string): Task{
        return this.taskservice.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: createTaskDto) : Task{
        return this.taskservice.createTask(createTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id') id : string): Task[]{
        return this.taskservice.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskData(@Param('id') id : string, @Body() createTaskDto: createTaskDto) : Task{
        return this.taskservice.updateStatus(createTaskDto, id);
    }
}