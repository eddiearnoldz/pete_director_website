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

// Text to display
const text = "PETE CANDELAND";

// Split the text into an array of characters
const textChars = text.split('');

// GSAP animation setup
onMounted(() => {
  nextTick(() => {
    // Select all span elements within loadingText for animation
    const chars = loadingText?.value.querySelectorAll('.char');
    
    // GSAP animation for each character
    gsap.fromTo(chars, {
      rotation: 0,
      y: -1000,
      opacity: 0,
      color: () => gsap.utils.random(["#FF69B4", "#00FFFF", "#FFD700", "#ADFF2F"]),
    }, {
      rotation: 360,
      color: () => gsap.utils.random(["#FF69B4", "#00FFFF", "#FFD700", "#ADFF2F"]),
      duration: 3,
      ease: "power1.inOut",
      repeat: -1,
      y:0,
      yoyo: true,
      stagger: 0.1,
      opacity: 1,
      transformOrigin: "center center"
    });
  });
});

// Handle when all thumbnails have been loaded
function handleThumbnailsLoaded() {
  // Ensure the loadingScreen reference is available before proceeding
  if (loadingScreen.value) {
    // Trigger fade-out animation
    gsap.to(loadingScreen.value, {
      opacity: 0,
      duration: 0.5,
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
        loading.value = false; // Remove loading screen after fade-out
      }
    });

    // Stop animation for loading text
    if (loadingText.value) {
      const chars = loadingText.value.querySelectorAll('.char');
      gsap.killTweensOf(chars);
    }
  }
}

const isMobile = () => window.innerWidth <= 768
</script>

<style>
/* Global styles can be added here if needed */

/* Loading screen styling */
.loading-screen {
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  backdrop-filter: blur(10px);
}

/* Styling for loading text */
.loading-text {
  font-size: 2rem;
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
