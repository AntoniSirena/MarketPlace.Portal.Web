export class SystemConfiguration {
    Configuration: _Configuration
}

export class _Configuration{
    Data: Data;
}

export class Data{
 Enterprise: Enterprise;
}

export class Enterprise{
    Name: string;
    RNC: string;
    Phone: string;
    Fax: string;
    Address: string;
    Logo: string;
    EnterpriseType: string;     
}