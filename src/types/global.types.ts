// 回傳資料固定格式，用來給回傳資料做繼承
export interface ResponseType {
  code: number;
  data: any;
  msg: string;
}

// 取得支付類型 回傳
export interface GetPaymentTypeResType extends ResponseType {
  data: {
    id: number;
    code: string;
    name: string;
  }[];
}

// 取得房主收、付款帳戶
export interface GetOwnerPaymentAccountResType extends ResponseType {
  id: number;
  paymentTypeId: number;
  paymentTypeName: string;
  account: string;
  wechatId: string;
  qqId: string;
  bankType?: string;
  cardholder?: string;
  address?: string;
}
