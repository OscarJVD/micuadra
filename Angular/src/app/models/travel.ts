import { Time } from '@angular/common';
// Estructura y         asignación de variables de nuestra tarea
export class Travel {
    _id: string;
    placeName: string;
    places: string;
    toDo: string;
    food: string;
    hotels: string;
    price: number;
    status: number;
    type: number;

    constructor(_id = '',placeName = '',places = '',toDo = '',food = '',hotels='',price = null,status = 1,type = 1)
    {
        this._id = _id;
        this.placeName = placeName;
        this.places = places;
        this.toDo = toDo;
        this.food = food;
        this.hotels = hotels;
        this.price = price;
        this.status = status;
        this.type = type;
    }
}
