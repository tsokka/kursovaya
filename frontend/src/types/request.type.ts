export type RequestType = {
  name: string,
  phone: string,
  type: 'order' | 'consultation',
  service?: string
}
