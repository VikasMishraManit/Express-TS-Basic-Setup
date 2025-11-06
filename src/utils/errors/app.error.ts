export interface AppError extends Error{
     statusCode : number ,
}

export class InternalServerError implements AppError {
    statusCode: number;
    message: string;
    name: string;

    constructor(message : string){
        this.statusCode = 500 ;
        this.message = message;
        this.name = "InternalServerError"
    }
}

// now we can make more error classes like BadRequestError , NotFoundError etc.

// say notfound error
export class NotFoundError implements AppError {
    statusCode: number; 
    message: string;
    name: string;
    constructor(message : string){
        this.statusCode = 404 ;
        this.message = message;
        this.name = "NotFoundError"
    }
}

