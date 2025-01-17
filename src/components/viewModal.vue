<template>
  <Transition name="modal">
    <div
      v-if="show"
      ref="modal"
      class="fixed z-50 flex top-0 left-0 overflow-scroll h-[100%] w-[100%] bg-black/50"
    >
      <div
        class="modal-con font-Nunito-Sans w-full sm:w-[600px] bg-white relative rounded-lg border flex flex-col shadow-2xl m-auto py-4"
      >
        <div class="px-6 mb-6">
          <h2 class="text-lg font-bold mb-2 capitalize">View Customer's Details</h2>
        </div>
        <div class="flex justify-end w-full px-6 mb-4">
          <span
            :class="
              customer?.is_active
                ? 'bg-green-200 text-green-800'
                : 'bg-red-200 text-red-800'
            "
            class="font-semibold text-sm rounded-xl px-2 py-1 flex items-center"
          >
            {{ customer?.is_active ? "Active" : "Inactive" }}
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 px-6">
          <div class="flex flex-col gap-2 text-sm">
            <p class="text-gray-400 font-normal">Full Name</p>
            <p class="font-medium">
              {{ customer?.first_name + " " + customer?.surname }}
            </p>
          </div>
          <div class="flex flex-col gap-2 text-sm">
            <p class="text-gray-400 font-normal">Email Address</p>
            <p class="font-medium">{{ customer?.email }}</p>
          </div>
          <div class="flex flex-col gap-2 text-sm">
            <p class="text-gray-400 font-normal">Phone Number</p>
            <p class="font-medium">{{ customer?.phone }}</p>
          </div>
          <div class="flex flex-col gap-2 text-sm">
            <p class="text-gray-400 font-normal">State</p>
            <p class="font-medium">{{ customer?.state }}</p>
          </div>
          <div class="flex flex-col gap-2 text-sm">
            <p class="text-gray-400 font-normal">Time Created</p>
            <p class="font-medium">{{ formatCreatedAtTime(customer?.createdAt) }}</p>
          </div>
          <div class="flex flex-col gap-2 text-sm">
            <p class="text-gray-400 font-normal">Date Created</p>
            <p class="font-medium">{{ formatCreatedAt(customer?.createdAt) }}</p>
          </div>
          <div class="flex flex-col gap-2 text-sm col-span-full">
            <p class="text-gray-400 font-normal">Description</p>
            <textarea
              class="font-medium border-2 rounded-md p-2 h-28 border-gray-400"
              v-model="description"
              disabled
              name=""
              id=""
            ></textarea>
          </div>
        </div>
        <div class="mt-4 flex justify-end px-6">
          <button
            @click="closeModal"
            class="rounded-lg px-8 py-2 border-2 border-[#080056] text-[#080056] font-semibold text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { computed } from "vue";
import { useCustomerStore } from "@/stores/customer";
import moment from "moment";

const store = useCustomerStore();
const props = defineProps({
  show: Boolean,
  customerId: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close"]);
const customer = ref({
    id: "",
  first_name: "",
  surname: "",
  email: "",
  phone: "",
  description: "",
  state: "",
  is_active: false,
  createdAt: new Date().toISOString(),
});
const isEditing = computed(() => {
  return props.customerId !== "";
});

const description = computed({
  get() {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = customer.value.description;
    return tempDiv.innerText || tempDiv.textContent || "";
  },
  set(value) {
    customer.value.description = value;
  },
});
const formatCreatedAtTime = (time) => {
  return moment(time).format("h:mm:ss a");
};

const formatCreatedAt = (date) => {
  return moment(date).format("MMMM Do YYYY");
};
const closeModal = () => {
  emit("close");
};
onMounted(async () => {
  if (isEditing.value) {
    const customerData = store.getCustomerById(props.customerId);
    if (customerData) {
      customer.value = { ...customerData };
    }
  }
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-con {
  max-height: 90vh;
  overflow-y: auto;
}
</style>
