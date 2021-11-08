import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';
export class updateTaskDto{
    @IsOptional()
    title?: string;

    @IsOptional()
    description?: string;
    
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
};