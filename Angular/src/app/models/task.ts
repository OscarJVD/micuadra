import { Time } from '@angular/common';
// Estructura y         asignación de variables de nuestra tarea
export class Task {
    _id: string;
    title: string;
    byWhen: Date;
    assignmentDate: Date;
    subject: string;
    topic: string;
    description: string;
    status: number;

    constructor(_id = '',title = '',byWhen = new Date(),assignmentDate = new Date(),subject = '',topic = '',description = '',status = 1)
    {
        this._id = _id;
        this.title = title;
        this.byWhen = byWhen;
        this.assignmentDate = assignmentDate;
        this.subject = subject;
        this.topic = topic;
        this.description = description;
        this.status = status;
    }
}
