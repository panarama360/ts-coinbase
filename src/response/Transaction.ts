export interface Transaction {
    id: string;
    type: string;
    status: string;
    amount: Amount;
    native_amount: Native_amount;
    description: null;
    created_at: string;
    updated_at: string;
    resource: string;
    resource_path: string;
    network: Network;
    to: To;
    instant_exchange: boolean;
    details: Details;
}
export interface Amount {
    amount: string;
    currency: string;
}
export interface Native_amount {
    amount: string;
    currency: string;
}
export interface Network {
    status: string;
    name: string;
}
export interface To {
    id: string;
    resource: string;
    resource_path: string;
}
export interface Details {
    title: string;
    subtitle: string;
}
