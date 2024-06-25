export interface Sys {
    id: string;
    type: string;
    createdAt?: string;
    updatedAt?: string;
    space?: object;
}

export interface Metadata {
    tags: any[];
}