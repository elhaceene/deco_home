<script setup lang="ts">
const ShowMobileMenu = ref (false);

</script>

<template>
  <LayoutMobileMenu v-if="ShowMobileMenu" @close-mobile-menu="ShowMobileMenu=false" />
  <LayoutNavbar @open-mobile-menu="ShowMobileMenu=true" />
  <div class="container">
    
    <slot />
  </div>

  <LayoutFooter/>
</template>

<style scoped></style>
