<template>
  <div class="swiper-item">
    <h2 class="swiper-item__title">
      <span class="left">栏目标题</span>
      <div class="more">更多</div>
    </h2>
    <div class="swiper-item__container">
      <swiper :slides-per-view="3.5">
        <swiper-slide v-for="item in 6" :key="item">
         <div class="swiper-item__list">
           <i class="left-icon"></i>
           <span class="right-text"></span>
            <img :src="require('@/assets/images/01.png')" alt="" />
            <p class="title van-multi-ellipsis--l2">文本,测试文本测试文本测试文本</p>
         </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SwiperItemLayout',
  setup () {
    return {}
  }
})
</script>

<style scope lang="less">
@import '~@/assets/style/mixin.less';
.swiper-item {
  margin: 15px auto;
}
.swiper-item__title {
  margin: 15px 15px 10px;
  font-size: 16px;
  line-height: 3;
  .border-1px(#f1f1f1, bottom);
  display: flex;
  justify-content: space-between;
  align-items: center;
  > .left {
    font-weight: bold;
  }
  > .more {
    height: 25px;
    line-height: 19px;
    font-size: 12px;
    padding: 3px 10px;
    .all-border-1px(#ccc, 12px);
  }
}
.swiper-item__container {
  .swiper-slide {
  }
  .swiper-item__list {
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    overflow: hidden;
    > .left-icon{}
    > .right-text{}
    > img{
      width: 100%;
      border-radius: 8px;
    }
    > .title{
      font-size: 12px;
      margin: 2px auto;
      line-height: 1.5;
      color: #333;
    }
  }
}
</style>
