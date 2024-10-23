<script setup lang="ts">

const {t} = useI18n();

const questions = computed(()=>{
  return[
    {
    question : t('common.FAQ.question1.question'),
    answer : t('common.FAQ.question1.answer'),
  },
  {
    question : t('common.FAQ.question2.question'),
    answer : t('common.FAQ.question2.answer'),
  },
  {
    question : t('common.FAQ.question3.question'),
    answer : t('common.FAQ.question3.answer'),
  },
  {
    question : t('common.FAQ.question4.question'),
    answer : t('common.FAQ.question4.answer'),
  },
  {
    question : t('common.FAQ.question5.question'),
    answer : t('common.FAQ.question5.answer'),
  },
]
})

</script>

<template>
  <div class="faq container">
    <header class="header">
      <h1 class="title">{{ $t('common.faqtitle') }}</h1>
      <p class="subtitle">{{ $t('common.faqsubtitle') }}</p>
    </header>
    
    <div class="body">
      <PagesFaqQuestion v-for="(question, i) in questions" :key="i" :question="question" />
    </div>


  </div>
</template>
<style lang="scss">
.faq .body .question-wrapper{
  &:not(:last-child){
    border-bottom: 1px solid $neutral40;
  }
}

</style>
<style lang="scss" scoped>
.faq{
  margin-bottom: 120px;
.header{
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 120px;



  .title{
    @include heading3;
    font-weight: 500;
  }
  .subtitle{
    @include heading6;
    color: $neutral200;
  }
}
  @media (max-width : $phone){
    margin-bottom: 100px;
    .header{
      margin-top: 40px;
      margin-bottom: 100px;
    }
  }

}





</style>
