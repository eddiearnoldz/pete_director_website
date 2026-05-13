<template>
  <div class="video-grid">
    <div
      v-for="(video, index) in filteredvideos"
      :key="index"
      :class="['grid-item', { 'filtered-out': !isVideoFiltered(video) }]"
      :data-pos="index + 1"
      @mouseover="handleMouseOver(video, index)"
      @mouseleave="handleMouseLeave(index)"
      @click="handleClick(video)"
    >
      <img 
        :src="isGifLoaded[index] ? video.image : video.thumbnail" 
        :alt="video.title" 
        class="video-img" 
        @load="checkThumbnailLoaded(index)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue';

export default defineComponent({
  props: {
    videos: {
      type: Array,
      required: true
    },
    isVideoFiltered: {
      type: Function
    },
    selectedFilters: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update-video-title', 'video-selected', 'thumbnails-loaded'],
  setup(props, { emit }) {
    const isGifLoaded = ref(Array(props.videos.length).fill(false));
    const thumbnailsLoadedCount = ref(0);

    const preloadGif = (url, index) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          isGifLoaded.value[index] = true; // Mark GIF as loaded
          resolve(url);
        };
        img.onerror = reject;
      });
    };

    const updatevideoTitle = (title, image, work) => {
      emit('update-video-title', { title, image, work });
    };

    const handleMouseOver = async (video, pos) => {
      try {
        const work = video.filters
          .filter(filter => filter.includes('work'))
          .map(filter => filter.replace('work_', '').replace("-", " "));

        updatevideoTitle(video.title, video.image, work);

        const gridContainer = document.querySelector('.video-grid');
        gridContainer.style.gridTemplateColumns = getGridTemplateColumns(pos + 1);
        gridContainer.style.gridTemplateRows = getGridTemplateRows(pos + 1);
        gridContainer.style.transition = 'grid-template-columns 1s ease, grid-template-rows 1s ease';

        document.querySelectorAll('.grid-item').forEach((item, index) => {
          item.classList.remove('enlarged', 'shrunken');
          if (index === pos) {
            item.classList.add('enlarged');
          } else {
            item.classList.add('shrunken');
          }
        });
      } catch (error) {
        console.error('Error in handleMouseOver:', error);
      }
    };

    const handleMouseLeave = (index) => {
      try {
        updatevideoTitle('', '', '');
        const gridContainer = document.querySelector('.video-grid');
        gridContainer.style.gridTemplateColumns = '40% 15% 15% 15% 15% 15% 15% 15% 15% 15%';
        gridContainer.style.gridTemplateRows = rowLayouts[0];
        gridContainer.style.transition = 'grid-template-columns 1s ease, grid-template-rows 1s ease';

        document.querySelectorAll('.grid-item')[0].classList.add('enlarged');
      } catch (error) {
        console.error('Error in handleMouseLeave:', error);
      }
    };

    const handleClick = (video) => {
      emit('video-selected', video);
    };

    const checkThumbnailLoaded = (index) => {
      thumbnailsLoadedCount.value += 1;
      if (thumbnailsLoadedCount.value === filteredvideos.value.length) {
        console.log('Thumbnails loaded!'); // Debugging line
        emit('thumbnails-loaded');
      }
    };

    const columnLayouts = [
      '40% 15% 15% 15% 15% 15% 15% 15% 15% 15%',
      '15% 40% 15% 15% 15% 15% 15% 15% 15% 15%',
      '15% 15% 40% 15% 15% 15% 15% 15% 15% 15%',
      '15% 15% 15% 40% 15% 15% 15% 15% 15% 15%',
      '15% 15% 15% 15% 40% 15% 15% 15% 15% 15%',
      '15% 15% 15% 15% 15% 40% 15% 15% 15% 15%',
      '15% 15% 15% 15% 15% 15% 40% 15% 15% 15%',
      '15% 15% 15% 15% 15% 15% 15% 40% 15% 15%',
      '15% 15% 15% 15% 15% 15% 15% 15% 40% 15%',
      '15% 15% 15% 15% 15% 15% 15% 15% 15% 40%'
    ];

    const getGridTemplateColumns = (pos) => {
      const normalizedPos = (pos - 1) % 10;
      return columnLayouts[normalizedPos];
    };

    const rowLayouts = [
      '55% 15% 15% 15%', // 1-10
      '15% 55% 15% 15%', // 11-20
      '15% 15% 55% 15%', // 21-30
      '15% 15% 15% 55%'  // 31-40
    ];

    const getGridTemplateRows = (pos) => {
      const normalizedPos = Math.floor((pos - 1) / 10) % 4;
      return rowLayouts[normalizedPos];
    };

    const filteredvideos = computed(() => {
      return props.videos;
    });

    const isVideoFiltered = (video) => {
      if (props.selectedFilters.length === 0) return true;
      return props.selectedFilters.some(filter => video.filters.includes(filter));
    };

    onMounted(() => {
      // Preload all GIFs once the component is mounted
      filteredvideos.value.forEach((video, index) => {
        preloadGif(video.image, index).catch((error) => {
          console.error('Error loading GIF:', error);
        });
      });
    });

    return {
      filteredvideos,
      handleMouseOver,
      handleMouseLeave,
      handleClick,
      isGifLoaded,
      checkThumbnailLoaded,
      isVideoFiltered
    };
  }
});
</script>

<style scoped>
.video-grid {
  display: grid;
  grid-template-columns: 40% 15% 15% 15% 15% 15% 15% 15% 15% 15%;
  grid-template-rows: 55% 15% 15% 15%;
  padding: 2rem 0 1rem;
  grid-auto-flow: row;
  padding-left: 0;
  overflow-x: auto;
  overflow-y: hidden;
  height: 70vh;
  width: 100%;
  margin-left: auto;
  -ms-overflow-style: none; 
  scrollbar-width: none;
  z-index: 2;
  transition: grid-template-columns 1s ease, grid-template-rows 1s ease;
  max-width: 1800px;
  margin: 0 auto;
}

.video-grid::-webkit-scrollbar {
  display: none;
}

.grid-item {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: all 1s ease;
  height: 100%;
}

.grid-item.filtered-out {
  opacity: 0.1;
  transition: opacity 0.3s;
}

.video-img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s;
  padding: 5px;
}
</style>
