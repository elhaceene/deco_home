<script setup lang="ts"></script>

<template>
  <div class="container sponsors">
    <img src="/public/sponsors/ikea.svg" alt="Ikea logo" width="89" height="32">
    <img src="/public/sponsors/havertys.svg" alt="Havertys logo" width="228" height="32">
    <img src="/public/sponsors/wayfair.svg" alt="Wayfair logo" width="146" height="32">
    <img src="/public/sponsors/furniture_brands.svg" alt="Fourtiture logo" width="172" height="32">
  </div>
</template>

<style lang="scss" scoped>

.sponsors{
  margin-bottom: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
  flex-wrap: wrap;

  @media (max-width : $tablet){
    margin-bottom: 60px;
    gap: 60px;
  }

  @media (max-width : $phone){
    margin-bottom: 100px;
    gap: 32px;
  }


}


</style>
