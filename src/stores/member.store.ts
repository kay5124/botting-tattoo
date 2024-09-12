import { ResponseType } from "@/types/global.types";
import { UserData } from "../models/user";
import { defineStore } from "pinia";
import request from "../plugins/axios";
interface State {
  userData: UserData;
  roomId: number;
  promoCode: string;
  subAgentLevel: number;
}

export const useMemberStore = defineStore("useMemberStore", {
  state: (): State => ({
    userData: new UserData(),
    roomId: null,
    promoCode: null,
    subAgentLevel: 0,
  }),
  getters: {
    isLogin(state): boolean {
      return state.userData !== null && state.userData.username ? true : false;
    },
  },
  actions: {
    // 寫入Store 所以不用另外包
    getUserData() {
      return new Promise<ResponseType | null>((resolve) => {
        request
          .get("/getUserData")
          .then((res) => {
            const { data: r }: { data: ResponseType } = res;
            if (r.code === 0) {
              this.userData = { ...(r.data as UserData) };
              resolve(r);
            } else {
              resolve(null);
            }
          })
          .catch((err) => {
            const { data: r }: { data: ResponseType } = err.response;
            resolve(r);
          });
      });
    },
  },
});
