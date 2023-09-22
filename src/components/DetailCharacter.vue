<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { clientAxios } from "../../config/clientAxios";
import LazyLoadImages from "./LazyLoadImages.vue";

const route = useRoute();
const routeParams = computed(() => route.params);
const character = ref({});

const fetchCharacterById = async () => {
  const { id } = routeParams.value;
  try {
    const { data } = await clientAxios(`${id}`);
    character.value = data;
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  fetchCharacterById();
});
const formatDate = (date) => {
  const dateFormat = new Date(date);
  return dateFormat?.toLocaleDateString();
};
</script>

<template>
  <div
    class="container animate__fadeIn animate__animated d-flex justify-content-center align-items-center center"
  >
    <div class="col-12 mt-2 margin-top">
      <div>
        <router-link :to="{ name: 'home' }" class="detail-color-link"
          ><span>&larr;</span>Regrear al listado</router-link
        >
      </div>
      <h1 class="mb-5">
        Informacion del personaje:
        <span class="detail-color">{{ character.name }}</span>
      </h1>
      <div class="w-100 d-flex flex-sm-row flex-column align-items-start">
        <LazyLoadImages
          :src="character.image"
          :alt="character.name"
          class="img-detail"
        />
        <div class="card-body d-flex flex-column justify-content-start">
          <h2 class="card-title">
            Ubicacion:
            <span class="detail-color">{{ character?.location?.name }}</span>
          </h2>
          <p class="text-detail">
            Especie: <span class="detail-color">{{ character?.species }}</span>
          </p>
          <p class="text-detail">
            Origen:
            <span class="detail-color">{{ character?.origin?.name }}</span>
          </p>
          <p class="text-detail">
            Género: <span class="detail-color">{{ character?.gender }}</span>
          </p>
          <p class="text-detail">
            Género:
            <span
              :class="`${
                character?.status === 'Alive'
                  ? 'detail-color'
                  : 'detail-color-alt'
              }`"
              >{{ character?.status }}</span
            >
          </p>
          <p v-if="character?.episode?.length" class="text-detail">
            Numero de episodios que ha participado:
            <span class="badge-detail">{{ character?.episode?.length }}</span>
          </p>
          <p class="text-detail">
            Fecha de creacion:
            <span class="detail-color">{{
              formatDate(character.created)
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.img-detail {
  margin-right: 2rem;
}
.img-detail > figure {
  border-radius: 2rem;
}
.center {
  height: 70vh;
}
@media (max-width: 575px) {
  .margin-top {
    margin-top: 9rem !important;
  }
}
</style>
