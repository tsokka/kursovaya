export type RequestKindType = 'order' | 'consultation';

export type RequestType = {
  name: string,
  phone: string,
  type: RequestKindType,
  service?: string
}

export type RequestPopupDataType = {
  type: RequestKindType,
  service?: string
}
