<template>
    <q-layout view="hHh lpr fff" style="overflow-x: hidden">
        <q-header class="text-white" style="background: transparent" height-hint="98" reveal>
            <q-toolbar>
                <q-toolbar-title class="bnrFont text-h5" style="font-weight: 800">Boting Tattoo</q-toolbar-title>
                <div class="q-gutter-x-sm">
                    <a href="//www.instagram.com/boting_tattoo/" target="_blank">
                        <img src="@/assets/images/ig.png" alt="FB" style="width: 20px; filter: invert(100%)" />
                    </a>
                    <a href="//www.facebook.com/botingtattoo" target="_blank">
                        <img src="@/assets/images/fb.png" alt="FB" style="width: 20px; filter: invert(100%)" />
                    </a>
                </div>
            </q-toolbar>
        </q-header>

        <q-page-container class="pt-0" style="overflow: hidden">
            <q-img :src="mainBg" :style="{ height: getScreenHeight() + 'px' }" fit="cover" spinner-color="white" spinner-size="82px" style="filter: grayscale(100%)">
                <div class="absolute-bottom-left ml-2 mb-12" style="background: transparent">
                    <h1 class="text-white bnrFont pa-0 ma-0" style="line-height: 80px">
                        Boting
                        <br />
                        <span style="margin-left: 85px">Tattoo</span>
                    </h1>
                </div>
                <div class="d-flex align-center full-width absolute-bottom-left justify-space-between ml-2 pr-8" style="background: transparent">
                    <span>彰化市</span>
                    <span>Changhua City</span>
                </div>
            </q-img>
            <!-- 介紹 -->
            <div style="padding-top: 72px" class="mx-3">
                <div class="">
                    <!-- 介紹 -->
                    <span class="text-white bnrFont" style="font-size: 1em; font-weight: 500">介紹</span>
                    <br />
                    <span class="bnrFont">Introduction</span>
                </div>
                <hr class="" style="border-color: rgba(241, 241, 241, 0.25)" />
                <div class="mt-5">
                    <p class="text-white bnrFont" style="font-size: 1.5em; font-weight: 500; line-height: 1em">專業的刺青工作室，提供各種風格的刺青服務。</p>
                    <p class="text-white bnrFont" style="font-size: 1.5em; font-weight: 500; line-height: 1em">
                        A professional tattoo studio, offering various tattoo styles to bring your tattoo dreams to life.
                    </p>
                </div>
            </div>
            <!-- 工作室圖片 -->
            <div style="padding-top: 30px" :class="$q.screen.width < 768 ? '' : 'pa-12'">
                <q-img @click="showImage([studio])" :src="studio" :ratio="16 / 9" spinner-color="white" spinner-size="82px" style="filter: grayscale(100%)" />
            </div>
            <!-- IG -->
            <div class="d-flex flex-column align-center justify-center mt-6">
                <div class="bnrFont text-h3 d-flex align-center justify-center">
                    <div style="height: 1px; width: 100vw; background: white" />
                    <div class="d-flex align-center justify-center mx-5">
                        <img src="@/assets/images/ig.png" alt="FB" style="width: 40px; filter: invert(100%)" class="mr-3" />
                        <span class="mt-1">Instagram</span>
                    </div>
                    <div style="height: 1px; width: 100vw; background: white" />
                </div>
                <div class="my-6">
                    <a href="//www.instagram.com/boting_tattoo" target="_blank">
                        <b class="bnrFont text-h6">@botingtattoo</b>
                    </a>
                </div>
            </div>
            <!-- 刺青作品 -->
            <div class="pb-12">
                <Vue3Marquee :gradient-length="'100px'" :duration="50">
                    <q-img @click="showImage(tattooList)" v-for="(item, index) in tattooList" :key="index" :src="item" width="8em" spinner-color="white" spinner-size="24px" class="mx-2" />
                </Vue3Marquee>
            </div>
            <!-- 地圖 -->
            <div class="mx-3">
                <div class="">
                    <!-- 介紹 -->
                    <span class="text-white bnrFont" style="font-size: 1em; font-weight: 500">位置</span>
                    <br />
                    <span class="bnrFont">Location</span>
                </div>
                <hr class="mb-4" style="border-color: rgba(241, 241, 241, 0.25)" />
                <div class="text-white bnrFont" style="font-size: 1.5em; font-weight: 500; line-height: 1em">
                    <p>
                        <a href="https://maps.app.goo.gl/jx4n1rJPRb8RibDm9" target="_blank" class="underline-animation">地址: 500彰化縣彰化市公園路一段127號</a>
                    </p>
                    <p>
                        <a href="https://maps.app.goo.gl/jx4n1rJPRb8RibDm9" target="_blank" class="underline-animation">Address: 500, Section 1, Gongyuan Rd., Changhua City, Changhua County</a>
                    </p>
                </div>
                <!-- <q-responsive :ratio="16 / 9" style="height: 300px">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d119080.71409940229!2d120.51238423042746!3d24.017446926753454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346939006c973273%3A0x716751863395aa2e!2sBOTING%20TATTOO!5e0!3m2!1szh-TW!2stw!4v1726041231307!5m2!1szh-TW!2stw"
                        style="border: 0"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </q-responsive> -->
            </div>
            <hr class="mb-12 mx-3" style="border-color: rgba(241, 241, 241, 0.25)" />
        </q-page-container>

        <q-footer style="background: transparent" class="mt-12 mx-3 pb-3">
            <div class="d-flex align-center justify-space-between">
                <small>
                    <b>
                        Design & Dev by
                        <br />
                        <a href="//www.linkedin.com/in/rayprofile/" target="_blank" style="text-decoration: underline;" class="underline-animation">Ray.</a>
                    </b>
                </small>
                <small>
                    <b>
                        All Rights Reserved.
                        <br />
                        ©2024
                    </b>
                </small>
            </div>
        </q-footer>
    </q-layout>
