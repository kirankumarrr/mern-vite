<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onMounted } from "vue";
import { reactive } from "vue";
import CardsApi from "./api/cards";
import Cards from "./components/Cards.vue";
import moment from "moment";
const state = reactive({ cardsData: [] });

const formatData = (inputRecods) => {
  const data = inputRecods.reduce((acc, item) => {
    const updatedAt = moment(item.updatedAt).format("DD-MMM-YYYY hh:mm A");
    const date = moment(item.date).format("DD-MMM-YYYY hh:mm A");
    const newR = {
      ...item,
      updatedAt,
      date,
    };
    acc.push(newR);
    return acc;
  }, []);
  return data;
};

onMounted(async () => {
  try {
    const getCards = await CardsApi.getCards();
    state.cardsData = formatData(getCards.data.data);
  } catch (error) {
    console.log("Get Cards FAILED", error);
  }
});

const updateCard = async (updatedPayload) => {
  try {
    await CardsApi.updateCards(updatedPayload);
    const getCards = await CardsApi.getCards();
    state.cardsData = formatData(getCards.data.data);
  } catch (error) {
    console.log("FAILED TO UPDATE", error);
  }
};
</script>

<template>
  <div class="bg-gray-800 h-screen text-white">
    <header>
      <h1 class="text-lg font-bold text-left py-2">Fly High</h1>
    </header>
    <Cards :data="state.cardsData" :update="updateCard" />
  </div>
</template>
