<template>
  <div class="carousel-container" ref="carouselContainer" @scroll="onScroll">
    <div
      v-for="(video, index) in filteredvideos"
      :key="index"
      :class="['slide', { 'active-slide': activeIndex === index }]"
      :style="getSlideStyle(index)"
    >
      <img :src="video.thumbnail" :alt="video.title" class="video-image" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, nextTick, watch } from 'vue';

export default defineComponent({
  props: {
    videos: {
      type: Array,
      required: true
    },
    selectedFilters: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update-video-title'],
  setup(props, { emit }) {
    const activeIndex = ref(0);
    const carouselContainer = ref(null);

    const filteredvideos = computed(() => {
      if (props.selectedFilters.length === 0) return props.videos;
      return props.videos.filter(video => {
        return props.selectedFilters.every(filter => video.filters.includes(filter));
      });
    });

    const getSlideStyle = (index) => {
      const container = carouselContainer.value;
      if (!container) return {};

      const slide = container.children[index];
      if (!slide) return {}; 
      const slideRect = slide.getBoundingClientRect();
      const slideMiddleY = slideRect.top + slideRect.height / 2;
      const thresholdY = window.innerHeight * 0.5; // 50vh from the top

      let scale;
      if (index === activeIndex.value) {
        scale = 1;
      } else if (slideMiddleY > thresholdY) {
        const distanceToThreshold = slideMiddleY - thresholdY;
        const maxDistance = window.innerHeight - thresholdY;
        const scaleFactor = Math.max(0.4, 1 - (distanceToThreshold / maxDistance));
        scale = scaleFactor;
      } else {
        scale = 1;
      }

      return {
        transform: `scale(${scale})`,
      };
    };

    const onScroll = () => {
      const container = carouselContainer.value;
      const thresholdY = window.innerHeight * 0.5; // 50vh from the top

      let closestIndex = 0;
      let closestDistance = Infinity;

      const slides = container.children;
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        const slideRect = slide.getBoundingClientRect();
        const slideMiddleY = slideRect.top + slideRect.height / 2;
        const distance = Math.abs(thresholdY - slideMiddleY);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      activeIndex.value = closestIndex;
      emit('update-video-title', {
        title: filteredvideos.value[closestIndex].title,
        image: filteredvideos.value[closestIndex].image,
        work: filteredvideos.value[closestIndex].filters.filter(filter => filter.includes('work')).map(filter => filter.replace('work_', '').replace("-", " "))
      });
    };

    const initializeScaling = () => {
      const container = carouselContainer.value;
      const slides = container.children;
      for (let i = 0; i < slides.length; i++) {
        getSlideStyle(i);
      }
    };

    onMounted(() => {
      const container = carouselContainer.value;
      container.addEventListener('scroll', onScroll);
      nextTick(() => {
        initializeScaling();
        onScroll(); // Initial call to set the first active slide
      });
    });

    watch(activeIndex, (newIndex) => {
      emit('update-video-title', {
        title: filteredvideos.value[newIndex].title,
        image: filteredvideos.value[newIndex].image,
        work: filteredvideos.value[newIndex].filters.filter(filter => filter.includes('work')).map(filter => filter.replace('work_', '').replace("-", " ")),
      });
    });

    return {
      activeIndex,
      filteredvideos,
      getSlideStyle,
      carouselContainer
    };
  }
});
</script>

<style scoped>
.carousel-container {
  height: 100dvh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30vh 1.5rem 30vh;
}

.slide {
  width: 100%;
  height: 25vh;
  margin: 5px 0;
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  scroll-snap-align: start;
}

.video-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
}

</style>
