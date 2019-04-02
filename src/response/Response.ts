import {Paggination} from "./Paggination";

export interface Response<T> {
    pagination?: Paggination,
    data: T
}