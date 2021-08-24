
import { Iaudit } from './../../base/Iaudit/iaudit';

export interface Imarket extends Iaudit {
    Id: number;
    Title: string;
    Price: number;
    CurrencyId: number;
    MarketTypeId: number;
    ConditionId: number;
    CategoryId: number;
    SubCategoryId: number;
    Ubication: string;
    Description: string;
    PhoneNumber: number;
    Img: string;
    ImgPath: string;
    ContenTypeShort: string;
    ContenTypeLong: string;
    CreationDate: string;
    ProductTypeId: number;
    UseStock: boolean;
    Stock: number;
    MinQuantity: number;
    MaxQuantity: number;
}
