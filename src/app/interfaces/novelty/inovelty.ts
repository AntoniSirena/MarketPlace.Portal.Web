
import { Iaudit } from '../base/Iaudit/iaudit';

export interface INovelty extends Iaudit {
    Id: number;
    Title: string;
    Description: string;
    IsEnabled: boolean;
    IsPublic: boolean;
    NoveltyTypeId: number;
    Img: string;
    ImgPath: string;
    StartDate: string;
    EndDate: string;
}