</template>
<script setup lang="ts">
// import mainBg from '@/assets/images/main_bg.jpg';
// import mainBg from '@/assets/images/main_bg01.jpg';
import mainBg from '@/assets/images/main_bg02.jpg';
import studio from '@/assets/images/studio.jpg';
import { showImage, getImageUrl } from '@/utils/globalFns';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const screenHeight = ref<number | null>(null);

const tattooList = [
    getImageUrl('images/tattoo/t1.jpg'),
    getImageUrl('images/tattoo/t2.jpg'),
    getImageUrl('images/tattoo/t3.jpg'),
    getImageUrl('images/tattoo/t4.jpg'),
    getImageUrl('images/tattoo/t5.jpg'),
    getImageUrl('images/tattoo/t6.jpg'),
    getImageUrl('images/tattoo/t7.jpg'),
    getImageUrl('images/tattoo/t8.jpg'),
    getImageUrl('images/tattoo/t9.jpg'),
    getImageUrl('images/tattoo/t10.jpg'),
    getImageUrl('images/tattoo/t11.jpg'),
    getImageUrl('images/tattoo/t12.jpg'),
    getImageUrl('images/tattoo/t13.jpg'),
    getImageUrl('images/tattoo/t14.jpg'),
    getImageUrl('images/tattoo/t15.jpg'),
    getImageUrl('images/tattoo/t16.jpg'),
    getImageUrl('images/tattoo/t17.jpg'),
    getImageUrl('images/main_bg.jpg'),
];

const getScreenHeight = () => {
    if (screenHeight.value === null) {
        screenHeight.value = $q.screen.height;
    }
    return screenHeight.value;
};
</script>
<style lang="scss" scoped>

* {
    color: white;
}

.bnrFont {
    font-family: 'Bebas Neue', sans-serif;
    font-weight: 300;
    font-style: normal;
    letter-spacing: 4px;
}

.q-parallax {
    height: 100vh;
}

:global(body) {
    margin: 0;
    padding: 0;
}

:global(html) {
    scroll-behavior: smooth;
}

.underline-animation {
    position: relative;
    text-decoration: none;

    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: white;
        transform: scaleX(0);
        transform-origin: bottom right;
        transition: transform 0.4s ease-out;
    }

    &:hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
}
</style>
