<script setup lang="ts">

interface Question{
  question : string;
  answer : string;
}
const props = defineProps({
  question : {
    type : Object as () => Question,
    required : true,
  },
});


const showAnswer = ref(false);

const icon = computed(()=>{
  if (showAnswer.value){
    return "heroicons:minus-circle-solid";
  }
  
  return "heroicons:plus-circle-solid";
});


</script>

<template>
  <button type="button" class="question-wrapper" title="Question" @click="showAnswer = !showAnswer">
    <span class="question">
      <span class="question-title">
        {{ question.question }}
      </span>

    <icon :name="icon" class="icon" />
    </span>

    <span class="answer" v-if="showAnswer">
      {{ question.answer }}
    </span>
  </button>
</template>

<style lang="scss" scoped>

.question-wrapper{
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px 16px;

  &:hover{
    background-color: $neutral10;
  }
  .question{
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .question-title{
      @include heading6;
      font-weight: 500;
    }

    .icon{
      font-size: 24px;
    }
  }

  .answer{
    width: 100%;
    @include text-lg;
    color: $neutral600;
    text-align: left;
  }
}

</style>



