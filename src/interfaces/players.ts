export interface Player {
    first_name: string,
    last_name: string,
    id: string,
    position: string,
    fppg: number,
    salary: string,
    images: {
        default: {
            height: number,
            width: number,
            url: string
        }
    }
}