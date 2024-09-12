import { ResponseType } from "./global.types";

// 登入、註冊 回傳
export interface LoginResType extends ResponseType {
  data: {
    token: string;
    expireTime: number;
  };
}

// 新增支付帳號 回傳
export interface AddUserAccountResType extends ResponseType {
  data: {
    Id: number;
    PaymentTypeId: number;
    BankCode: string;
    Account: string;
  };
}

// 取得支付帳戶 回傳
export interface GetUserAccountResType extends ResponseType {
  data: {
    Id: number;
    PaymentTypeId: number;
    PaymentTypeName: string;
    BankCode: string;
    Account: string;
  }[];
}

// 取得申請紀錄 回傳
export interface GetApplyRecordResType {
  data: {
    pageNo: number;
    pageSize: number;
    totalPage: number;
    totalCount: number;
    items: {
      amount: string;
      createdAt: number;
      id: number;
      number: string;
      paymentTypeId: number;
      status: string;
      transferType: string;
      updatedAt: number;
    }[];
  };
}

// 帳變紀錄 回傳
export interface PointChangeDataResType {
  data: {
    pageNo: number;
    pageSize: number;
    totalPage: number;
    totalCount: number;
    items: {
      id: number;
      userId: number;
      agentId: number;
      type: number;
      typeName: string;
      preTotalAmount: string;
      afterTotalAmount: string;
      amount: string;
      createdAt: number;
    }[];
  };
}

// 取得支付帳戶 回傳
export interface GetUserPaymentAccountType extends ResponseType {
  data: {
    id: number;
    paymentTypeId: number;
    paymentTypeName: string;
    // 帳號
    account: string;
    // 支付寶帳號
    qqId?: string;
    // 微信帳號
    wechatId?: string;
    // 銀行卡持有人
    cardholder?: string;
    // 銀行類型
    bankType?: string;
    // 銀行帳戶
    bankCode?: string;
    // 開戶地址
    address?: string;
  };
}

export interface UserRedBagList extends ResponseType {
  data: {
    items: {
      balance: number;
      createdAt: number; // 創建時間
      memo: string; // 備註
      redAmount: number; // 紅包金額
      redBagId: number; // 紅包數量
      userId: number;
    }[];
    pageNo: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
    totalRedAmount: number; // 紅包總金額
  };
}

// 福利報表 回傳
export interface WelfareReportResType {
  data: {
    pageNo: number;
    pageSize: number;
    totalPage: number;
    totalCount: number;
    items: {
      afterTotalAmount: string;
      agentId: number;
      amount: string;
      createdAt: number;
      id: number;
      preTotalAmount: string;
      type: number;
      typeName: string;
      userId: number;
    }[];
  };
}

// 代理報表 回傳
export class GetAgentReportList {
  data: {
    pageNo: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
    items: {
      userId: number;
      nickname: string;
      commissionRate: number;
      rebateCommission: number;
      unpaidAmount: number;
    }[];
  };
}
