# ts-coinbase
### Installation

```
$ npm install ts-coinbase --save
```

`getAccounts(paggination?: PagginationParam):` **Promise<Response<Account[]>>**

`getAccount(id:string):` **Promise<Response<Account\>>**

`getAccountPrimary(id:string):` **Promise<Response<Account\>>**

`getAccountUpdateName(id:string, name: string):` **Promise<Response<Account\>>**

`deleteAccount(id:string):` **Promise<Response<any\>>**

`getAddresses(idAccount:string, paggination?: PagginationParam):` **Promise<Response<Address[]>>**

`getAddress(idAccount:string, addressId: string):` **Promise<Response<Address\>>**

`getTransactionByAddresses(idAccount:string, addressId: string):` **Promise<Response<Transaction[]>>**

`createAddress(idAccount:string):` **Promise<Response<Address\>>**

`getTransactions(idAccount:string, paggination?: PagginationParam):` **Promise<Response<Transaction[]>>**

`getTransaction(idAccount:string, transactionId: string):` **Promise<Response<Transaction\>>**

`sendMoney(idAccount:string, params: SendParam):` **Promise<Response<Transaction\>>**

`completeRequestMoney(idAccount:string, transactionId: string):` **Promise<Response<any\>>**

`resendRequestMoney(idAccount:string, transactionId: string):` **Promise<Response<any\>>**

`deleteRequestMoney(idAccount:string, transactionId: string):` **Promise<Response<any\>>**

`getUser(id:string):` **Promise<Response<User\>>**

### Usage
```typescript
const coinbaseClient: CoinbaseClient = new CoinbaseClient('<secret>', '<key>');
```
