<script setup>
import { reactive, ref } from "vue";
import moment from "moment";
import { h } from "vue";
import { NButton, NTag } from "naive-ui";
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
const createColumns = ({ editItem }) => {
  return [
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Available",
      key: "avaiable",
    },
    {
      title: "Available Amount last updated",
      key: "updatedAt",
      render(row) {
        return h(
          NTag,
          {
            style: {
              backgroundColor: getDateColors(row.updatedAt),
            },
          },
          {
            default: () => row.updatedAt,
          }
        );
      },
    },
    {
      title: "Amount to be paid",
      key: "amount",
    },
    {
      title: "Last Date to Pay Bill",
      key: "date",
      render(row) {
        return h(
          NTag,
          {
            style: {
              width: "100px",
              backgroundColor:
                row.amount !== 0
                  ? getDateColors(row.date, row.amount)
                  : "#05ACFF",
            },
          },
          {
            default: () => row.date,
          }
        );
      },
    },
    {
      title: "Action",
      key: "actions",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => editItem(row),
          },
          { default: () => " ✏️ Edit " }
        );
      },
    },
  ];
};

function daysBetween(first, second) {
  // Copy date parts of the timestamps, discarding the time parts.
  var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
  var two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

  // Do the math.
  var millisecondsPerDay = 1000 * 60 * 60 * 24;
  var millisBetween = two.getTime() - one.getTime();
  var days = millisBetween / millisecondsPerDay;

  // Round down.
  return Math.floor(days);

  // it will return date difference in days
}

function getDateColors(inputDate) {
  const key = daysBetween(new Date(inputDate), new Date());
  switch (key) {
    case 0:
      return "#78FF03";
    case 1:
      return "#FAFF03";
    case 2:
      return "#FFAD03";

    default:
      return "#FF5703";
  }
}

const columns = createColumns({
  editItem(val) {
    state.isModalOpen = true;
    state.activeItem = Object.assign(val);
    let currentTime = new Date(val.date).getTime();
    timestamp.value = currentTime;
    amountToBePaid.value = val.amount;
    avaiableAmount.value = val.avaiable;
  },
});

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
};

const handelModal = () => {
  state.isModalOpen = !state.isModalOpen;
};
</script>

<template>
  <div>
    <vue-final-modal
      v-model="state.isModalOpen"
      classes="modal-container flex justify-center relative col max-h-full text-black"
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
        </div>
      </div>
      <div class="modal__action flex gap-3 text-black">
        <n-button type="primary " @click="handelModal" class="text-black">
          Cancel
        </n-button>
        <n-button type="primary" @click="handleConfirm" class="text-black">
          Save
        </n-button>
      </div>
    </vue-final-modal>
  </div>

  <n-data-table :columns="columns" :data="props.data" />
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

<style>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}

.n-data-table .n-data-table-th .n-data-table-th__title-wrapper {
  width: 150px;
}
</style>
