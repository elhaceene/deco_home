<script setup lang="ts">
  const localePath = useLocalePath();
</script>

<template>
  <div class="mobile-menu">
   <div class="header">
    <nuxt-link :to="localePath('/')" :title="$t('common.home')" >
    <img src="/public/logo.svg" alt="Logo Decohome" width="172" height="32">
    </nuxt-link>
    <button type="button" class="btn-square md" @click="$emit('close-mobile-menu')">
      <Icon name="heroicons:x-mark" />
    </button>
   </div>

   <div class="links">
    <nuxt-link :to="localePath('/')" :title="$t('common.home')" 
    class="link base lg" @click.enter="$emit('close-mobile-menu')" >{{$t("common.home")}}</nuxt-link>

    <nuxt-link :to="localePath('/faq')" :title="$t('common.faq')" 
    class="link base lg" @click.enter="$emit('close-mobile-menu')" >{{$t("common.faq")}}</nuxt-link>
  </div>

  </div>
</template>

<style lang="scss" scoped>
.mobile-menu{
  width: 100%;
  height: 100vh;
  background-color: white;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  padding: 16px;
  display: flex;
    flex-direction: column;
    gap: 60px;
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .links{
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
}


</style>
