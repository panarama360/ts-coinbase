export interface PagginationParam {
    limit?: number;
    order?: Order;
    starting_after?: number;
    ending_before?: number;
}

export enum Order {
    DESC = 'desc',
    ASC = 'asc'
}