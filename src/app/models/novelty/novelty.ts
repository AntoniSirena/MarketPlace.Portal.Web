import { audit } from 'rxjs/operators';


import { Audit } from '../base/audit/audit';

export class Novelty extends Audit{
    Id: number;
    Title: string;
    Description: string;
    IsEnabled: boolean;
    IsPublic: boolean;
    NoveltyTypeId: number;
    NoveltyType: string;
    Img: string;
    ImgPath: string;
    StartDate: string;
    EndDate: string;
    ContenTypeShort: string;
    ContenTypeLong: string;
}

export class NoveltyType {
    Id: number;
    ShortName: string;
    Description: string;
}

export class  NoveltiesByType {
    Id: number;
    Title: string;
    Description: string;
    ImgBase64: string;
    ContenTypeShort: string;
    ContenTypeLong: string;
}
