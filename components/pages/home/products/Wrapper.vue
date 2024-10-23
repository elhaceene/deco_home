<script setup lang="ts">
import productsData from "public/data/products.json";
import Product from "./product.vue";
const activeCategory = ref("chair");
const products = computed(()=>{
  return productsData.filter((Product)=> Product.category === activeCategory.value
);
});

</script>

<template>
  <div class="container products-wrapper">
    <h6 class="title">{{ $t('common.ourProducts') }}</h6>


    <!--Filters-->
    <div class="filters">

      <button type="button" title="filtrer" class="btn-filter" :class="{active:activeCategory === 'chair'}" @click="activeCategory = 'chair'" >{{ $t('common.chair') }}</button>

      <button type="button" title="filtrer" class="btn-filter" :class="{active:activeCategory === 'table'}" @click="activeCategory = 'table'" >{{ $t('common.table') }}</button>

      <button type="button" title="filtrer" class="btn-filter" :class="{active:activeCategory === 'couch'}" @click="activeCategory = 'couch'" >{{ $t('common.couch') }}</button>

      <button type="button" title="filtrer" class="btn-filter" :class="{active:activeCategory === 'lamp'}" @click="activeCategory = 'lamp'" >{{ $t('common.lamp') }}</button>

      <button type="button" title="filtrer" class="btn-filter" :class="{active:activeCategory === 'bed'}" @click="activeCategory = 'bed'" >{{ $t('common.bed') }}</button>
      
    </div>


    <!--Products-->
    <div class="products">
    <PagesHomeProductsProduct v-for="(product, i) in products"  :key="i" :product="product" />

    </div>

  </div>
</template>

<style lang="scss" scoped>
.products-wrapper{
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 120px;
  @media (max-width:$phone){
    margin-bottom: 100px;
  }

  .title{
    @include heading4;
    font-weight: 500;
    text-align: center;
  }
  .filters{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
  .products{
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;
    flex-wrap: wrap;

  }
}



</style>
