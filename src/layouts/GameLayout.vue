<!-- Script -->

<script setup lang="ts">
import { Vue3Marquee } from 'vue3-marquee';

const route = useRoute();
const router = useRouter();
</script>

<!-- PageContent -->

<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <q-icon name="west" class="tw-absolute tw-left-2 tw-top-3 tw-text-2xl tw-text-white" @click="router.back()" />
          <small>
            {{ route.name === 'GameLobby' ? '游戏大厅' : '' }}
          </small>
        </q-toolbar-title>
      </q-toolbar>
      <div class="bg-blue py-2">
        <div class="mx-5 px-2 rounded-xl d-flex align-center" style="background: rgba(255, 255, 255, 0.2)">
          <q-icon class="mr-1" size="md" name="campaign" />
          <Vue3Marquee class="tw-text-[white]" :gradient-length="'100px'">
            <p class="tw-mx-4">testtesttesttesttesttesttesttest</p>
          </Vue3Marquee>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
      <!-- <KeepAlive :include="['GameLobby']">
        <router-view />
      </KeepAlive> -->
      <!-- <router-view v-slot="{ Component }">
        <keep-alive :include="'GameLobby'">
          <component :is="Component" />
        </keep-alive>
      </router-view> -->
    </q-page-container>

    <q-footer class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<!-- Css -->

<style lang=""></style>
