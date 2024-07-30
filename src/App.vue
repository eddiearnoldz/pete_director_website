<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const showMobileMenu = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}
</script>

<template>
  <header>
    <div class="logo">
      <RouterLink class="londrina-solid-regular" to="/"><span>PETE DIRECTOR</span></RouterLink>
    </div>
    <nav class="desktop-nav">
      <RouterLink class="londrina-solid-regular" to="/" @click="closeMobileMenu">work</RouterLink>
      <RouterLink class="londrina-solid-regular" to="/about">about</RouterLink>
      <a class="londrina-solid-regular" href="mailto:eddiearnoldz@me.com">contact</a>
    </nav>
    <div class="hamburger" @click="toggleMobileMenu">☰</div>
    <div class="mobile-nav" :class="{ open: showMobileMenu }">
      <a class="close-btn" @click="closeMobileMenu">&times;</a>
      <RouterLink class="londrina-solid-regular animated" to="/" @click="closeMobileMenu">work</RouterLink>
      <RouterLink class="londrina-solid-regular animated" to="/about" @click="closeMobileMenu">about</RouterLink>
      <a class="londrina-solid-regular animated" href="mailto:eddiearnoldz@me.com" @click="closeMobileMenu">contact</a>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav a {
  cursor: pointer;
}

.hamburger {
  display: none;
  font-size: 3rem;
  cursor: pointer;
}

.mobile-nav {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fdb6b6;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-100%);
  transition:
    transform 1s ease-in-out,
    opacity 1s ease-in-out,
    visibility 0s linear 1s;
}

.mobile-nav.open {
  display: flex;
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition:
    transform 1s ease-in-out,
    opacity 1s ease-in-out;
}

.mobile-nav a.animated {
  color: var(--text-color);
  text-decoration: none;
  font-size: 2.5rem;
  opacity: 0;
  transform: translateY(-20px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.mobile-nav.open a.animated {
  opacity: 1;
  transform: translateY(0);
}

.mobile-nav a.animated:nth-child(2) {
  transition-delay: 1.1s;
}

.mobile-nav a.animated:nth-child(3) {
  transition-delay: 1.2s;
}

.mobile-nav a.animated:nth-child(4) {
  transition-delay: 1.3s;
}

.close-btn {
  font-size: 4rem;
  cursor: pointer;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 1rem;
  transition: opacity 1s ease;
}

.mobile-nav.open .close-btn {
  opacity: 1;
  transition-delay: 1s; /* Delay to match the background animation */
}

@media screen and (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .hamburger {
    display: block;
  }

  .mobile-nav {
    display: flex;
  }
}
</style>
