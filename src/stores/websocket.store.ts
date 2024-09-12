import { defineStore } from "pinia";
import { store } from "../stores/store";
import { UserData } from "@/models/user";
import { useWebSocket } from "@vueuse/core";
import { useMemberStore } from "@/stores/member.store";
import { Dialog, Loading } from "quasar";
import router from "../router/router";
import i18n from "../plugins/i18n";
import dayjs from "dayjs";
import { sleep } from "@/utils/globalFns";

const ws_ip = import.meta.env.VITE_WS_URL;

interface State {
  ws: WebSocket | null;
  // 连接状态
  isConnected: boolean;
  // 消息内容
  message: string;
  // 重连次数
  reconnectTimes: 0;
  // 重连尝试次数
  reconnectMaxTimes: number;
  // 重新连接错误
  reconnectError: boolean;
  // 心跳消息发送时间
  heartBeatInterval: number;
  // 心跳定时器
  heartBeatTimer: number;
  // 確認心跳有無成功
  heartBeatSuccess: boolean;
  // 强制断开连接
  forceDisconnect: boolean;
  wsInstance: any;
}

let hasDialogBeenShown = false;
const ShowCloseDialog = (closeType = 0) => {
  if (hasDialogBeenShown) return;

  hasDialogBeenShown = true;

  const memberInfo = useMemberStore();
  memberInfo.userData = new UserData();
  // localStorage.removeItem('token');
  // 多语系 预留
  // const { t } = i18n.global;

  Dialog.create({
    message: closeType === 0 ? "请重新登入！" : "连接已关闭，请稍后再试！",
    class: "rounded-lg text-center CustomDialog",
    style: "max-width:350px;",
    ok: "确认",
    persistent: true,
  }).onDismiss(() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
    hasDialogBeenShown = false;
  });
};

export const useSocketStore = defineStore({
  id: "socket",
  state: (): State => ({
    ws: null,
    // 连接状态
    isConnected: false,
    // 消息内容
    message: "",
    // 重连次数
    reconnectTimes: 0,
    // 重连尝试次数
    reconnectMaxTimes: 99999999,
    // 重新连接错误
    reconnectError: false,
    // 心跳消息发送时间
    heartBeatInterval: 15 * 1000,
    // 心跳定时器
    heartBeatTimer: 0,
    // 確認心跳有無成功
    heartBeatSuccess: false,
    // 强制断开连接
    forceDisconnect: false,
    wsInstance: null as ReturnType<typeof useWebSocket> | null,
  }),
  actions: {
    // 连接打开
    Connect(url: string) {
      if (this.forceDisconnect) {
        console.log("WebSocket连接已被强制关闭，不再重连");
        return;
      }

      const reconnectMaxTimes = this.reconnectMaxTimes;

      this.wsInstance = useWebSocket(url || `${ws_ip}?token=${localStorage.getItem("token") || ""}`, {
        autoReconnect: {
          retries: this.forceDisconnect ? 0 : reconnectMaxTimes,
          delay: 1000,
          onFailed() {
            console.log(`连线不上WebSocket，已尝试 ${reconnectMaxTimes} 次，请检查网络连接是否正常。`);
            // ShowCloseDialog();
          },
        },
        onConnected: this.SOCKET_ONOPEN,
        onMessage: this.SOCKET_ONMESSAGE,
        onError: this.SOCKET_ONERROR,
        onDisconnected: this.SOCKET_ONCLOSE,
      });

      // 5秒后确认ws连线是否成功
      // setTimeout(() => {
      //   if (!this.ws) {
      //     console.log("WebSocket connection timed out!!!");
      //     close();
      //     ShowCloseDialog();
      //   }
      // }, 5 * 1000);
    },
    async SOCKET_ONOPEN(ws: WebSocket) {
      this.ws = ws;
      this.reconnectTimes = 0;
      this.isConnected = true;
      ws.send("fuck");
      console.log("websocket 已连接");
      Loading.hide();
    },
    // 连接关闭
    SOCKET_ONCLOSE(ws: WebSocket, event: Event) {
      Loading.show();
      this.isConnected = false;
      // 连接关闭时停掉心跳消息
      window.clearInterval(this.heartBeatTimer);
      this.heartBeatTimer = 0;
      // this.ws = null;
      console.log("连接已断开: " + new Date(), event);
      // ws.close();
      // ShowCloseDialog();
      this.forceDisconnect = false; // 重置强制断开标志
    },
    // 发生错误
    SOCKET_ONERROR(ws: WebSocket, event: Event) {
      Loading.show();
      console.log("socket error:", event);
      // ShowCloseDialog();
    },
    // 收到服务端发送的消息
    SOCKET_ONMESSAGE(ws: WebSocket, message: MessageEvent) {
      function isJSON(str) {
        if (typeof str === "string") {
          try {
            JSON.parse(str);
            return true;
          } catch (e) {
            return false;
          }
        }
      }

      if (message.data === "you") {
        this.heartBeatSuccess = true;
        // 连接成功时启动定时发送心跳消息，避免被服务器断开连接
        if (this.heartBeatTimer === 0) {
          this.heartBeatTimer = window.setInterval(() => {
            //
            if (this.heartBeatSuccess) {
              this.ws.send("fuck");
              this.heartBeatSuccess = false;
            } else {
              console.log("沒收到 you 斷開");

              ws.close();
              ShowCloseDialog();
            }
          }, this.heartBeatInterval);
        }
      } else {
        if (isJSON(message.data)) this.message = message.data;
      }
    },
    // 添加新的action来强制断开连接
    forceClose(showDialog = true) {
      this.forceDisconnect = true;
      if (this.wsInstance) {
        this.wsInstance.close();
        this.wsInstance = null;
      }
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
      window.clearInterval(this.heartBeatTimer);
      this.heartBeatTimer = 0;
      this.isConnected = false;

      if (showDialog) ShowCloseDialog(1);
    },
  },
});

// Need to be used outside the setup
export function useSocketStoreWithOut() {
  return useSocketStore(store);
}
