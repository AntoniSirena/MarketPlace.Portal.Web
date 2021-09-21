

export class CreateOrderDTO {
    ArticleId: number;
    Quantity: number;
}


export class OrderDetailDTO {

    Id: number;
    Date: string;
    Status: string;
    StatusShortName: string;
    StatusColour: string;
    ClientStatusDescription: string;
    Subtotal: number;
    Discount: number;
    ITBIS: number;
    TotalAmount: number;
    Items: Array<OrderDetailItemDTO>
    Client: string;
    ClientPhoneNumber: string;
    Comment: string;
    Address: string;
    PaymentMethod: string;
    ClientId: number;
    Key: string;
}

export class OrderDetailItemDTO {
    Id: number;
    OrderId: number;
    ArticleId: number;
    Title: string;
    Quantity: number;
    Price: number;
    CurrencyCode: string;
    CurrencyISONumber: number;
    Subtotal: number;
    ITBIS: number;
    TotalAmount: number;
    UseStock: boolean;
    Stock: number;
    MinQuantity: number;
    MaxQuantity: number;
    Comment: string;
    ClientId: number;
    ClientName: string;
    ClientPhoneNumber: string;
    StatusShortName: string;
    Status: string;
    StatusColour: string;
    ClientStatusDescription: string;
    ProviderStatusDescription: string;
}


export class OrderInboxDTO {
    Id: number;
    TotalAmount: number;
    Date: string;
    Status: string;
    Address: string;
    PaymentMethod: string;
    Key: string;
    ClientId: number;
    ClientName: string;
}

export class OrderStatusDTO {
    Id: number;
    ShortName: string;
    Description: string;
}