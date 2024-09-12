/* eslint-disable no-prototype-builtins */
// 用於繼承

export class SearchStruct {
  pageNo: number;
  pageSize: number;
  totalCount: number;
  totalPage: number;
  items: any;
}

export class GameList {
  id: number;
  gameId: number;
  name: string;
  isOpen: boolean;
  betLimit: number;
  type: number;
  allowCancelBet: boolean;
  preDrawCode: string; //當期开奖号码
  preDrawIssue: string; //上期开奖期号
  lastIssue: string; //上期开奖号码
  // 自己捏 对应websocket
  coutdownTime: string;
  closeBet: boolean;
  betStatus: string;
  constructor() {
    this.coutdownTime = "00:00";
    this.closeBet = false;
  }
}

export class GameOddsList {
  gameId: number;
  gameType: number;
  gameName: string;
  ruleId: number;
  name: string;
  oddsId: number;
  odds: string;
  singleBetMin: number;
  singleBetMax: number;
  issueBetMax: number;
  oddsLimit: string;
}

// 投注记录
export class GameHistory {
  issue: string;
  gameId: number;
  type: number;
  result: string;

  get dtStr() {
    const resultArr = this.result.split(",").map(Number);
    if(this.type === 1){
      if (resultArr[0] === resultArr[4]) return "和";
      else return resultArr[0] > resultArr[4] ? "龙" : "虎";
    }
    else {
      return resultArr[0] > resultArr[resultArr.length -1] ? "龙" : "虎";
    }
  }

  get dt() {
    const resultArr = this.result.split(",").map(Number);
    if (this.type === 2) {
      return [resultArr[0] > resultArr[9] ? 1 : 0, resultArr[1] > resultArr[8] ? 1 : 0, resultArr[2] > resultArr[7] ? 1 : 0, resultArr[3] > resultArr[6] ? 1 : 0, resultArr[4] > resultArr[5] ? 1 : 0];
    } else {
      return [resultArr[0] > resultArr[resultArr.length -1] ? 1 : 0];
    }
  }
  get bigSmall() {
    const resultArr = this.result.split(",").map(Number);
    if (this.type === 2) return this.sumFS >= 12;
    else if (this.type === 3) return resultArr[0] >= 5;
    else return this.sumFS >= 22;
  }
  get singleDouble() {
    if (this.type === 3) {
      const resultArr = this.result.split(",").map(Number);
      return resultArr[0] % 2 === 0;
    } else {
      return this.sumFS % 2 === 0;
    }
  }
  get sumFS() {
    const resultArr = this.result.split(",").map(Number);
    if (this.type === 2) return resultArr[0] + resultArr[1];
    else {
      let sum = 0;
      resultArr.forEach((item) => (sum += item));
      return sum;
    }
  }
}

// export class BetSlipsItem {
//   // 游戏id
//   gameId: number;
//   // 玩法对应
//   gameRulesId: number;
//   // 玩法对应
//   selectionId: number;
//   // 游戏期数
//   issue: string;
//   // 下注时间
//   createdAt: number;
//   // 输赢 0: 输 1: 赢
//   isWin: number;
//   // 下注金额
//   betAmount: string;
//   // 盈亏
//   winAmount: string;
//   // 状态 0: 未结算 1: 赢
//   status: number;
//   // 赛果
//   result: string;
//   // 冠亚军及其他名次判定
//   selection: Array<number>;
//   // 龙虎
//   dt: Array<number>;
//   id: string;
//   betSlipsId: string;
//   index: number;
//   userId: number;
//   agentId: number;
//   odds: string;
//   betType: number;
//   updatedAt: number;
//   // 以下自己捏的
//   // 展开游戏结果
//   showResult: boolean;
//   // 注单结果list
//   gameResultList: {
//     gameResultArr: Array<string>;
//     gameResult: string;
//     gameResultDragonTiger: string;
//   }[];
// }

export class BaseBetSlipsItem {
  agentId: number;
  betAmount: number;
  betNum: string;
  betType: number;
  createdAt: number;
  dt: number[];
  gameId: number;
  gameType: number;
  id: number;
  isWin: number;
  issue: number;
  odds: number;
  playType: number;
  price: number;
  result: string;
  status: number;
  updatedAt: number;
  userId: number;
  username: string;
  winAmount: number;
}

