export interface SendParam {
    type: string,
    to: string
    amount: number
    currency: string
    description?: string
    skip_notifications?: boolean
    fee?: string
    idem?: string
    to_financial_institution?: boolean
    financial_institution_website?: string
}