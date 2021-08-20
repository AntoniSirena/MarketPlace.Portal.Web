

export class CreateOrderDTO {
    ArticleId: number;
    Quantity: number;
}


export class OrderDetailDTO {

    Id: number;
    Date: string;
    Status: string;
    Subtotal: number;
    Discount: number;
    ITBIS: number;
    TotalAmount: number;
    Items: Array<OrderDetailItemDTO>
}

export class OrderDetailItemDTO{
    Id: number;
    ArticleId: number;
    Title: string;
    Quantity: number;
    Price: number;
    CurrencyCode: string;
    Subtotal: number;
    ITBIS: number;
    TotalAmount: number;
    UseStock: boolean;
    Stock: number;
    MinQuantity: number;
    MaxQuantity: number;
}