
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
    Description: string;
    PhoneNumber: string;
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

export class Article {
    Id: number;
    Title: string;
    Price: number;
    CurrencyCode: string;
    Condition: string;
    ConditionShortName: string;
    Ubication: string;
    Description: string;
    PhoneNumber: string;
    CreationDate: string;
    ImgDetail: Array<ImgDetail>;
}

export class ImgDetail {
    Id: number;
}

export class Seller {
    Id: number;
    Name: string;
    PhoneNumber: string;
    Mail: string;
}

export class ArticleFullData {
    Article: Article;
    Seller: Seller;
}
