<template>
  <div id="app">
    <!-- Loading screen displayed until all thumbnails are loaded -->
    <div v-if="loading" ref="loadingScreen" class="loading-screen">
      <div ref="loadingText" class="loading-text">
        <span v-for="(char, index) in textChars" :key="index" class="char">{{ char === ' ' ? '\u00A0' : char }}</span>
      </div>
    </div>
    <video-gallery @thumbnails-loaded="handleThumbnailsLoaded"/>
  </div>
</template>

<script setup>
import VideoGallery from '@/components/VideoGallery.vue';
import { ref, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';

// Reactive state to manage loading status
const loading = ref(true);

// Reference for the loading text element
const loadingText = ref(null);
const loadingScreen = ref(null);

const brightColors = [
  '#ff0019', // Bright Red
  '#00fae6', // Bright Cyan
  '#70def7', // Bright Sky Blue
  '#9906fa', // Bright Purple
  '#0f1af9', // Bright Blue
  '#2ad10c', // Bright Green
  '#8000ff', // Bright Purple
  '#ffe205'  // Bright Yellow
];

// Text to display
const text = "PETE CANDELAND";

// Split the text into an array of characters
const textChars = text.split('');

onMounted(() => {
  nextTick(() => {
    // Select all span elements within loadingText for animation
    const chars = loadingText?.value.querySelectorAll('.char');
    
    // GSAP animation for each character
    gsap.fromTo(chars, 
    {
      color: () => gsap.utils.random(brightColors),
      opacity: 0,
      scale: 0.1
    },
    {
    duration: 1,
    scale: 1,
    repeat: -1,
    opacity: 1,
    yoyo: true, 
    ease: "elastic.put(1,0.3)",
    color: () => gsap.utils.random(brightColors),
    stagger: {
      grid: [7,15],
      from: "center",
      amount: 1
    }
  }
  );
});
});

// Handle when all thumbnails have been loaded
function handleThumbnailsLoaded() {
    gsap.to(loadingScreen.value, {
      opacity: 0,
      duration: 1.5,
      ease: "power1.out",
      onComplete: () => {
        gsap.fromTo(
          document.querySelectorAll('.logo .letter'),
          { y: -20, opacity: 0, rotate: -20 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            ease: 'elastic.out(1,0.3)',
            duration: 3,
            delay: 0,
            stagger: 0.05
          }
        )
      }
    });

    // Stop animation for loading text
    if (loadingText.value) {
      const chars = loadingText.value.querySelectorAll('.char');
      gsap.killTweensOf(chars);
    }
    loading.value = false; // Remove loading screen after fade-out
  }

const isMobile = () => window.innerWidth <= 768
</script>

<style>
/* Global styles can be added here if needed */

/* Loading screen styling */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  backdrop-filter: blur(20px);
}

/* Styling for loading text */
.loading-text {
  font-size: 2.5rem;
  color: #fff;
  display: flex;
  font-family: "Londrina Solid", sans-serif;
}

/* Styling for each character */
.char {
  display: inline-block;
  transform-origin: center;
}
</style>
