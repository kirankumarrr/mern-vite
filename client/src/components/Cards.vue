<script setup>
import { reactive, ref } from "vue";
import moment from "moment";

// const props = defineProps(["data", "update"]);
const props = defineProps({
  data: Array,
  update: Function,
});

const state = reactive({
  isModalOpen: false,
  activeItem: null,
});
const timestamp = ref(null);
const avaiableAmount = ref(0);
const amountToBePaid = ref(0);
// state.activeItem?.date ? new Date(state.activeItem.date) :

const headers = [
  { text: "Operation", value: "operation" },
  { text: "Name", value: "name", editable: "onAdd", width: 150 },
  {
    text: "Available",
    value: "avaiable",
    initialEditValue: "0",
    minWidth: "100px",
  },

  {
    text: "Available Amount last updated",
    value: "updatedAt",
    editable: "never",
    minWidth: "250px",
  },
  {
    text: "Amount to be paid",
    value: "amount",
    initialEditValue: "0",
    minWidth: "200px",
  },
  {
    text: "Last Date to Pay Bill",
    value: "date",
    type: "datetime",
    minWidth: "200px",
  },
];

const handleConfirm = async () => {
  const getDate = moment(timestamp.value);
  const amount = amountToBePaid.value;
  const avaiable = avaiableAmount.value;
  const formData = {
    ...state.activeItem,
    amount,
    avaiable,
    date: getDate,
  };
  props.update(formData);
  state.isModalOpen = false;
  //   try {
  //     const response = await CardsApi.updateCards(state.activeItem);
  //     state.isModalOpen = false;
  //   } catch (error) {}
  //   console.log("FAILED TO UPDATE", error);
  //   state.isModalOpen = false;
};
// const deleteItem = (val) => {
//   console.log("EdeleteItemDIT", val);
// };

const editItem = (val) => {
  state.isModalOpen = true;
  state.activeItem = Object.assign(val);
  let currentTime = new Date(val.date).getTime();
  timestamp.value = currentTime;
  amountToBePaid.value = val.amount;
  avaiableAmount.value = val.avaiable;
};

// const handleDateChange = (event) => {
//   console.log("handleDateChange", event);
// };

const handleChange = (event, field) => {
  //   console.log("handleChange", event, field);
  state.activeItem.avaiable = event.target.value;
  //   console.log("state.activeItem", state.activeItem);
};

const handelModal = () => {
  state.isModalOpen = !state.isModalOpen;
};

// const getDateFormat = (value) => {
//   //   const dateFrmt = moment(value).format("dd-mm-yyyy");
//   const dateFrmt = new Date(value);
//   //   console.log("dateFrmt", dateFrmt);
//   return dateFrmt;
// };
</script>

<template>
  <div>
    <!-- <vue-final-modal>
      Modal Content Here
    </vue-final-modal> -->

    <vue-final-modal
      v-model="state.isModalOpen"
      classes="modal-container flex justify-center relative col max-h-full"
      content-class="modal-content"
    >
      <button class="modal__close" @click="handelModal">
        <mdi-close></mdi-close>
      </button>
      <span class="modal__title">Update Card</span>
      <div
        class="modal__content"
        v-if="state.activeItem && Object.keys(state.activeItem).length > 0"
      >
        <div>
          <!-- <fw-label value="Bill Due Date" color="yellow"></fw-label><br /> -->
          <!-- <input
            type="number"
            placeholder="Enter Available Amount"
            @input="(event) => (state.activeItem.avaiable = event.target.value)"
          /> -->
          <n-form-item path="avaiableAmount" label="Available Amount">
            <n-input-number
              v-if="
                state.activeItem && Object.keys(state.activeItem).length > 0
              "
              clearable
              v-model:value="avaiableAmount"
              placeholder="Basic Input"
            />
          </n-form-item>
        </div>
        <div>
          <!-- <input
            type="number"
            v-if="state.activeItem && Object.keys(state.activeItem).length > 0"
            :value="state.activeItem.amount"
            placeholder="Enter Generated Amount"
            @input="(event) => (state.activeItem.amount = event.target.value)"
          /> -->
          <n-form-item
            path="amountToBePaid"
            label="Amount to Paid to Credit Card"
          >
            <n-input-number
              clearable
              v-if="
                state.activeItem && Object.keys(state.activeItem).length > 0
              "
              v-model:value="amountToBePaid"
              placeholder="Enter Generated Amount"
            />
          </n-form-item>
        </div>
        <div>
          <n-form-item path="timestamp" label="Due Date">
            <n-date-picker v-model:value="timestamp" type="date" default-value
          /></n-form-item>

          <!-- <n-date-picker
            :value="new Date(state.activeItem.date).getTime()"
            type="date"
          /> -->

          <!-- <van-date-picker v-model="currentDate" title="Choose Date" /> -->
        </div>
      </div>
      <div class="modal__action flex gap-3">
        <v-button @click="handleConfirm" class="cursor-pointer"
          >confirm</v-button
        >
        <v-button @click="handelModal" class="cursor-pointer">cancel</v-button>
      </div>
    </vue-final-modal>
    <!-- <button @click="handelModal">Open Modal</button> -->
  </div>
  <EasyDataTable :headers="headers" :items="props.data">
    <template #item-operation="item">
      <div class="flex justify-center cursor-pointer">
        <img
          src="../assets/edit_icon.png"
          class="w-5"
          @click="editItem(item)"
        />
      </div>
    </template>
  </EasyDataTable>
</template>

<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

v-button {
  padding: 0.25rem 0.5rem;
  border-width: 1px;
  border-radius: 0.25rem;
}
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>
