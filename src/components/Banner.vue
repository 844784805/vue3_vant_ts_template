<template>
  <div class="banner">
    <swiper :pagination="{ clickable: true }">
      <swiper-slide v-for="(item, index) in banner" :key="index">
        <img :src="item.pic" alt="" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getBannerData } from '@/api/index'

interface Banner {
  banners: [];
  code: number;
}

export default defineComponent({
  name: 'Banner',
  setup () {
    const banner = ref([])
    const initBannerData = async () => {
      const res = (await getBannerData()) as Banner | undefined
      console.log(res)

      if (res?.banners) {
        banner.value = res?.banners
      }
    }
    onMounted(() => {
      initBannerData()
    })
    return {
      banner
    }
  }
})
</script>

<style scope lang="less">
.banner {
  .swiper-slide {
    padding:0 15px;
    img {
      width: 100%;
      border-radius: 8px;
    }
  }
}
</style>
