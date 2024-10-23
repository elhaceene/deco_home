<script setup lang="ts">
const {t} = useI18n();
const localePath = useLocalePath();

interface product {
  id : number,
  category : string;
  name : string;
  price : number,
  img : string;
  sale? : number;

}

const props = defineProps({
  product: {
    type: Object as () => product,
    required: true, 
  },

});

const category = computed(()=>{
  if (props.product.category === "chair"){
  return t('common.chair');
}else if (props.product.category === "couch"){
  return t('common.couch');
}else if (props.product.category === "lamp"){
  return t('common.lamp');
}else if (props.product.category === "table"){
  return t('common.table');
}else {
  return t('common.bed');
}
});

const sale = computed(()=>{
  if (!props.product.sale){
    return 0;
  }

 return props.product.sale * 100;
});


const price = computed(()=>{

  if (!props.product.sale){
    return props.product.price;
  }
  const amontToSale = props.product.price * props.product.sale;

  return props.product.price - amontToSale;
});


</script>

<template>
  <nuxt-link :to="localePath('/products/'+ product.id)" class="product">
    <span class="img-container">
      <img :src="product.img" :alt="product.name">
      <span v-if="product.sale" class="tag">
        {{ sale }}% {{ $t('common.reduction') }}
      </span>
    </span>

    <span class="body">

      <span class="title-container">
        <span class="title">
          {{ product.name }}
        </span>
        <span class="category">
          {{ category }}
        </span>
      </span>

      <span class="price-container">
        <span class="price">
          {{ price }} DZD
        </span>
        <span v-if="product.sale" class="old-price">
          {{ product.price }} DZD
        </span>
      </span>

    </span>
  </nuxt-link>
</template>

<style lang="scss" scoped>

.product{
  width: calc((100% / 3) - 16px);
  display: flex;
  flex-direction: column;
  gap: 16px;


  @media (max-width:$tablet){
    width: calc((100% / 2) - 16px);
  }

  @media (max-width:$phone){
    width: 100%;
  }

  .img-container{
    width: 100%;
    height: 400px;
    border-radius: 20px 20px 0 0;
    position: relative;
    overflow: hidden;

    img{
      width: 100%;
      border-radius: 20px 20px 0 0;
      object-fit: cover;
      object-position: center;
    }

    .tag{
      position: absolute;
      top: 24px;
      left: 24px;
      
    }

  }

  .body{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0 16px;

    .title-container, .price-container{
      display: flex;
      flex-direction: column;
      gap: 6px;
    

    .title, .price{
      @include text-lg;
        font-weight: 500;
        color: $black;
    }

    .category, .old-price{
        @include text-sm;
        font-weight: 500;
        color: $neutral100;
      }

    .old-price{
        text-decoration: line-through;
      }
    }
  }

  &:hover{
    .img-container img{
      transform: scale(1.1);
    }
    .body .title{
      color: $accent300;
    }
  }
}

  





</style>
