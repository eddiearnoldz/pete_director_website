<template>
  <div v-if="showPlayer" class="video-overlay" @click="closePlayer">
    <div class="video-container">
      <vimeo-player 
        ref="videoPlayer"
        :video-url="videoUrl"
        class="embed-container"
        :options="{'responsive':true, autoplay: autoplay, loop: loop, controls: controls}"
        @ready="onPlayerReady"
      />
      <button @click="closePlayer" class="close-button">X</button>
    </div>
  </div>
</template>

<script>
import { vueVimeoPlayer } from 'vue-vimeo-player';

export default {
  components: {
    'vimeo-player': vueVimeoPlayer,
  },
  props: {
    videoUrl: {
      type: String,
      required: true,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    controls: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showPlayer: true,
      playerWidth: window.innerWidth * 0.9,
      playerHeight: window.innerHeight,
    };
  },
  methods: {
    onPlayerReady(player) {
      player.setColors(['#ef5512', '#0E5302', '#fff', '#000'])
      this.player = player;
      this.animateVideoIn();
    },
    closePlayer() {
      this.showPlayer = false;
      if (this.player) {
        this.player.pause();
      }
      this.$emit('close');
    },
    updatePlayerSize() {
      this.playerWidth = window.innerWidth * 0.9;
      this.playerHeight = window.innerHeight;
    },
    animateVideoIn() {
      const videoContainer = this.$refs.videoPlayer.$el.parentElement;
      videoContainer.classList.add('animate-in');
    }
  },
  mounted() {
    this.updatePlayerSize();
    window.addEventListener('resize', this.updatePlayerSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updatePlayerSize);
    if (this.player) {
      this.player.unload();
    }
  },
};
</script>

<style scoped>
.video-overlay {
  position: fixed;
  top: -75px;
  left: 0;
  width: 100vw;
  height: calc(100vh + 75px);
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.5s forwards;
}

.video-container {
  width: 90%;
  height: 100%;
}

.video-container.animate-in {
  opacity: 1;
}

.embed-container {
  width: 100% !important;
  height: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 18px;
}

.close-button {
  position: absolute;
  bottom: 1em;
  right: 1em;
  background:  var(--text-color);;
  color: var(--text-color-hover);
  border: 3px solid var(--text-color-hover);
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  z-index: 1001;
  border-radius: 50%;
  padding: 15px;
  z-index: 1001;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media screen and (min-width: 768px) {
  .close-button {
    bottom: 2em;
    right: 2em;
    height: 50px;
    width: 50px;
    padding: 20px;
  }
}
</style>
