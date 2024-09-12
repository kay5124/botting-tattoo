/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
// import i18n from "@/plugins/i18n";
import { api as viewerApi } from "v-viewer";

/*干扰线的随机x坐标值*/
const lineX = () => Math.floor(Math.random() * 150);
/*干扰线的随机y坐标值*/
const lineY = () => Math.floor(Math.random() * 150);
//干扰点颜色
const sColor = ["#B22222", "#F9F900", "#82D900", "#FFAF60"];
//文字颜色
const fColor = ["#000079", "#006030", "#820041", "#4B0091"];
//颜色组序号
let indexColor: number = 0;

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const randColor = () => {
  indexColor = Math.floor(Math.random() * sColor.length); //乱数取得 0~颜色阵列长度
};

/*生成6位随机数*/
export const genRandCode = () => {
  let code: string = "";
  // 大小写英文 数字 排除 I l o O 0  ,并重複数字 增加出现机率
  const str = "123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789";
  const arr = str.split("");
  let ranNum;
  for (let i = 0; i < 4; i++) {
    ranNum = Math.floor(Math.random() * 66); //随机数在[0,65]之间
    code += arr[ranNum];
  }
  return code.toLowerCase();
};

/*更换内容*/
export const changeCaptchaCode = (code, imgObj, captchaCanvas, cxt) => {
  //重设canvas内容
  if (!captchaCanvas.value || !cxt) return;

  captchaCanvas.value.width = 100;
  captchaCanvas.value.height = 38;

  //var i=randColor(); //执行randColor()取得颜色组序号
  //alert(i);

  //选取底图范围
  cxt.drawImage(imgObj, lineX(), lineY(), 100, 38, 0, 0, 100, 38);

  /*生成干扰线2条*/
  for (var j = 0; j < 2; j++) {
    //产生一个新路径，产生后再使用绘图指令来设定路径
    //若省略beginPath，则每点击一次验证码会累积干扰线的条数
    cxt.beginPath();
    randColor();
    cxt.strokeStyle = sColor[indexColor];
    cxt.moveTo(0, lineY()); //起始点座标
    cxt.lineTo(100, lineY()); //从起始点画一条直线到指定的(x, y)座标点
    cxt.lineWidth = (Math.floor(Math.random() * (20 - 10 + 1)) + 10) / 10; //乱数 取得介于1~2之间的值
    cxt.stroke();
    cxt.closePath();
  }
  //
  //cxt.beginPath();
  randColor();
  cxt.fillStyle = fColor[indexColor]; //随机文字颜色
  cxt.font = "bold 25px Verdana";

  cxt.fillText(code, 10, 30); //把rand()生成的随机数文本填充到canvas中
};

export const showNotify = (quasar, color, msg, timeout: number = 1500) => {
  let icon = "info";
  if (color === "red") icon = "error";
  else if (color === "green") icon = "task_alt";

  quasar.notify({
    icon: icon,
    color: color,
    message: msg,
    position: "top",
    timeout,
  });
};

// 共用图片路径
export const getImageUrl = (router) => {
  return new URL(`../assets/${router}`, import.meta.url).href;
};

export const converStrToHtml = (content) => {
  var urlReg = /https?:\/\/(www\.)?(?![^" ]*(?:swf|gif|jpg|bmp|jpeg|png))([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=+]*))/gm;
  var imgReg = /(http(s?):)([/|.|\w|\s|-])*\.(?:swf|gif|jpg|bmp|jpeg|png)/gm;
  var brReg = new RegExp("\n", "g");
  return content ? content.replace(imgReg, '<img class="ContentImg" src="$&" />').replace(urlReg, '<a target="_blank" rel="noreferrer" href="$&">$&</a>').replace(brReg, "<br>") : "";
};

export const showImage = (images: string[]) => {
  viewerApi({
    options: {
      toolbar: false,
    },
    images,
  });
};
