import { Iaudit } from '../../base/Iaudit/iaudit';

export interface IaccompanimentInstrument {
}


export interface IidentificationData extends Iaudit {
    Id: number;
    RequestId: number;
    RegionalId: number;
    DistritId: number;
    CenterId: number;
    TandaId: number;
    GradeId: number;
    DocentId: number;
    CompanionId: number;

    VisitIdA?: number;
    VisitDateA?: Date;
    QuantityChildrenA?: number;
    QuantityGirlsA?: number;
    ExpectedTimeA?: number;
    RealTimeA?: number;

    VisitIdB?: number;
    VisitDateB?: Date;
    QuantityChildrenB?: number;
    QuantityGirlsB?: number;
    ExpectedTimeB?: number;
    RealTimeB?: number;

    VisitIdC?: number;
    VisitDateC?: Date;
    QuantityChildrenC?: number;
    QuantityGirlsC?: number;
    ExpectedTimeC?: number;
    RealTimeC?: number;
}
