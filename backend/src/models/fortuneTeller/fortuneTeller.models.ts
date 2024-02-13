export interface FortuneTellerDetailSchema{
    fortuneTellerId: string,
    stageName: string,
    description: string
}

export interface fortuneTellerSchema{
    fortunetellerid: string,
    isverified: boolean,
    description: string,
    identitycardnumber: string,
    stagename: string,
    identitycardcopy: string,
    totalscore: number,
    totalreview: number,
    created_at: Date,
    updated_at: Date
}