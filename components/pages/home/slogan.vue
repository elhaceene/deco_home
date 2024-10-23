<script setup lang="ts">


</script>

<template>
  <div class="container">
    <div class="slogan">
      <h2 class="title">
        {{ $t('common.slogan') }}
      </h2>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.container{
  margin-bottom: 120px;

  @media (max-width : $phone){
    margin-bottom: 100px;
  }
  .slogan{
  width: 100%;
  background-color: $neutral20;
  padding: 80px 200px;
  border-radius: 20px;

  @media (max-width : $tablet){
    padding: 80px 40px;
  }
  

  .title{
    @include heading3;
    font-weight: 500;
    text-align: center;
  }

  @media (max-width : $phone){
    padding: 40px;

    .title{
      @include heading5;
    }
  }
}
}



</style>
