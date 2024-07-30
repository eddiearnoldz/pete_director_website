<template>
  <div class="video_gallery">
    <video-carousel-mobile 
      v-if="isMobileView" 
      :videos="filteredvideos" 
      :selectedFilters="selectedFilters"
      @update-video-title="updatevideoTitle"
    ></video-carousel-mobile>
    <video-grid 
      v-else 
      :videos="filteredvideos" 
      :selectedFilters="selectedFilters"
      @update-video-title="updatevideoTitle"
    ></video-grid>
    <video-footer 
      :filters="filters" 
      :toggleFilter="toggleFilter" 
      @clear-filters="clearFilters"
      :activevideoTitle="activevideoTitle"
      :activevideoImage="activevideoImage"
      :activevideoWork="activevideoWork"
      :selectedFilters="selectedFilters"
    ></video-footer>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import videoCarouselMobile from '@/components/VideoCarouselMobile.vue';
import videoGrid from '@/components/VideoGrid.vue';
import videoFooter from '@/components/VideoFooter.vue';
import { videos } from '@/data/videos';

export default defineComponent({
  components: { videoCarouselMobile, videoGrid, videoFooter },
  setup() {
    const isMobileView = ref(window.innerWidth < 768);
    const selectedFilters = ref([]);
    const filters = ref([
      'work_director',
      'work_animator',
      'work_gorillaz',
      'year_2019',
      'year_2020',
      'year_2021',
      'year_2022',
      'year_2023',
      'year_2024',
      'clients_gorillaz',
      'clients_renault',
      'clients_bbc',
      'clients_mazda',
      'clients_sky',
      'clients_great-western',
      'clients_rockband',
    ]);
    const activevideoTitle = ref('');
    const activevideoImage = ref('');
    const activevideoWork = ref([]);

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
      activevideoWork.value = work;
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
      filteredvideos
    };
  }
});
</script>

<style scoped>
.video_gallery {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

@media screen and (min-width:768px) {
  .video_gallery {
    top: 75px;
    height: calc(100% - 75px);

  }
}
</style>
