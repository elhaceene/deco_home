<script setup lang="ts">

const localePath = useLocalePath();
const year = computed(()=>{
  const activeYear = new Date();
  return activeYear.getFullYear();
})

</script>

<template>
  <footer class="footer container">
    <div class="logo-container">
      <nuxt-link :to="localePath('/')" :title="$t('common.home')" >
       <img src="/public/logo.svg" alt="Logo Decohome" width="172" height="32">
      </nuxt-link>
      <p class="description">
       {{$t('common.footerDescription')}}
      </p>
      <div class="actions">
        <a href="https://instagram.com/" target="_blank" class="btn-square md">
          <Icon name="mdi:instagram"/>
        </a>
        <a href="https://tiktok.com/" target="_blank" class="btn-square md">
          <Icon name="ic:baseline-tiktok"/>
        </a>
        <a href="https://facebook.com/" target="_blank" class="btn-square md">
          <Icon name="uil:youtube"/>
        </a>
      </div>
    </div>

    <div class="links-container">
      <div class="links-list">
        <h6 class="title">{{$t('common.company')}}</h6>
        <nuxt-link :to="localePath('/')" :title=" $t('common.home') " class="link base">
          {{ $t('common.home') }}
        </nuxt-link>
        <nuxt-link :to="localePath('/faq')" :title="$t('common.faq')" class="link base">
          {{ $t('common.faq') }}
        </nuxt-link>
      </div>

      <div class="links-list">
        <h6 class="title">{{ $t('common.legal') }}</h6>
        <nuxt-link :to="localePath('/term')" :title="$t('common.termsOfUse')" class="link base">
          {{ $t('common.termsOfUse') }}
        </nuxt-link>
        <nuxt-link :to="localePath('/privacy')" :title="$t('common.privacyPolicy')" class="link base">
          {{ $t('common.privacyPolicy') }}
        </nuxt-link>
      </div>
    </div>
  </footer>
  <div class="copyright">
    <div class="container">
      © {{ year }} {{ $t('common.copyright') }}
    </div>
    
  </div>
</template>

<style lang="scss" scoped>

footer{
display: flex;
align-items: flex-start;
justify-content: space-between;
flex-wrap: wrap;

  .logo-container{
    max-width: 336px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  
  .description{
    color: $neutral400;
  }
  .actions{
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;
  }

  @media (max-width:$tablet){
    width: 100%;
    max-width: 100%;
    margin-bottom: 24px;
  }
}

.links-container{
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  @media (max-width:$phone){
    gap: 24px;
  }

  .links-list{
    width: 210px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .title{
      font-weight: 600;
    }
    @media (max-width:$phone){
      width: 100%;
    }
  }
}
}
.copyright{
  width: 100%;
  background-color: black;
  height: 58px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 60px;
  @media (max-width:$tablet){
    text-align: center;
  }
}

</style>
