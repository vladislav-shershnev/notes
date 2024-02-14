<script setup>
import { onMounted } from 'vue';
import NavBar from '@/components/layout/NavBar.vue';
import { useStoreAuth } from '@/stores/storeAuth';

// STORE
const storeAuth = useStoreAuth()

// при монтировании приложения запускать авторизацию
onMounted(() => {
  storeAuth.init()
})

</script>

<template>
  <NavBar />
  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<style>
@import 'bulma/css/bulma.min.css';

@media (min-width: 1023px) {
  #app {
    display: block;
    padding: 0;
  }

  body {
    display: block;
  }
}
@media (max-width: 1023px) {
  #app {
    padding: 0;
  }
}
</style>
