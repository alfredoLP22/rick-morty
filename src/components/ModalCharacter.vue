<script setup>
defineProps({
  showModal: {
    type: Object,
    required: true,
  },
  charactersFounded: {
    type: Array,
    required: true,
  },
});
defineEmits(["closeModal"]);
</script>

<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content h-75">
      <button @click="$emit('closeModal')" class="close-icon mb-3 btn">
        <img src="/icons8-close.svg" alt="" />
      </button>
      <h3 class="d-flex justify-content-center mt-5">
        Numero de resultados: <span class="detail-color pl-3">{{ charactersFounded.length }}</span>
      </h3>
      <div class="card-group">
        <div
          class="d-flex flex-column align-items-start mt-5 p-4 col-lg-6 col-md-12 col-sm-6"
          v-for="character in charactersFounded"
        >
          <figure>
            <img :src="character.image" alt="" />
          </figure>
          <div class="d-flex flex-column p-3">
            <p class="text-detail">
              Nombre: <span class="detail-color">{{ character.name }}</span>
            </p>
            <p class="text-detail">
              Especie: <span class="detail-color">{{ character.species }}</span>
            </p>
            <p class="text-detail">
              Género: <span class="detail-color">{{ character.gender }}</span>
            </p>
            <router-link
              :to="{ name: 'detail', params: { id: character.id } }"
              class="btn btn-outline-dark mt-3 btn-outline"
              >Ver más</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 40vw;
  position: relative;
}
.close-icon {
  position: absolute;
  top: 0.1rem;
  right: 0.5rem;
  padding: 0.2rem;
  margin-bottom: 0.5rem;
}
.close-icon > * {
  width: 2rem;
}
.text-bold {
  font-weight: bold;
}
.text-bold > span {
  font-weight: normal;
}
.card-info {
  background-color: rgb(221, 221, 221);
  border-radius: 0.5rem;
}
img {
  width: 100%;
  height: auto;
  border-radius: 0.3rem;
}
.pl-3 {
  padding-left: .5rem;
}

button {
  margin-top: 10px;
}

@media (max-width: 768px) {
  .modal-content {
    width: 70vw; /* Adjust the width for medium screens */
  }
}

/* Media query for small screens */
@media (max-width: 480px) {
  .modal-content {
    width: 90vw; /* Adjust the width for small screens */
    padding: 10px; /* Reduce padding for small screens */
  }

  .close-icon {
    right: 0.2rem; /* Adjust close icon position for small screens */
  }

  img {
    width: 100%; /* Make images full-width on small screens */
  }
}
</style>
