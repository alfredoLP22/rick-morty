<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { clientAxios } from "../../config/clientAxios";
import Character from "./Character.vue";
import ModalCharacter from "./ModalCharacter.vue";

const characters = ref([]);
const charactersFounded = ref([]);
const charactersFiltered = ref([]);
const searchCharacterName = ref("");
const selectedOption = ref("");
const scrollComponent = ref(null);
const showButton = ref(false);
let page = 1;
const showModal = ref(false);

const fetchCharacters = async (page = 1) => {
  try {
    const { data } = await clientAxios(`?page=${page}`);

    characters.value.push(...data.results);
  } catch (error) {
    console.log(err);
  }
};

const loadMoreCharacters = async () => {
  page++;
  await fetchCharacters(page);
};
onMounted(() => {
  fetchCharacters();
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("scroll", handleScrollToTop);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("scroll", handleScrollToTop);
});
const handleScroll = (e) => {
  let element = scrollComponent.value;
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    loadMoreCharacters();
  }
};
const handleScrollToTop = () => {
  showButton.value = window.scrollY > 500; 
}

const searchCharacter = async () => {
  showModal.value = true;
  searchCharacterName.value;
  try {
    const { data } = await clientAxios(`?name=${searchCharacterName.value}`);
    charactersFounded.value = data.results;
  } catch (error) {
    console.log(err);
  }
};
const closeModal = () => {
  showModal.value = false;
  charactersFounded.value = [];
  searchCharacterName.value = "";
};

const handleChangeValue = async () => {
  if (selectedOption.value === "cleanFilter") {
    fetchCharacters(1);
    charactersFiltered.value = [];
  } else {
    const [key, value] = selectedOption.value.split("-");
    try {
      const { data } = await clientAxios(`?${key}=${value}`);

      charactersFiltered.value = data.results;
    } catch (error) {
      console.log(err);
    }
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scroll to top
  });
};
</script>

<template>
  <div class="container animate__fadeIn animate__animated">
    <button class="return-top" @click="scrollToTop" v-if="showButton">&#8593;</button>
    <div class="d-flex w-100 justify-content-center align-items-center p-2">
      <div class="d-flex justify-content-between flex-column">
        <div class="form-group">
          <label class="h3" for="search">Buscar por nombre</label>
          <input
            id="search"
            type="text"
            placeholder="Ej: morty"
            class="form-control w-10 mt-2 p-2 p-lg-2 animate__fadeIn animate__animated border"
            v-model="searchCharacterName"
            @keyup.enter="searchCharacter"
          />
        </div>
        <div class="form-group mt-2">
          <label for="filterCharacter" class="h3">Filtrar personajes</label>
          <select
            id="filterCharacter"
            class="form-control w-10 mt-2 p-2 p-lg-2 animate__fadeIn animate__animated border"
            @change="handleChangeValue"
            v-model="selectedOption"
          >
            <option value="" disabled selected>-- Seleccione --</option>
            <option value="cleanFilter">Limpiar filtro</option>
            <optgroup label="Genero">
              <option value="gender-male">Masculino</option>
              <option value="gender-female">Femenino</option>
            </optgroup>
            <optgroup label="Especies">
              <option value="species-human">Humano</option>
              <option value="species-alien">Alien</option>
            </optgroup>
          </select>
        </div>
      </div>
    </div>
    <div class="row mb-3" ref="scrollComponent">
      <Character
        v-for="character in charactersFiltered"
        :character="character"
        class="mt-3 animate__bounceInUp animate__animated"
        v-if="charactersFiltered.length"
      />
      <Character
        v-for="character in characters"
        :character="character"
        class="mt-3 animate__bounceInUp animate__animated"
        v-else
      />
    </div>
  </div>
  <ModalCharacter
    :show-modal="showModal"
    @closeModal="closeModal"
    :charactersFounded="charactersFounded"
    class="animate__fadeIn animate__animated"
  />
</template>

<style scoped>
.return-top {
  position: fixed;
  bottom: 4rem;
  right: 3rem;
  z-index: 99;
  outline: none;
  border: 0.1rem solid rgba(0, 153, 94, 0.986);
  padding: 0.4rem;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
