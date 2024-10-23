<script setup lang="ts">
import Product from './home/products/product.vue';

const toast = useToast();

const {t} = useI18n();


interface Product{
  id : number,
  category : string;
  description : string;
  name : string;
  price : number,
  img : string;
  sale? : number;

}

const props = defineProps({

  product : {
    type : Object as ()=> Product,
    required : true,

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


const quantity = ref(0);

watch(quantity, (value)=>{
  if (value < 1){
    quantity.value = 0;
  }
});

const cartStore = useCartStore();

function addProductToCart(){
  if (quantity.value < 1){
    return;
  }
  const data = {
    id : props.product.id,
    price : price.value,
    quantity : quantity.value,
  };
  cartStore.addProduct(data);


  toast.add({
    id : 'Producted_added_to_cart',
    title : t('common.cartUpdated'),
    description : t('common.productedAddedToCart'),
    timeout : 5000,
  })
 
}



</script>

<template>
  <div class="product container">

    <div class="product-img-wrapper">

      <img :src="product.img" class="product-img" :alt="product.name" width="389" height="400">

      <span v-if="product.sale" class="tag">{{ sale }} % {{ $t('common.reduction') }}</span>

    </div>
   

    <div class="body">
      <div class="details">
        <h1 class="title">{{ product.name }}</h1>
        <h6 v-if="product.sale" class="old-price">{{ product.price }} DZD</h6>
        <h6 class="price">{{ price }} DZD</h6>
        
      </div>

      <p class="description">{{ product.description }}</p>

      <div class="actions">
        <input v-model="quantity" type="number" class="input-primary">
        
        <button type="button" class="btn-primary" title="Ajouter au panier" @click="addProductToCart">
          <span class="icon"> <icon name="heroicons:shopping-cart"/> </span>
          {{ $t('common.addToCart') }} {{ price }} DZD</button>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product{
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 60px;
  margin-bottom: 120px;
  
  .product-img-wrapper{
    width: 100%;
    max-width: 389px;
    position: relative;
    .product-img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
       border-radius: 20px;
  }

    .tag{
      position: absolute;
      top: 24px;
      left: 24px;
    }
  }

 
  
  .body{
    width: calc(100% - 389px - 60px);
    display: flex;
    flex-direction: column;
    gap: 40px;

    .details{
      display: flex;
      flex-direction: column;
      gap: 16px;

      .title{
        @include heading4;
        font-weight: 500;
      }

      .price, .old-price{
        @include text-lg;
        font-weight: 600;
      }
      .old-price{
        text-decoration: line-through;
        color: $neutral100;
      }
    }
    .description{
      color: $neutral800;
    }
    .actions{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 16px;

      input{
        width: 100px;
      }
      button{
        width: calc(100% - 100px - 16px);
      }
    }
  }

  @media (max-width : $tablet){
    flex-direction: column;
    .body{
      width: 100%;
    }
  }


  @media (max-width : $phone){
    margin-bottom: 100px;
    .actions{
      flex-direction: column;
      input, button{
        width: 100% !important;
      }
    }
  }
}

</style>
