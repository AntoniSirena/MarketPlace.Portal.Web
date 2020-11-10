import { Audit } from '../../base/audit/audit';

export class AccompanimentInstrument {
}


export class IdentificationData extends Audit {
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
    VisitDateA?: string;
    QuantityChildrenA?: number;
    QuantityGirlsA?: number;
    ExpectedTimeA?: number;
    RealTimeA?: number;

    VisitIdB?: number;
    VisitDateB?: string;
    QuantityChildrenB?: number;
    QuantityGirlsB?: number;
    ExpectedTimeB?: number;
    RealTimeB?: number;

    VisitIdC?: number;
    VisitDateC?: string;
    QuantityChildrenC?: number;
    QuantityGirlsC?: number;
    ExpectedTimeC?: number;
    RealTimeC?: number;
}

export class AccompInstRequest {
    Id: number;
    RequestId: number;
    DocentFullName: string;
    DocumentNumber: string;
    Status: string;
    StatusColour: string;
    OpeningDate: string;
    ClosingDate: string;
    AllowEdit: string;
    CanViewResumenOption: boolean;
    EfficiencyGeneralValue: string;
    EfficiencyGeneralColour: string;
}


export class VariableResponse {
    Id: number;
    RequestId: number;
    Variable: string;
    StausId: number;
    StatusDescription: string;
    StatusColour: string;
    VariableDescription: string;
    VariableTitle: string;
    AreaIdA: number;
    AreaIdB: number;
    AreaIdC: number;
    VariableDetails: Array<VariableDetail>;

    EfficiencyValueA: string;
    EfficiencyColourA: string;

    EfficiencyValueB: string;
    EfficiencyColourB: string;

    EfficiencyValueC: string;
    EfficiencyColourC: string;

    EfficiencyTotalValue: string;
    EfficiencyTotalColour: string;

    EfficiencyGeneralValue: string;
    EfficiencyGeneralColour: string;

    EfficiencyEvaluateFactor: string;

    VisitAIsAvailable: boolean;
    VisitBIsAvailable: boolean;
    VisitCIsAvailable: boolean;

}

export class VariableDetail {
    Id: number;
    Number: string;
    Description: string;
    AreaIdA: number;
    IndicadorIdA: number;
    AreaIdB: number;
    IndicadorIdB: number;
    AreaIdC: number;
    IndicadorIdC: number;
}


export class CommentsRevisedDocument {
    Id: number;
    RequestId: number;
    StausId: number;
    StatusDescription
    StatusColour: string;
    AreaIdA: number;
    DateA: string;
    AreaIdB: number;
    DateB: string;
    AreaIdC: number;
    DateC: string;
    CommentsRevisedDocumenDetails: Array<string>;
}

export class CommentsRevisedDocumenDetails {
    Id: number;
    Description: string;
    AreaIdA: number;
    DateA: string;
    CommentA: string;
    AreaIdB: number;
    DateB: string;
    CommentB: string;
    AreaIdC: number;
    DateC: string;
    CommentC: string;
}

export class DescriptionObservationSupportProvided {
    Id: number;
    RequestId: number;
    StausId: number;
    StatusDescription
    StatusColour: string;
    AreaIdA: number;
    DateA: string;
    CommentA: string;
    AreaIdB: number;
    DateB: string;
    CommentB: string;
    AreaIdC: number;
    DateC: string;
    CommentC: string;
}


export class SuggestionsAgreement {
    Id: number;
    RequestId: number;
    StausId: number;
    StatusDescription
    StatusColour: string;

    AreaIdA: number;
    DateA: string;
    CommentA: string;
    TeacherSignatureA: string;
    CompanionSignatureA: string;
    DistrictTechnicianSignatureA: string;

    AreaIdB: number;
    DateB: string;
    CommentB: string;
    TeacherSignatureB: string;
    CompanionSignatureB: string;
    DistrictTechnicianSignatureB: string;

    AreaIdC: number;
    DateC: string;
    CommentC: string;
    TeacherSignatureC: string;
    CompanionSignatureC: string;
    DistrictTechnicianSignatureC: string;
}


export class ResearchSummary {
    RequestId: number;
    Summary: number;
}



