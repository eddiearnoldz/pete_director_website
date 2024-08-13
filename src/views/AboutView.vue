<template>
  <div class="about container">
    <h1 class="fade-in">About </h1>
    <p class="fade-in">Pete Candeland’s work is, as Rolling Stone Magazine so accurately put it, “jaw dropping” and “insanely cool”. He’s a multi-faceted director who’s equally adept at creating 2D, 3D and live action mix animation. His style is defined by highly conceptual narratives, strong graphic sensibilities, and artful compositions. When combined with his love of story telling, the results are visually stunning and emotionally engaging.</p>
    <p class="fade-in">Throughout his career, Pete has consistently proven himself to be one of commercial animation’s luminary directors, with his work influencing countless contemporaries. His iconic Gorillaz music videos, his trailblazing cinematic’s for the opening to The Beatles Rock Band game franchise, and his emotive BBC trailers are just a few examples of work that has redefined categories. Never satisfied with what is ‘current’, Pete is constantly searching for new technology to help transform ideas into reality. With this future-facing mindset at the heart of his process, Pete was in a two-year overall deal with Netflix. On the TV side, Pete is currently developing a re-imagining of FANTASIA for Disney and the fabled graphic novel STUFF OF LEGEND for Wiip. He is also developing the original series GODS & MONSTERS with Jason Lust, Ruben Liber and Mike Callaghan (Ranger 7) producing.</p> 
    <p class="fade-in"> As a creative director, Candeland’s background is extensive with a portfolio that includes work for The BBC, Coke, Adidas and Nike.</p>
  </div>
</template>

<style scoped >
.about.container {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: calc(100vw - 4rem);
}

.about h1 {
  color: var(--text-color-hover);
  font-size: 40px;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 3s forwards;
  max-width: 800px;
  font-size: clamp(14px, 21.5vw, 20px);
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>