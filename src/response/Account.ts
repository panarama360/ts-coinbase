export interface Account {
    id: string;
    // @ts-ignore
    name: string;
    primary: boolean;
    type: string;
    currency: string;
    balance: Balance;
    created_at: string;
    updated_at: string;
    resource: string;
    resource_path: string;
}
export interface Balance {
    amount: string;
    currency: string;
}
