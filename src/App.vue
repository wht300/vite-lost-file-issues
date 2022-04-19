<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <keep-alive v-if="route.meta.keepAlive">
        <component :is="Component" :key="route.path || undefined" />
      </keep-alive>
      <component :is="Component" v-else :key="route.path || undefined" />
    </transition>
  </router-view>
</template>
<script>
import { defineComponent } from 'vue-demi';
import developerMock from './plugins/developer-mock.js';

export default defineComponent({
  name: 'App',
  beforeCreate() {
    developerMock();
  },
});
</script>
