
import { Audit } from '../../base/audit/audit';

export class Market extends Audit {
    Id: number;
    Title: string;
    Price: number;
    CurrencyId: number;
    Currency: string;
    MarketTypeId: number;
    MarketType: string;
    ConditionId: number;
    Condition: string;
    CategoryId: number;
    Category: string;
    SubCategoryId: number;
    SubCategory: string;
    Ubication: string;
    Img: string;
    ImgPath: string;
    ContenTypeShort: string;
    ContenTypeLong: string;
    CreationDate: string;
}

export class Currency {
    Id: number;
    ShortName: string;
    Description: string;
}

export class MarketType {
    Id: number;
    ShortName: string;
    Description: string;
}

export class Condition {
    Id: number;
    ShortName: string;
    Description: string;
}

export class Category {
    Id: number;
    ShortName: string;
    Description: string;
}

export class SubCategory {
    Id: number;
    ShortName: string;
    Description: string;
}