export const InvoiceType = {
    INCOME: 'INCOME',
    OUTCOME: 'OUTCOME',
} as const

export type InvoiceType =
    (typeof InvoiceType)[keyof typeof InvoiceType]

export const UnitType = {
    PIECE: 'PIECE',
    BOX: 'BOX',
    KG: 'KG',
} as const


export type UnitType =
    (typeof UnitType)[keyof typeof UnitType]

export const AgentInvoiceFormat = {
    DEFAULT: 'DEFAULT',
    CUSTOM: 'CUSTOM',
} as const


export type AgentInvoiceFormat =
    (typeof AgentInvoiceFormat)[keyof typeof AgentInvoiceFormat]

export const PriceSource = {
    MANUAL: 'MANUAL',
    AUTO: 'AUTO',
    MEMORY: 'MEMORY',
} as const


export type PriceSource =
    (typeof PriceSource)[keyof typeof PriceSource]
