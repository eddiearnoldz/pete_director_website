<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import gsap from 'gsap'
import VideoPlayer from '@/components/VideoPlayer.vue';

const showMobileMenu = ref(false);
const showPlayer = ref(false);
const vimeoUrl = "https://vimeo.com/1001251940";
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

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const closePlayer = () => {
  showPlayer.value = false // Close the video player
}

const openShowreel = () => {
  showPlayer.value = true 
  closeMobileMenu()
}

const isMobile = () => window.innerWidth < 768

onMounted(() => {
  const logoText = document.querySelector('.logo span')
  logoText.innerHTML = logoText.textContent
    .split('')
    .map((letter) => `<span class="letter">${letter === ' ' ? '&nbsp;' : letter}</span>`)
    .join('')

  const letters = document.querySelectorAll('.logo .letter')
  const navLinks = document.querySelectorAll('.desktop-nav a')
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a.animated')

  // Split the text in nav links into individual letters
  navLinks.forEach((link) => {
    const linkText = link.textContent
    link.innerHTML = linkText
      .split('')
      .map((letter) => `<span class="letter">${letter === ' ' ? '&nbsp;' : letter}</span>`)
      .join('')
  })

  const navLetters = document.querySelectorAll('.desktop-nav .letter')

  mobileNavLinks.forEach((link) => {
    const linkText = link.textContent
    link.innerHTML = linkText
      .split('')
      .map((letter) => `<span class="letter">${letter === ' ' ? '&nbsp;' : letter}</span>`)
      .join('')
  })

  const mobileNavLetters = document.querySelectorAll('.mobile-nav .letter')

  // Create a GSAP timeline for the logo letters
  const tl = gsap.timeline({
    onComplete: () => {
      // Cleanup or additional actions after the timeline finishes
      letters.forEach((letter) => {
        // Ensure the final state is set correctly
        gsap.set(letter, { clearProps: 'all' })
      })
    }
  });

  // Add hover animations for each letter in the logo
  if (!isMobile()) {
    letters.forEach((letter) => {
    let hoverAnimation;

    letter.addEventListener('mouseenter', () => {
      if (hoverAnimation?.isActive()) {
        return; // Do nothing if any animation is active
      }

      hoverAnimation = gsap.timeline()
        .to(letter, {
          ease: 'elastic.out(1, 0.9)',
          rotateY: 360,
          duration: 3,
          transformOrigin: 'center',
          color: gsap.utils.random(brightColors)
        })
        .to(letter, {
          rotateY: 0,
          ease: 'elastic.out(1, 0.9)',
          duration: 2,
          transformOrigin: 'center',
          color: "#fefef6"
    }); 
    });
  });


    // Apply the same hover animations to each individual letter of the nav links
    navLetters.forEach((letter) => {
      letter.addEventListener('mouseenter', () => {
        gsap.to(letter, {
          y: -10,
          ease: 'elastic.out(1, 0.9)',
          duration: 3
        })
      })

      letter.addEventListener('mouseleave', () => {
        gsap.to(letter, {
          y: 0,
          ease: 'elastic.out(1, 0.9)',
          duration: 3,
          transformOrigin: 'center'
        })
      })
    })
  }

  watch(showMobileMenu, (newValue) => {
    if (newValue) {
      const mobileNavLetters = document.querySelectorAll('.mobile-nav .letter')
      gsap.fromTo(
        mobileNavLetters,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'elastic.out(1,0.3)',
          duration: 2,
          stagger: {
            from: "random",
            amount: 0.3,
            each: 0.1
          },
          delay: 0.5
        }
      )
    }
  })
})

</script>

<template>
  <header>
    <div class="logo">
      <RouterLink class="londrina-solid-regular" to="/" @click="closeMobileMenu"><span>PETE CANDELAND</span></RouterLink>
    </div>
    <nav class="desktop-nav">
      <RouterLink class="londrina-solid-regular" to="/" @click="closeMobileMenu">work</RouterLink>
      <a class="londrina-solid-regular" href="#" @click.prevent="openShowreel">showreel</a>
      <RouterLink class="londrina-solid-regular" to="/about">about</RouterLink>
      <a class="londrina-solid-regular" href="mailto:petecandeland@gmail.com">contact</a>
    </nav>
    <div class="hamburger" @click="toggleMobileMenu">☰</div>
    <div class="mobile-nav" :class="{ open: showMobileMenu }">
      <a class="close-btn" @click="closeMobileMenu">x</a>
      <RouterLink class="londrina-solid-regular animated" to="/" @click="closeMobileMenu"
        >work</RouterLink
        >
        <a class="londrina-solid-regular animated" href="#" @click.prevent="openShowreel">showreel</a>
      <RouterLink class="londrina-solid-regular animated" to="/about" @click="closeMobileMenu"
        >about</RouterLink
      >
      <a
        class="londrina-solid-regular animated"
        href="mailto:petecandeland@gmail.com"
        @click="closeMobileMenu"
        >contact
      </a>
    </div>
  </header>

  <VideoPlayer
    v-if="showPlayer"
    :video-url="vimeoUrl"
    :autoplay="true"
    :loop="false"
    :controls="true"
    @close="closePlayer"
  />

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
  margin-top: -15px;
}

.mobile-nav {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:  var(--background-color);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease-in-out,
    visibility 0s linear 1s;
}

.mobile-nav.open {
  display: flex;
  opacity: 1;
  visibility: visible;
  transition:
    opacity 0.5s ease-in-out;
}

.mobile-nav a.animated {
  color: var(--text-color);
  text-decoration: none;
  font-size: 2.5rem;
}

.close-btn {
  font-size: 3rem;
  cursor: pointer;
  opacity: 0;
  position: absolute;
  top: 0.6rem;
  right: 1.6rem;
  transition: opacity 1s ease;
}

.mobile-nav.open .close-btn {
  opacity: 1;
}

@media screen and (max-width: 767px) {
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
