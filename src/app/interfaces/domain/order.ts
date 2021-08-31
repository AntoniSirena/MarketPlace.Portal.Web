

export interface ICreateOrder {
    ArticleId: number;
    OrderId: number;
    Quantity: number;
    ItemNote: string;
}

export interface ICheckoutOrder {
    OrderId: number;
    PaymentMethod: string;
    Address: string;
}
