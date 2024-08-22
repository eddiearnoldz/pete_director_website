<template>
  <div class="video_gallery">
    <video-carousel-mobile 
      v-if="isMobileView" 
      :videos="filteredvideos" 
      :selectedFilters="selectedFilters"
      @update-video-title="updatevideoTitle"
      @video-selected="selectVideo"
    />
    <video-grid 
      v-else 
      :videos="filteredvideos" 
      :selectedFilters="selectedFilters"
      @update-video-title="updatevideoTitle"
      @video-selected="selectVideo"
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
  setup() {
    const isMobileView = ref(window.innerWidth < 768);
    const selectedFilters = ref([]);
    const filters = ref([
      'work_animator',
      'work_director',
      'work_gorillaz',
      'genre_commercial',
      'genre_live', 
      'genre_music-video', 
      'genre_sizzle',
      'year_2024',
      'year_2023',
      'year_2022',
      'year_2021',
      'year_2020',
      'year_2019',
      'clients_BBC',
      'clients_finlandia',
      'clients_gorillaz',
      'clients_great-western',
      'clients_guitar-hero',
      'clients_jack-daniels',
      'clients_kia',
      'clients_league-of-legends',
      'clients_mazda',
      'clients_rock-band',
      'clients_red-bull',
      'clients_skyo',
      'clients_the-beatles',
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

    const filteredvideos = computed(() => {
      if (selectedFilters.value.length === 0) return videos;
      return videos.filter(video =>
        selectedFilters.value.every(filter => video.filters.includes(filter))
      );
    });

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
      videos,
      activevideoTitle,
      activevideoImage,
      activevideoWork,
      updatevideoTitle,
      toggleFilter,
      clearFilters,
      filteredvideos,
      selectVideo,
      selectedVideo
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