export class AccompanyInstrumentDetails {
    IdentificationData: _IdentificationData;
    VariableA : _VariableDetails;
    VariableB : _VariableDetails;
    VariableC : _VariableDetails;
    VariableD : _VariableDetails;
    VariableE : _VariableDetails;
    VariableF : _VariableDetails;
    VariableG : _VariableDetails;
    VariableH : _VariableDetails;
    CommentsRevisedDocument: _CommentsRevisedDocument;
    DescriptionObservationSupportProvided: _DescriptionObservationSupportProvided;
    SuggestionsAgreement: _SuggestionsAgreement;
}


export class _VariableDetails {
    Id: number;
    RequestId: number;
    Variable: string;
    StausId: number;
    StatusDescription: string;
    StatusColour: string;
    VariableDescription: string;
    VariableTitle: string;
    VariableDetails: Array<_VariableDetail>;
    AreaA: string;
    AreaB: string;
    AreaC: string;
    
    EfficiencyValueA: string;
    EfficiencyColourA: string;
    
    EfficiencyValueB: string;
    EfficiencyColourB: string;
    
    EfficiencyValuC: string;
    EfficiencyColourC: string;
    
    EfficiencyTotalValue: string;
    EfficiencyTotalColour: string;
    
    EfficiencyGeneralValue: string;
    EfficiencyGeneralColour: string;
    
    EfficiencyEvaluateFactor: string;
    
    VisitAIsAvailable: boolean;
    VisitBIsAvailable: boolean;
    VisitCIsAvailable: boolean;
    
}

export class _VariableDetail {
    Id: number;
    Number: number;
    Description: string;
    AreaA: string;
    IndicadorA: string;
    AreaB: string;
    IndicadorB: string;
    AreaC: string;
    IndicadorC: string;
}

export class _IdentificationData {
    Id: number;
    RequestId: number;
    Regional: string;
    Distrit: string;
    Center: string;
    Tanda: string;
    Grade: string;
    Docent: string;
    DocentDocument: string;
    Companion: string;
    CompanionDocument

    VisitA: string;
    VisitDateA: string;
    QuantityChildrenA: number;
    QuantityGirlsA: number;
    ExpectedTimeA: number;
    RealTimeA: number;

    VisitB: string;
    VisitDateB: string;
    QuantityChildrenB: number;
    QuantityGirlsB: number;
    ExpectedTimeB: number;
    RealTimeB: number;

    VisitC: string;
    VisitDateC: string;
    QuantityChildrenC: number;
    QuantityGirlsC: number;
    ExpectedTimeC: number;
    RealTimeC: number;
}

export class _CommentsRevisedDocument {
    Id: number;
    RequestId: number;
    StausId: number;
    StatusDescription: string;
    StatusColour: string;
    AreaA: string;
    DateA: string;
    AreaB: string;
    DateB: string;
    AreaC: string;
    DateC: string;
    CommentsRevisedDocumenDetails: Array<_CommentsRevisedDocumentDetail>;
}

export class _CommentsRevisedDocumentDetail {
    Id: number;
    Description: string;
    AreaA: string;
    DateA: string;
    CommentA: string;
    AreaB: string;
    DateB: string;
    CommentB: string;
    AreaC: string;
    DateC: string;
    CommentC: string;
}

export class _DescriptionObservationSupportProvided {
    Id: number;
    RequestId: number;
    StausId: number;
    StatusDescription: string;
    StatusColour: string;
    AreaA: string;
    DateA: string;
    CommentA: string;
    AreaB: string;
    DateB: string;
    CommentB: string;
    AreaC: string;
    DateC: string;
    CommentC: string;
}

export class _SuggestionsAgreement {
    Id: number;
    RequestId: number;
    StausId: number;
    StatusDescription: string;
    StatusColour: string;

    AreaA: string;
    DateA: string;
    CommentA: string;
    TeacherSignatureA: string;
    CompanionSignatureA: string;
    DistrictTechnicianSignatureA: string;

    AreaB: string;
    DateB: string;
    CommentB: string;
    TeacherSignatureB: string;
    CompanionSignatureB: string;
    DistrictTechnicianSignatureB: string;

    AreaC: string;
    DateC: string;
    CommentC: string;
    TeacherSignatureC: string;
    CompanionSignatureC: string;
    DistrictTechnicianSignatureC: string;
}

