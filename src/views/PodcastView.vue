<template>
  <div class="podcast container">
    <img src="/assets/images/CandyBang.webp" alt="">
    <h1 class="fade-in">coming soon...</h1>
  </div>
</template>

<style>
.podcast.container {
  padding: 2rem;
  width: calc(100vw - 4rem);
  display: flex;
  flex-direction: column;
}
.podcast h1 {
  color: var(--text-color-hover);
  font-size: 40px;
  text-align: center; 
}

.podcast img {
  width: clamp(300px, 50vw, 1000px);
}

.fade-in {
  opacity: 0;
  animation: fadeIn 3s forwards;
  max-width: 1000px;
  font-size: clamp(14px, 1.5vw, 20px);
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>
