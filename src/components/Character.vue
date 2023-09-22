<script setup>
import LazyLoadImages from "./LazyLoadImages.vue";

defineProps({
  character: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="col-lg-3 col-md-4 col-sm-4 col-6">
    <div class="card h-100 w-100">
      <LazyLoadImages :src="character.image" :alt="character.name" />
      <div
        class="card-body d-flex flex-column justify-content-center align-items-start"
      >
        <p class="text-detail">
          Nombre: <span class="detail-color">{{ character.name }}</span>
        </p>
        <p class="text-detail">Especie: <span class="detail-color">{{ character.species }}</span></p>
        <p class="text-detail">Género: <span class="detail-color">{{ character.gender }}</span></p>
        <router-link
          :to="{ name: 'detail', params: { id: character.id } }"
          class="btn btn-outline-dark mt-3 btn-outline w-100"
          >Ver más</router-link
        >
      </div>
    </div>
  </div>
</template>
<style scoped></style>
