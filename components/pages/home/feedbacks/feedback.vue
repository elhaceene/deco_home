<script setup lang="ts">
interface Feedback {
  message : string;

  user : {
    avatar : string;
    fullname : string;
    job : string;
  };
}

const props = defineProps({
  feedback : {
    type : Object as () => Feedback,
    required : true,
  },
});

</script>

<template>
  <div class="feedback">
  <div class="message">
    <icon class="icon" name="ri:double-quotes-l"/>
    <p class="body">{{ feedback.message }}</p>
  </div>
    
    
  <div class="user">
      <img :src="feedback.user.avatar" alt="User" width="40" height="40">
  

    <div class="details">
      <h6 class="fullname">{{ feedback.user.fullname }}</h6>
      <h6 class="job">{{ feedback.user.job }}</h6>
    </div>

  </div>
</div>
</template>

<style lang="scss" scoped>
.feedback{
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: $neutral20;
  padding: 32px;
  border-radius: 20px;

  .message{
    display: flex;
    flex-direction: column;
    gap: 10px;

    .icon{
    font-size: 40px;
  }
  }

  
  .user{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;

    .details{
      display: flex;
      flex-direction: column;

      .full-name{
        font-weight: 500;
      }

      .job{
        @include text-sm;
        color: $neutral100;
      }
    }
  }
&.active{
  color: white;
  background-color: black;
}
}



</style>
