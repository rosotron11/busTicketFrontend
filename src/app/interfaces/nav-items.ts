export interface MenuItem{
    path:string,
    title:string,
    roles?:string[]
}

export interface MenuList{
    all: MenuItem[],
    conductor: MenuItem[],
    passenger: MenuItem[],
    admin: MenuItem[]
}