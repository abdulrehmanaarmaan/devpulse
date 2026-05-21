export interface Issue {
    title: string;
    description: string;
    type: string;
    reporter_id?: number
}

export interface Query {
    sort?: string;
    type?: string;
    status?: string
}

export interface Reporter {
    id: number;
    name: string;
    role: string
}

export interface FieldsToUpdate {
    title?: string,
    description?: string,
    type?: string
}