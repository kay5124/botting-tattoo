import { GameList } from "@/models/game";
import { defineStore } from "pinia";
import { ResponseType } from "@/types/global.types";
import request from "@/plugins/axios";
import { RoomSettings } from "@/models/global";
interface State {
  lang: string | null;
  gameList: GameList[];
  roomSettings: RoomSettings;
  audioPlayer: HTMLAudioElement | null;
}

export const useGlobalStore = defineStore("useGlobalStore", {
  state: (): State => ({
    lang: "zh-CN",
    gameList: Array<GameList>(),
    roomSettings: null,
    audioPlayer: null,
  }),
  getters: {},
  actions: {
    async GetRoomSettings(roomNum: number) {
      const { data: res }: { data: ResponseType } = await request.awaitGet("/getRoomSettings", { agentId: roomNum });
      if (res.code === 0) {
        this.roomSettings = res.data as RoomSettings;
      }
    },
    ChangeLang(lang) {
      this.lang = lang;
    },
  },
});
