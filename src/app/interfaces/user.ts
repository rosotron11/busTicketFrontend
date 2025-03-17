import { Bus } from "./bus"
import { Ticket } from "./ticket"

export interface User {
    id:number
    username:string
    password:string
    email:string
    roles:string
    tickets:Ticket[]
    buses:Bus[]
}
