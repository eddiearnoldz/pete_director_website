<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import gsap from 'gsap'

const showMobileMenu = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const isMobile = () => window.innerWidth <= 768

onMounted(() => {
  const logoText = document.querySelector('.logo span')
  logoText.innerHTML = logoText.textContent
    .split('')
    .map((letter) => `<span class="letter">${letter === ' ' ? '&nbsp;' : letter}</span>`)
    .join('')

  const letters = document.querySelectorAll('.logo .letter')
  const navLinks = document.querySelectorAll('.desktop-nav a')

  // Split the text in nav links into individual letters
  navLinks.forEach((link) => {
    const linkText = link.textContent
    link.innerHTML = linkText
      .split('')
      .map((letter) => `<span class="letter">${letter === ' ' ? '&nbsp;' : letter}</span>`)
      .join('')
  })

  const navLetters = document.querySelectorAll('.desktop-nav .letter')

  // Create a GSAP timeline for the logo letters
  const tl = gsap.timeline({
    onComplete: () => {
      // Cleanup or additional actions after the timeline finishes
      letters.forEach((letter) => {
        // Ensure the final state is set correctly
        gsap.set(letter, { clearProps: 'all' })
      })
    }
  })

  // Add a scaling effect on load for each letter
  tl.fromTo(
    letters,
    { y: -20, opacity: 0, rotate: -20 },
    {
      y: 0,
      opacity: 1,
      rotate: 0,
      ease: 'elastic.out(1,0.3)',
      duration: 3,
      delay: 0.5,
      stagger: 0.05
    }
  )

  // Add hover animations for each letter in the logo
  if (!isMobile()) {
    letters.forEach((letter) => {
      letter.addEventListener('mouseenter', () => {
        gsap.to(letter, {
          y: 10,
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
})

</script>

<template>
  <header>
    <div class="logo">
      <RouterLink class="londrina-solid-regular" to="/"><span>PETE CANDELAND</span></RouterLink>
    </div>
    <nav class="desktop-nav">
      <RouterLink class="londrina-solid-regular" to="/" @click="closeMobileMenu">work</RouterLink>
      <RouterLink class="londrina-solid-regular" to="/about">about</RouterLink>
      <a class="londrina-solid-regular" href="mailto:petecandeland@gmail.com">contact</a>
    </nav>
    <div class="hamburger" @click="toggleMobileMenu">☰</div>
    <div class="mobile-nav" :class="{ open: showMobileMenu }">
      <a class="close-btn" @click="closeMobileMenu">&times;</a>
      <RouterLink class="londrina-solid-regular animated" to="/" @click="closeMobileMenu"
        >work</RouterLink
      >
      <RouterLink class="londrina-solid-regular animated" to="/about" @click="closeMobileMenu"
        >about</RouterLink
      >
      <a
        class="londrina-solid-regular animated"
        href="mailto:eddiearnoldz@me.com"
        @click="closeMobileMenu"
        >contact</a
      >
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
  background-color:  var(--background-color);
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
