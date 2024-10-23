<script setup lang="ts">
const {locale} = useI18n();
const switchLocalPath = useSwitchLocalePath();

</script>

<template>
  <div class="dropdown">
    <nuxt-link :to="switchLocalPath ('fr')" title="Francais" class="btn-dropdown" :class="{active:locale ==='fr'}">
      Français
    </nuxt-link>

    <nuxt-link :to="switchLocalPath ('en')" title="English" class="btn-dropdown" :class="{active:locale ==='en'}">
      English
    </nuxt-link>
    
    <nuxt-link :to="switchLocalPath ('ar')" title="العربية" class="btn-dropdown" :class="{active:locale ==='ar'}">
      العربية
    </nuxt-link>
  </div>
</template>

<style lang="scss" scoped>

.dropdown{
  position: absolute;
  right: -10px;
  top: calc(100% + 4px);
}

</style>
