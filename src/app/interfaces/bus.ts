import { Ticket } from "./ticket";

export interface Bus {
    id:number;
    bus_number:number
    source:string
    destination:string
    timeOfJourney:Date
    dateOfJourney:Date
    dropOffPlaces:string[]
    seats:number
    tickets:Ticket[]
}
