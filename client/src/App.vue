<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onMounted } from "vue";
import { reactive } from "vue";
import CardsApi from "./api/cards";
import Cards from "./components/Cards.vue";
const state = reactive({ cardsData: [] });

onMounted(async () => {
  try {
    const getCards = await CardsApi.getCards();
    state.cardsData = getCards.data.data;
  } catch (error) {
    console.log("Get Cards FAILED", error);
  }
});

const updateCard = async (updatedPayload) => {
  try {
    await CardsApi.updateCards(updatedPayload);
    const getCards = await CardsApi.getCards();
    state.cardsData = getCards.data.data;
  } catch (error) {
    console.log("FAILED TO UPDATE", error);
  }
};
</script>

<template>
  <div class="bg-gray-800 h-screen text-white">
    <header class="py-16">
      <h1 class="text-5xl font-bold text-center mb-6">Fly High</h1>
    </header>

    <Cards :data="state.cardsData" :update="updateCard" />
  </div>
</template>
