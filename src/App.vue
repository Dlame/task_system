<template>
  <div id="app">
    <keep-alive :include="keepAliveComponents">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapState(['keepAliveComponents']),
  },
};
</script>
