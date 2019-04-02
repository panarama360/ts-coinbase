import axios, {AxiosInstance} from 'axios';
import * as crypto from 'crypto';
import {Sig} from "./Sig";
import {Response} from './response/Response'
import {PagginationParam} from "./PagginationParam";
import {User} from "./response/User";
import * as QueryString from 'query-string';
import {Address} from "./response/Address";
import {Transaction} from "./response/Transaction";
import {SendParam} from "./SendParam";
export class CoinbaseClient {
    private client: AxiosInstance;
    constructor(private secret: string, private key: string){
        this.client = axios.create({
            baseURL: 'https://api.coinbase.com/v2',
            headers: {
                'Content-Type'     : 'application/json',
                'Accept'           : 'application/json',
                'User-Agent'       : 'coinbase/ts/node/'+require('../package.json').version
            }
        });
        this.client.interceptors.request.use((config) => {
            let queryString = QueryString.stringify(config.params);
            queryString = queryString ? '?'+queryString : queryString;
            console.log(queryString);
            let sig = this.generateSig(config.url + queryString, config.method, JSON.stringify(config.data)||'');
            config.headers = Object.assign(config.headers, {
                'CB-ACCESS-SIGN': sig.digest,
                'CB-ACCESS-TIMESTAMP': sig.timestamp,
                'CB-ACCESS-KEY': this.key,
                'CB-VERSION': '2016-02-18'
            });
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
    }

    generateSig(path: string, method: string, bodyStr: string): Sig{
        const timestamp = Math.floor(Date.now() / 1000);
        const message = timestamp + method.toUpperCase() + '/v2' + path + bodyStr;
        const signature = crypto.createHmac('sha256', this.secret).update(message).digest('hex');
        return {
            digest: signature,
            timestamp
        }
    }

    getAccounts(paggination?: PagginationParam): Promise<Response<Account[]>>{
        return this
            .client
            .get('/accounts', {params: paggination})
            .then(value => value.data)
    }

    getAccount(id:string): Promise<Response<Account>>{
        return this
            .client
            .get('/accounts/'+id)
            .then(value => value.data)
    }

    getAccountPrimary(id:string): Promise<Response<Account>>{
        return this
            .client
            .post(`/accounts/${id}/primary`)
            .then(value => value.data)
    }

    getAccountUpdateName(id:string, name: string): Promise<Response<Account>>{
        return this
            .client
            .post(`/accounts/${id}`, {name})
            .then(value => value.data)
    }

    deleteAccount(id:string): Promise<Response<any>>{
        return this
            .client
            .delete(`/accounts/${id}`)
            .then(value => value.data)
    }

    getAddresses(idAccount:string, paggination?: PagginationParam): Promise<Response<Address[]>>{
        return this
            .client
            .get(`/accounts/${idAccount}/addresses`, {params: paggination})
            .then(value => value.data)
    }

    getAddress(idAccount:string, addressId: string): Promise<Response<Address>>{
        return this
            .client
            .get(`/accounts/${idAccount}/addresses/${addressId}`)
            .then(value => value.data)
    }

    getTransactionByAddresses(idAccount:string, addressId: string): Promise<Response<Transaction[]>>{
        return this
            .client
            .get(`/accounts/${idAccount}/addresses/${addressId}/transactions`)
            .then(value => value.data)
    }

    createAddress(idAccount:string): Promise<Response<Address>>{
        return this
            .client
            .post(`/accounts/${idAccount}/addresses`)
            .then(value => value.data)
    }


    getTransactions(idAccount:string, paggination?: PagginationParam): Promise<Response<Transaction[]>>{
        return this
            .client
            .get(`/accounts/${idAccount}/transactions`, {params: paggination})
            .then(value => value.data)
    }

    getTransaction(idAccount:string, transactionId: string): Promise<Response<Transaction>>{
        return this
            .client
            .get(`/accounts/${idAccount}/transactions/${transactionId}`)
            .then(value => value.data)
    }

    sendMoney(idAccount:string, params: SendParam): Promise<Response<Transaction>>{
        return this
            .client
            .post(`/accounts/${idAccount}/transactions`, params)
            .then(value => value.data)
    }

    completeRequestMoney(idAccount:string, transactionId: string): Promise<Response<any>>{
        return this
            .client
            .post(`/accounts/${idAccount}/transactions/${transactionId}/complete`)
            .then(value => value.data)
    }

    resendRequestMoney(idAccount:string, transactionId: string): Promise<Response<any>>{
        return this
            .client
            .post(`/accounts/${idAccount}/transactions/${transactionId}/resend`)
            .then(value => value.data)
    }

    deleteRequestMoney(idAccount:string, transactionId: string): Promise<Response<any>>{
        return this
            .client
            .delete(`/accounts/${idAccount}/transactions/${transactionId}/resend`)
            .then(value => value.data)
    }

    getUser(id:string): Promise<Response<User>>{
        return this
            .client
            .get('/users/'+id)
            .then(value => value.data)
    }
}