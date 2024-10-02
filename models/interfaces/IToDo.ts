export interface IToDo {
    id?: number;
    task: string;
    dateDue: Date;
    priority: number;
    completed: boolean;
    created?: Date;
    modified?: Date;
}
