<template>
  <Transition name="modal">
    <div
      v-if="show"
      ref="modal"
      class="fixed z-50 flex font-Nunito-Sans top-0 left-0 overflow-hidden h-full w-full bg-black/50"
      >
      <div
      class="modal-container font-Nunito-Sans w-[90%] md:w-[600px] py-6 bg-white relative border flex flex-col shadow-2xl  h-full overflow-y-auto"
      >
        <button
          @click="closeModal"
          class="absolute top-4 right-4 rounded-full text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          x
        </button>
        <div class="px-6 mb-6">
            <h2 class="text-lg font-bold mb-2 capitalize">{{title}}</h2>
        <p v-if="!customerId" class="text-[#374151] font-normal text-base">
          Enter the following to add a new customer
        </p>
        </div>

        <form @submit.prevent="createCustomer" class="space-y-6 h-full px-6 ">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="relative">
              <label
                for="first_name"
                class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-[#6B7280]"
              >
                First Name <span class="text-red-600">*</span>
              </label>
              <input
                v-validate="{required: true}"
                type="text"
                v-model="customer.first_name"
                id="first_name"
                placeholder="--Enter--"
                class="block w-full h-[40px] pl-3 pr-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset hover:bg-white focus:bg-white focus:outline-blue-50 sm:text-sm sm:leading-6 outline-none"
              />
            </div>
            <div class="relative">
              <label
                for="surname"
                class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-[#6B7280]"
              >
                Last Name <span class="text-red-600">*</span>
              </label>
              <input
              v-validate="{required: true}"
                type="text"
                v-model="customer.surname"
                id="surname"
                class="block w-full h-[40px] pl-3 pr-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset hover:bg-white focus:bg-white focus:outline-blue-50 sm:text-sm sm:leading-6 outline-none"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="relative">
              <label
                for="email"
                class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-[#6B7280]"
              >
                Email <span class="text-red-600">*</span>
              </label>
              <input
              v-validate="{required: true}"
                type="email"
                v-model="customer.email"
                id="email"
                class="block w-full h-[40px] pl-3 pr-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset hover:bg-white focus:bg-white focus:outline-blue-50 sm:text-sm sm:leading-6 outline-none"
              />
            </div>
            <div class="relative">
              <label
                for="phone"
                class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-[#6B7280]"
              >
                Phone Number
              </label>
              <input
                required
                type="number"
                v-model="customer.phone"
                id="phone"
                class="block w-full h-[40px] pl-3 pr-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset hover:bg-white focus:bg-white focus:outline-blue-50 sm:text-sm sm:leading-6 outline-none"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex gap-2 items-center ">
                <CustomCheckbox v-model="customer.is_active" class="mb-2" />
                <span class="text-sm font-medium">Make customer's account active</span>
              </div>
              <div class="relative">
              <label
                for="state"
                class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-[#6B7280]"
              >
              State <span class="text-red-600">*</span>
              </label>
              <select
                required
                id="state"
                class="text-[12.45px] pl-2 leading-[16.98px] font-Nunito-Sans font-normal rounded-md block w-full h-[40px] hover:bg-white focus:bg-white border outline-none focus:outline-blue-50"
                v-model="customer.state"
              >
              <option v-for="state in states" :key="state.id" :value="state.name">
                  {{ state.name }}
                </option>
                
              </select>
            </div>

        </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="col-span-2 h-40">
                <label
                class="bg-white px-1 text-xs font-medium text-[#6B7280]"
              for="editor"
            >
              Description <span>(Optional)</span>
            </label>
            <quill-editor v-model:content="customer.description" contentType="html" theme="snow"></quill-editor>
          </div>
        </div>
        </form>

        <div class="fixed bottom-0  bg-white shadow-lg py-4 w-full md:w-[600px] pr-12">
          <div class="flex justify-end">
            <button
              :disabled="!isFormValid"
              :class="{
                'bg-gray-400 text-gray-200 border-gray-200 border cursor-not-allowed':
                  !isFormValid,
                'bg-[#080056] text-white border border-[#080056] hover:bg-white hover:text-[#080056]':
                  isFormValid,
              }"
              @click="createCustomer"
              class="w-[150px] transition-all py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
        <CustomAlert
              :show="showAlert"
              :type="type"
              :message="alertMessage"
              @hide-alert="hideAlert"
            />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, ref } from "vue";
import CustomCheckbox from "./custom-checkbox.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCustomerStore } from "@/stores/customer";
import { reactive } from "vue";
import { nigerianStates } from "@/helper/state";
import CustomAlert from "./customAlert.vue";

const store = useCustomerStore()

const showModalLoading = ref(false);
const showAlert = ref(false);
const alertMessage = ref("");
const type = ref("");
const props = defineProps({
  show: Boolean,
  customerId: {
    type: String,
    default: "",   
  }
});
const states = ref(nigerianStates);

const emit = defineEmits(["close", "parentAdded"]);
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

const displaySuccessAlert = (alertMsg, showAlertMsg, types) => {
  alertMessage.value = alertMsg;
  showAlert.value = showAlertMsg;
  type.value = types;
  setTimeout(() => {
    hideAlert();
  }, 5000);
};

const hideAlert = () => (showAlert.value = false);

const isFormValid = computed(() => {
  return (
    customer.value.first_name &&
    customer.value.surname &&
    customer.value.email &&
    customer.value.phone &&
    customer.value.state
  );
});

const isEditing = computed(() => {
  return props.customerId !== "";
});

const title = computed(() => {
  return isEditing.value ? "Update Customer Details" : "Add New Customer";
});
const createCustomer = async () => {
//   if (!isFormValid.value) {
//     displaySuccessAlert("Please fill in all required fields.", true, "error");
//     return;
//   }
if (isEditing.value) {
    store.updateCustomer(customer.value);
    emit("customerUpdated");
    closeModal();
    return;
  } else {
      customer.value.id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        store.addCustomer(customer.value);
        emit('customerAdded')
        closeModal();
      };
  }
const closeModal = () => {
  customer.value = {
    first_name: "",
  surname: "",
  email: "",
  phone: "",
  description: "",
  state: "",
  is_active: false,
  };
  emit("close");
};
onMounted(async () => {
    if(isEditing.value){
        const customerData = store.getCustomerById(props.customerId)
        console.log(customerData, 'customer')
        if(customerData){
            customer.value = { ...customerData }
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
.modal-container {
  position: fixed; 
  top: 0;
  right: 0; 
  height: 100%;
  width: 600px; 
  margin: 0;
}
@media screen and (max-width: 768px) {
  .modal-container {
    width: 100%;
  }
    
}
</style>
