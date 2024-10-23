<script setup lang="ts">
const {t} = useI18n();


const gallery = computed(()=>{

  return[
    {
      link : '/gallery/living room.webp',
      img : '/gallery/living room.webp',
      label : t("common.livingRoom"),
    },
    {
      link : '/gallery/kitchen.webp',
      img : '/gallery/kitchen.webp',
      label : t("common.kitchen"),
    },
    {
      link : '/gallery/bathroom.webp',
      img : '/gallery/bathroom.webp',
      label : t("common.bathRoom"),
    },
    {
      link : '/gallery/bedroom.webp',
      img : '/gallery/bedroom.webp',
      label : t("common.bedRoom"),
    },
    {
      link : '/gallery/desk.webp',
      img : '/gallery/desk.webp',
      label : t("common.desk"),
    },
  ]

})

</script>

<template>
  <div class="container">
    <h6 class="title">
      {{ $t('common.gallery') }}
    </h6>
    <div class="gallery">
    <a v-for="(img, i) in gallery" 
    :key="i"
    :href="img.link" 
    :title="img.label" target="_blank" class="img-link">
    <img :src="img.img" :alt="img.label" >
    <span class="bg"></span>
    <span class="title">{{img.label}}</span>
    </a>
    </div>
    
  
  </div>
</template>

<style lang="scss" scoped>
.title{
  @include heading4;
  font-weight: 500;
  margin-bottom: 24px;
}
.gallery{
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 120px;
  @media (max-width:$phone){
    margin-bottom: 100px;
  }

  
  .img-link{
    border-radius: 12px;
    height: 260px;
    position: relative;
    overflow: hidden;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 12px;
      }
    &:first-child,
    &:nth-child(2),
    &:nth-child(3){
      width: calc((100% / 3 ) - 10px);
      
    
    }

    &:nth-child(4),
    &:last-child{
      width: calc((100% / 2 ) - 10px);
      
    }
    @media (max-width : $tablet){
      &:last-child{
        width: 100%;
      }
      &:not(:last-child){
        width: calc((100% / 2) - 10px);
      }
    }

    @media (max-width : $tablet){
      width: 100% !important ;
    }

    .bg, .title{
      visibility: hidden;
    }
    &:hover{
      .bg, .title{
        visibility: visible;
      }

      .bg{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 200%;
        height: 120px;
        background-color: black;
        filter: blur(40px);
        opacity: 0.6;
      }

      .title{
        position: absolute;
        right: 32px;
        bottom: 24px;
        @include heading4;
        font-weight: 500;
        color: white;

      }
    }
  }
}


</style>