// 下注纪录
export class DrawInfo {
  issue: number;
  status: number;
  totalBets: number;
  totalWin: number;
  result: string;
  betRecords: {
    agentId: number;
    betAmount: number;
    betNum: string;
    betType: number;
    createdAt: number;
    gameId: number;
    gameType: number;
    id: number;
    isWin: number;
    issue: number;
    odds: number;
    playType: number;
    price: number;
    result: string;
    status: number;
    updatedAt: number;
    userId: number;
    username: string;
    winAmount: number;
  }[];
  // 自己捏的
  showDetails: boolean;
}

export class GameRecordDrawInfo extends SearchStruct {
  declare items: GameRecordDrawInfoDetails[];
}

// 錢包紀錄下注纪录內層資料
export class GameRecordDrawInfoDetails {
  agentId: number;
  betAmount: number;
  betNum: string;
  betType: number;
  createdAt: number;
  dt: number[];
  gameId: number;
  gameType: number;
  id: number;
  isWin: number;
  issue: number;
  odds: number;
  playType: number;
  price: number;
  result: string;
  status: number;
  updatedAt: number;
  userId: number;
  username: string;
  winAmount: number;
  // 自己捏的
  showResult: boolean = false;

  constructor(data: GameRecordDrawInfoDetails) {
    if (data) {
      Object.keys(data).forEach((key) => {
        if (this.hasOwnProperty(key)) {
          this[key] = data[key];
        }
      });
    }
  }

  get dtStr() {
    const resultArr = this.result.split(",").map(Number);
    if(this.gameType === 1){
      if (resultArr[0] === resultArr[4]) return "和";
      else return resultArr[0] > resultArr[4] ? "龙" : "虎";
    }
    else {
      return resultArr[0] > resultArr[resultArr.length -1] ? "龙" : "虎";
    }
  }

  get bigSmall() {
    if (this.gameType === 2) return this.sumFS >= 12;
    else return this.sumFS >= 22;
  }
  get singleDouble() {
    return this.sumFS % 2 !== 0;
  }
  get sumFS() {
    const resultArr = this.result.split(",").map(Number);
    if (this.gameType === 2) return +resultArr[0] + +resultArr[1];
    else {
      let sum = 0;
      resultArr.forEach((item) => (sum += item));
      return sum;
    }
  }
}

// 競猜報告列表 取得
export class GetGuessReportList {
  totalCount: number;
  totalBetAmount: number;
  totalWinAmount: number;
  totalPlayResult: number;
  totalRebate: number;
  totalBonus: number;
  bettingInfo: {
    gameId: number;
    count: number;
    betAmount: number;
    winAmount: number;
    rebate: number;
    bonus: number;
    playResult: number;
    betRecords: GameRecordDrawInfoDetails[];
  }[];
}

export class CustomGameInfo {
  id: number;
  name: string;
  issue: string;
  timer: string;
  lastResult: string;
  // sumFS: number;
  doubleSingle: boolean;
  // bigSmall: boolean;
  isOpen: boolean;
  betLimit: number;
  allowCancelBet: boolean;
  preDrawCode: string;
  preDrawIssue: string;
  lastIssue: string;
  coutdownTime: string;
  closeBet: boolean;
  sum: number;
  // constructor() {
  //   if (game.value) {
  //     Object.keys(game.value).forEach((key) => {
  //       if (this.hasOwnProperty(key)) {
  //         this[key] = game.value[key];
  //       }
  //     });

  //     this.sumFS = parseInt(this.preDrawCode.split(',')[0]) + parseInt(this.preDrawCode.split(',')[1]);
  //     this.bigSmall = this.sumFS >= 12;
  //     this.doubleSingle = this.sumFS % 2 === 0;
  //   }
  // }
}

export class ChatMessage {
  profileImg: string;
  userId: number;
  username: string;
  type: number;
  isHost: boolean;
  message: string;
  createdAt: number;
  // 為了確認圖片是否正確載入
  imgLoad: boolean;
}

export interface LongDragon {
  location: string;
  result: string;
  count: number;
}

// ----------------

// 下注资料
export class BetSlip {
  gameId: number;
  agentId: number;
  issue: number;
  gameRuleIds: Array<number>;
  selection: Array<Array<number>>;
  amount: number;
  constructor() {
    this.amount = 0;
    this.gameRuleIds = [];
    this.selection = [];
  }
}

export class NewBetSlip {
  gameId: number;
  agentId: number;
  issue: number;
  betArr: {
    playType: number;
    betType: number;
    amount?: number;
    betNum?: string;
  }[];
  // betType: number;
  // selection: Array<Array<number>>;
  // amount: number;
  constructor() {
    this.betArr = [];
  }
}

export interface EnterRoom {
  allowEnterRoom: boolean;
  subAgentLevel: number;
  promoCode: string;
  agentId: number;
}
