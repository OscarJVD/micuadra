// Estructura y         asignación de variables de nuestra cuadrangular
export class Quadrangular {
    _id: string;
    firstTeam:   string;
    secondTeam:  string;
    thirdTeam:   string;
    fourthTeam:  string;
    firstCoupleScore:  string;
    secondCoupleScore:  string;
    status: number;

    constructor(_id = '',firstTeam = '',secondTeam = '',thirdTeam = '',fourthTeam = '',firstCoupleScore = '',
                secondCoupleScore = '',status = 1)
    {
        this._id = _id;
        this.firstTeam = firstTeam;
        this.secondTeam = secondTeam;
        this.thirdTeam = thirdTeam;
        this.fourthTeam = fourthTeam;
        this.firstCoupleScore = firstCoupleScore;
        this.secondCoupleScore = secondCoupleScore;
        this.status = status;
    }
}
