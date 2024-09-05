<template>
  <div class="video_gallery">
    <video-carousel-mobile 
      v-if="isMobileView" 
      :videos="videos" 
      :isVideoFiltered="isVideoFiltered"
      :selectedFilters="selectedFilters"
      @update-video-title="updatevideoTitle"
      @video-selected="selectVideo"
      @thumbnails-loaded="handleThumbnailsLoaded"
    />
    <video-grid 
      v-else 
      :videos="videos"
      :isVideoFiltered="isVideoFiltered"
      :selectedFilters="selectedFilters"
      @update-video-title="updatevideoTitle"
      @video-selected="selectVideo"
      @thumbnails-loaded="handleThumbnailsLoaded"
    />
    <video-footer 
      :filters="filters" 
      :toggleFilter="toggleFilter" 
      @clear-filters="clearFilters"
      :activevideoTitle="activevideoTitle"
      :activevideoImage="activevideoImage"
      :activevideoWork="activevideoWork"
      :selectedFilters="selectedFilters"
    />
    <VideoPlayer
      v-if="selectedVideo"
      :video-url="selectedVideo.videoUrl"
      :autoplay="selectedVideo.autoplay"
      :loop="selectedVideo.loop"
      :controls="selectedVideo.controls"
      @close="selectedVideo = null"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import videoCarouselMobile from '@/components/VideoCarouselMobile.vue';
import videoGrid from '@/components/VideoGrid.vue';
import videoFooter from '@/components/VideoFooter.vue';
import { videos } from '@/data/videos';
import VideoPlayer from '@/components/VideoPlayer.vue';

export default defineComponent({
  components: { videoCarouselMobile, videoGrid, videoFooter, VideoPlayer },
  setup(props, {emit}) {
    const isMobileView = ref(window.innerWidth < 768);
    const selectedFilters = ref([]);
    const filters = ref([
      'work_director',
      'clients_Netflix',
      'clients_Disney',
      'clients_Universal-Pictures',
      'clients_BBC',
      'clients_finlandia',
      'clients_gorillaz',
      'clients_great-western',
      'clients_guitar-hero',
      'clients_jack-daniels',
      'clients_kia',
      'clients_league-of-legends',
      'clients_cannons',
      'clients_mazda',
      'clients_rock-band',
      'clients_red-bull',
      'clients_skyo',
      'clients_the-beatles',
      'clients_Illumination',
      'clients_Mythos',
      'clients_Laika',
    ]);
    const activevideoTitle = ref('');
    const activevideoImage = ref('');
    const activevideoWork = ref([]);
    const selectedVideo = ref(null);

    const toggleFilter = filter => {
      const index = selectedFilters.value.indexOf(filter);
      if (index === -1) {
        selectedFilters.value.push(filter);
      } else {
        selectedFilters.value.splice(index, 1);
      }
    };

    const clearFilters = () => {
      selectedFilters.value = [];
    };

    const isVideoFiltered = (video) => {
      if (selectedFilters.value.length === 0) return false; // Show all if no filters
      return !selectedFilters.value.every(filter => video.filters.includes(filter)); // Filter out if it doesn't match
    };

    const updateView = () => {
      isMobileView.value = window.innerWidth < 768;
    };

    const updatevideoTitle = ({ title, image, work }) => {
      activevideoTitle.value = title;
      activevideoImage.value = image;
      activevideoWork.value = Array.isArray(work) ? work : [work];
    };

    const selectVideo = (video) => {
      selectedVideo.value = {
        videoUrl: video.videoUrl,
        autoplay: true,
        loop: false,
        controls: true,
      };
    };

    const closePlayer = () => {
      selectedVideo.value = null;
    };

    const handleThumbnailsLoaded = () => {
      console.log('Thumbnails loaded event caught in video-gallery!'); // Debugging line
      emit('thumbnails-loaded');
    };

    onMounted(() => {
      window.addEventListener('resize', updateView);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateView);
    });

    return {
      isMobileView,
      selectedFilters,
      filters,
      isVideoFiltered,
      videos,
      activevideoTitle,
      activevideoImage,
      activevideoWork,
      updatevideoTitle,
      toggleFilter,
      clearFilters,
      selectVideo,
      selectedVideo,
      handleThumbnailsLoaded
    };
  }
});
</script>

<style scoped>
.video_gallery {
  position: relative;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  opacity: 0;
  animation: fadeIn 3s forwards;
  z-index: 1;
}

@media screen and (min-width:768px) {
  .video_gallery {
    top: 75px;
    height: calc(100% - 75px);
    z-index: 3;
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>
