<script lang="ts" setup>

import productsData from "public/data/products.json";

const route = useRoute();

const product = computed(()=>{
  return productsData.find((product)=>product.id === Number(route.params.id));
})



</script>


<template>
  <main>
    <PagesProduct v-if="product" :product="product" />
    <CommonNewsletter/>
  </main>
</template>



<style>

</style>