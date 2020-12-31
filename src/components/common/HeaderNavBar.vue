<template>
  <van-nav-bar
    title="标题"
    left-text="返回"
    right-text="按钮"
    left-arrow
    :placeholder="true"
    :fixed="true"
    :z-index="999"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderNavBar',
  setup () {
    return {}
  }
})
</script>

<style scope lang="less"></style>
