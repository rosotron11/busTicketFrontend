import { IBus } from "./bus";
import { IUser } from "./user";

export interface ITicket {
    id: number;
    ticketNumber: string;
    paymentStatus: string;
    source: string;
    destination: string;
    dateOfJourney: Date; // ISO 8601 string format for LocalDate
    boardingTime: any; // ISO 8601 string format for LocalTime
    droppingTime: any; // ISO 8601 string format for LocalTime
    passengers: Array<{ [key: string]: string }>;
    bookingTime: any; // ISO 8601 string format for LocalDateTime
    paymentTime: any; // ISO 8601 string format for LocalDateTime
    email: string;
    amount: number;
    bookingUser: IUser;
    bus: IBus;
    paymentGateway: string;
}
