// 取得銀行列表 捏資料
export class NewBankList {
  value: string;
  label: string;
}

// 取得支付類型 捏資料
export class NewPaymentType {
  depositType: number;
  name: string;
  isSelect: boolean;
  icon?: string;
}

export class RoomSettings {
  appShowFlow: boolean;
  betConfirmationBan: boolean;
  chatBan: boolean;
  predictionDisplayBan: boolean;
  redPacketDisplayBan: boolean;
  webHeaderKeyboard: boolean;
}
