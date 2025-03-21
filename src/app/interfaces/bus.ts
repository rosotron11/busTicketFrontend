import { ITicket } from "./ticket";
import { IUser } from "./user";

export interface IBus {
    id: number;
    createdOn: string; // ISO 8601 string format for LocalDateTime
    busNumber: string;
    vendorName: string;
    source: string;
    destination: string;
    timeOfBoarding: string; // ISO 8601 string format for LocalTime
    timeOfDropping: string; // ISO 8601 string format for LocalTime
    dateOfJourney: string; // ISO 8601 string format for LocalDate
    boardingPlaces: Array<{ [key: string]: string }>;
    dropOffPlaces: Array<{ [key: string]: string }>;
    bookedSeats: number;
    totalSeats: number;
    conductor: IUser;
    price: number;
}
