<template>
  <div ref="imageContainer">
    <figure>
      <img :src="src" :alt="alt" ref="lazyImage" />
    </figure>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  props: {
    src: String,
    alt: String,
  },
  setup(props) {
    const imageContainer = ref(null);
    const lazyImage = ref(null);

    const lazyLoadImage = () => {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };

      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.src = props.src;
            img.alt = props.alt;

            img.onload = () => {
              lazyImage.value.src = img.src;
              lazyImage.value.alt = img.alt;
              observer.unobserve(entry.target);
            };
          }
        });
      }, options);

      imageObserver.observe(imageContainer.value);
    };

    onMounted(() => {
      lazyLoadImage();
    });

    return {
      imageContainer,
      lazyImage,
    };
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
}
</style>
