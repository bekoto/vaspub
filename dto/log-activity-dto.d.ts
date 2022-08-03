export interface LogActivityDto {
    id: string;
    module: string;
    acte: string;
    action: string;
    description: string;
    startAction: Date;
    endAction: Date;
    logAt: Date;
    code: string;
    status: string;
    error: string;
    others: string;
    user: string;
}
