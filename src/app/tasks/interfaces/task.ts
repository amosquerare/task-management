import { Person } from "./person";

export interface Task{
    state: "Completada" | "Pendiente"
    taskName: string;
    deadline: Date;
    persons: Person[]
}

