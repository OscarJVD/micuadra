import { Time } from '@angular/common';
// Estructura y         asignación de variables de nuestra tarea
export class Pet {
    _id: string;
    name: string;
    type: string;
    description: string;
    status: number;

    constructor(_id = '',name = '',type = '',description = '',status = 1)
    {
        this._id = _id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.status = status;
    }
}
