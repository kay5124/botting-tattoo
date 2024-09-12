export interface WebSocketMessage {
  event: string;
  data: any;
}

export interface WebSocketGameInfo {
  gameId: number;
  issue: number;
  leftTime: number;
  formatLeftTime: string;
  result: string;
  status: number;
}

export interface WebSocketBalanceChangeData {
  agentId: number;
  balance: number;
  userId: number;
}

export interface WebSocketBetStatistics {
  profitLoss: number;
  rebate: number;
  totalBetAmount: number;
  userId: number;
  agentId: number;
}

export interface WebSocketExitRoom {
  agentId: number;
  userId: number;
  msg: string;
}
