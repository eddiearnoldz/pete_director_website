<template>
  <div v-if="showPlayer" class="video-overlay">
    <div class="video-container">
      <vimeo-player :video-url="videoUrl" class="embed-container" :options="{'responsive':true}"></vimeo-player>  
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
      playerHeight: window.innerHeight * 0.9,
    };
  },
  methods: {
    onPlayerReady(player) {
      this.player = player;
    },
    closePlayer() {
      this.showPlayer = false;
      if (this.player) {
        this.player.pause();
      }
    },
    updatePlayerSize() {
      this.playerWidth = window.innerWidth * 0.9;
      this.playerHeight = window.innerHeight * 0.9;
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
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.5s forwards;
}

.video-container {
  position: relative;
  width: 90%;
  height: 90%;
}

.embed-container {
  width: 100% !important;
  height: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
}



.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  color: white;
  border: none;
  font-size: 18px;
  cursor: pointer;
  z-index: 1001;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
