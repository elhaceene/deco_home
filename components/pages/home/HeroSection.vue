<script setup lang="ts">
const {$anime} = useNuxtApp();

const titleRef = ref("");
const subtitleRef = ref("");
const imgRef = ref("");
const hilightRef = ref("");

onMounted(()=>{
  $anime.timeline().add({
    targets : titleRef.value,
    duration : 600,
    easing : "easeOutSine",
    translateY : ["20px", 0],
    opacity : [0, 1],
  })

  .add({
    targets : subtitleRef.value,
    duration : 600,
    easing : "easeOutSine",
    translateY : ["20px", 0],
    opacity : [0, 1],
  })
  .add({
    targets : imgRef.value,
    duration : 400,
    easing : "easeOutSine",
    translateY : ["20px", 0],
    opacity : [0, 1],
  }, 400)
  .add({
    targets : hilightRef.value,
    duration : 400,
    easing : "easeOutSine",
    opacity : [0, 1],
  });


});

</script>

<template>
<div class="hero-section">
  <div class="wrapper">
    <h1 class="title" ref="titleRef">{{ $t('common.heroTitle') }}</h1>

    <p class="subtitle" ref="subtitleRef">{{ $t('common.heroSubtitle') }}</p>
  </div>

  <div class="img">
    <span class="highlight" ref="hilightRef">
      DECOHOME
    </span>
    <img src="/public/image.webp" alt="Fourniture" width="1000" height="275" ref="imgRef" >

  </div>

</div>  
</template>

<style lang="scss" scoped>

.hero-section{
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 60px;
  margin-bottom: 100px;
  @media (max-width:$tablet){
    margin-bottom: 80px;
  }
  
  
  @media (max-width:$phone){
    margin-top: 40px;
    margin-bottom: 60px;
  }

  .wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    text-align: center;
  

  .title{
    
    @include heading1;
    font-weight: 500;
  }

  .subtitle{
    max-width: 820px;
    @include heading6;
    color: $neutral200;
  }

  @media (max-width:$phone){
    text-align: left;
    align-items: flex-start;
    .title{
      @include heading2;
    }
  }
}

.img{
  width: 100%;
  text-align: center;
  position: relative;

  & > img{
    width: 100%;
    height: auto;
    position: relative;
    z-index: 2;
  }
  .highlight{
    font-size: 240px;
    font-weight: 500;
    color: $neutral20;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: calc(100% - 64px);
    z-index: 1;

    @media (max-width:$phone){
      font-size: 120px;
    }
  }
}

}

</style>
