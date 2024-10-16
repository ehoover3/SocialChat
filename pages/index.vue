<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <div>Home</div>

      <div class="border-b" :class="twitterBorderColor">Message Form</div>

      <TweetListFeed :tweets="homeTweets" />
    </MainSection>
  </div>
</template>
<script setup>
const { twitterBorderColor } = useTailwindConfig();
c;
</script>
