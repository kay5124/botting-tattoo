export class Login {
  username: string;
  password: string;
}

export class Register {
  username: string;
  password: string;
  rePassword: string;
  code: string;
}

// 新增支付帳號 請求
export class AddUserAccountReqType {
  agentId: number;
  paymentTypeId: number;
  account: string;
  cardholder?: string;
  bankType?: string;
  address?: string;
  qqId?: string;
  wechatId?: string;
}

// 新增支付帳號 捏資料
export class NewAddUserAccountData {
  Id: number;
  PaymentTypeId: number;
  BankType: string;
  Account: string;
}

// 取得支付帳戶 捏資料
export class NewGetUserAccountData {
  PaymentTypeId: number;
  Account: string;
}

// 取得申請紀錄 捏資料
export class NewGetApplyRecordData {
  transferType: string;
  createdAt: number;
  amount: string;
  status: string;
}

export class GetGameRecoedReqType {
  agentId: number;
  gameId: number;
  pageNo: number;
  pageSize: number;
  startTime: number;
  endTime: number;
}

// 上下分申請 請求
export class ApplyDepositWithdrawReqType {
  agentId: number;
  paymentTypeId: number;
  transferType: number;
  amount: string;
}

// 申請紀錄 請求
export class GetApplyRecordReqType {
  startTime: number;
  endTime: number;
  agentId: number;
  pageNo?: number;
  pageSize?: number;
}

// 用戶資料
export class UserData {
  id: number;
  username: string;
  lastLoginAt: number;
  memo: string;
  nickName: string;
  phone: string;
  profileImg: string;
  qq: string;
  // userInfo: {
  //   memo: string;
  //   nickName: string;
  //   phone: string;
  //   profileImg: string;
  //   wechat: string;
  //   qq: string;
  //   userId: number;
  // };
}

// 錢包資料 取得
export interface UserWallet {
  agentId: number;
  balance: number;
  totalBetAmount: number;
  rebate: number;
  bonus: number;
  profitAndLoss: number;
  createdAt: number;
}

// 有注單的遊戲列表 取得
export interface GetGamesWithBets {
  id: number;
  name: string;
}

// 帳變資料 請求
export class GetPointChangeDataReqType {
  type?: number;
  agentId: number;
  startTime: number;
  endTime: number;
  pageNo: number;
  pageSize: number;
}

// 上、下分帳戶取得 請求
export class GetUserAccountReqType {
  PaymentTypeId: number;
  AgentId: number;
}

// 代理報表 請求
export class GetAgentReportReqType {
  pageNo: number;
  pageSize: number;
  // 暱稱/會員編號
  keyword?: string;
  filters?: {
    // 代理id
    agentId: number;
    startTime: number;
    endTime: number;
  };
}

// 福利報表 請求
export class GetWelfareReportReqType {
  agentId: number;
  // 福利報表篩選項目
  type?: number;
  pageNo: number;
  pageSize: number;
  startTime: number;
  endTime: number;
}
