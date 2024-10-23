<script setup lang="ts">
const feedbacks = computed(()=>{
  return[
    {
      message : "Decohome a transformé mon espace en un lieu calme avec son mobilier minimaliste. J'adore ses lignes épurées et sa qualité !",

      user : {
        avatar : "/feedbacks/avatar_1.webp",
        fullname : "Lyna Adimbola",
        job : "Web Designer",
      },
    },
    {
      message : "Plus qu'un simple mobilier, c'est un sentiment. L'ensemble de salon minimaliste de Decohome a créé un sanctuaire apaisant pour le sommeil.",

      user : {
        avatar : "/feedbacks/avatar_2.webp",
        fullname : "Amine Silva",
        job : "Éducateur canin",
      },
    },
    {
      message : "Le mobilier minimaliste de Decohome a transformé mon espace en un havre de paix, débarrassé du désordre. J'adore ses lignes épurées et sa qualité !",

      user : {
        avatar : "/feedbacks/avatar_3.webp",
        fullname : "Naima Smith",
        job : "Assistante médical",
      },
    },
  ];
});

</script>

<template>
  <div class="feedbacks container">
    <h6 class="title">{{ $t('common.feedbacks') }}</h6>

    <div class="wrapper">

      <div class="list">
        <PagesHomeFeedbacksFeedback v-for="(feedback, i) in feedbacks" 
        :key="i" 
        :feedback="feedback"
        />
        
      </div>



      <div class="couch-img">
        <img src="/public/feedbacks/couch.webp" alt="Couch" width="582" height="400">
      </div>

    </div>





  </div>
</template>


<style lang="scss">

.feedbacks .wrapper .list{
  .feedback{ @media (max-width : $tablet){
    &:first-child, &:nth-child(2){
      width: calc(50% - 12px);
    }

    &:last-child{
      width: 100%;
    }
  }

    @media (max-width : $phone){
      width: 100% !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.feedbacks{
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 120px;
  @media (max-width : $phone){
    margin-bottom: 100px;
  }
  .title{
    @include heading4;
    font-weight: 500;

  }
  .wrapper{

    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    gap: 32px;


    .list{
      width: 400px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }


    .couch-img{
    width: calc(100% - 400px - 32px);
  
    background-color: $neutral20;
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    &:hover{
      background-color: $neutral30;
    }
  }
  }
  
  @media (max-width : $tablet){
    .wrapper{
      flex-direction: column;
      .list{
        width: 100%;
        order: 2;
        flex-wrap: wrap;
        flex-direction: row;
      }

      .couch-img{
        width: 100%;
        height: 600px;
        order: 1;

        img{
          width: 80%;
          height: auto;
        }
      }

    }

     
    }

    @media (max-width : $phone){
      .wrapper{
        .couch-img{
          height: 400px;
        }
      }
    }
}

</style>
