<template>
  <HeaderNavBar />
  <Banner />
  <SwiperItemLayout />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import HeaderNavBar from '@/components/common/HeaderNavBar.vue'
import SwiperItemLayout from '@/components/common/SwiperItemLayout.vue'
import Banner from '@/components/Banner.vue'

export default defineComponent({
  name: 'App',
  components: {
    HeaderNavBar,
    Banner,
    SwiperItemLayout
  },
  setup () {
    return {}
  }
})
</script>

<style scope lang="less"></style>
