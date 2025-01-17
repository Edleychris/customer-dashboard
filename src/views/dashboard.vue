<template>
  <div class="px-10">
    <section class="mt-11 mb-4 font-Nunito-Sans">
      <h5 class="font-bold text-lg text-[#1F2937]">Customers Stats Overview</h5>
      <div class="">
        <div class="w-full mt-7">
          <div
            class="p-3 md:py-10 md:px-3 flex sm:flex-row flex-col md:gap-x-[2rem] md:flex-nowrap flex-wrap justify-between rounded-[0.625rem]"
            :style="{
              'background-color': '#ffffff',
              backgroundImage: `url(${Bground})`,
            }"
          >
            <div class="flex px-3 w-full items-center">
              <div>
                <p class="font-semibold text-sm text-[#374151]">
                  Total number of Customers
                </p>
                <div class="md:flex-col gap-x-10">
                  <h3 class="flex-initial w-52 text-2xl mt-2 font-bold">
                    {{ filteredCustomers.length || "0" }}
                  </h3>
                </div>
              </div>
            </div>
            <div
              class="flex lg:flex-row sm:flex-row gap-2 lg:mt-2 sm:my-0 my-2 md:mt-4 sm:mt-4 md:flex-nowrap flex-wrap"
            >
              <button
                @click="addCustomer"
                class="bg-white flex gap-1 border-2 border-[#080056] items-center whitespace-nowrap sm:text-sm text-base font-semibold border-school-primary-color text-school-primary-color rounded-md px-2 h-12"
              >
                <span class="text-xl"> + </span>
                <p class="text-base font-semibold text-[#080056]">
                  Add Customer
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="p-0 rounded-md md:mt-10">
      <div class="md:w-[100%] bg-white border-2 border-gray-300 rounded-md">
        <div
          class="flex flex-col sm:flex-row justify-between md:items-center bg-[white] p-4 rounded-t-xl md:flex-nowrap flex-wrap"
        >
          <p
            class="text-[#102137] mt-2 capitalize md:mb-2 mb-6 whitespace-nowrap text-base md:text-lg font-extrabold font-Nunito-Sans leading-4 me-10"
          >
            Customers list
          </p>
          <div
            class="flex w-full justify-end flex-col sm:flex-row md:gap-0 gap-2"
          >
            <div class="search-box w-full me-2 md:w-[60%]">
              <div class="h-full pl-2 px-2 flex items-center">
                <SearchIcon />
              </div>
              <input
                type="text"
                class="search-input placeholder:text-sm placeholder:font-medium placeholder:text-[#344054] h-[40px] px-2 w-[100%] focus:ring-white outline-none focus:outline-none border-0"
                placeholder="Search customer"
                v-model="searchKeyword"
                @input="debouncedDoSearch"
              />
            </div>
            <div class="flex gap-2 items-center">
              <div
                class="h-[46px] border rounded-md p-[3px] flex justify-between items-center text-gray-900 shadow-sm sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <Icons name="filter" />
                <select
                  v-model="sortOrder"
                  @change="sortCustormer"
                  class="block px-2 border-none outline-none"
                >
                  <option value="new">Sort by: New - Old</option>
                  <option value="old">Sort by: Old - New</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table
            class="min-w-full bg-white rounded-t-lg overflow-hidden"
            id="myTable"
            summary="Student Information"
          >
            <thead>
              <tr
                class="bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                <th class="px-6 py-3">S/N</th>
                <th class="px-6 py-3">Customer Name</th>
                <th class="px-6 py-3 whitespace-nowrap">Email Address</th>
                <th class="px-6 py-3">Phone Number</th>
                <th class="px-6 py-3">Status</th>
                <th class="px-6 py-3">Action</th>
                <th class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody
              v-if="isTableLoading"
              class="text-gray-600 text-sm font-light"
            >
              <tr
                class="divide-gray-200 animate-pulse"
                v-for="index in 10"
                :key="index"
              >
                <td class="pl-2.5 p-3">
                  <div class="h-4 bg-gray-300 rounded"></div>
                </td>
                <td class="pl-2.5 p-3">
                  <div class="h-4 bg-gray-300 rounded"></div>
                </td>
                <td class="pl-2.5 p-3">
                  <div class="h-4 bg-gray-300 rounded"></div>
                </td>
                <td class="pl-2.5 p-3">
                  <div class="h-4 bg-gray-300 rounded"></div>
                </td>
                <td class="pl-2.5 p-3">
                  <div class="h-4 bg-gray-300 rounded"></div>
                </td>
              </tr>
            </tbody>
            <tbody v-if="!isTableLoading && filteredCustomers?.length > 0">
              <tr
                class="border-b hover:bg-gray-50 text-sm"
                v-for="(item, index) in filteredCustomers"
                :key="item?.id"
              >
                <td class="px-6 py-4 capitalize">{{ index + 1 }}</td>
                <td class="px-6 py-4 capitalize">
                  {{ item?.first_name + " " + item.surname }}
                </td>
                <td class="px-6 py-4">{{ item?.email }}</td>
                <td class="px-6 py-4">{{ item?.phone }}</td>
                <td class="px-6 py-4 capitalize">
                  <span
                    :class="
                      item.is_active
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    "
                    class="font-semibold rounded-xl px-2 py-1"
                  >
                    {{ item.is_active ? "Active" : "Inactive" }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-6">
                    <p
                      class="text-[#080056] underline whitespace-nowrap cursor-pointer"
                      @click="showCustomerInfo(item.id)"
                    >
                      View
                    </p>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-6">
                    <trash-icon
                      class="cursor-pointer"
                      @click="deleteCustomer(item.id)"
                    />
                    <edit-pen
                      class="cursor-pointer"
                      @click="updateCustomer(item.id)"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-if="customers?.length < 1 && !isTableLoading"
            class="bg-[#FFFF] flex flex-col justify-center items-center py-12 px-6 w-full"
          >
            <emptyIcon />
            <h3 class="font-bold text-xl">No Data</h3>
            <p
              class="text-gray-400 text-sm cursor-pointer font-medium transition-all hover:text-[#080056]"
            >
              Add a new customer
            </p>
          </div>
        </div>
      </div>
      <createForm
        :show="showAddCustomerModal"
        v-if="showAddCustomerModal"
        @customerAdded="handleCustomerAdded"
        @customerUpdated="handleCustomerUpdated"
        @close="showAddCustomerModal = false"
        :customerId="customerId"
      />
      <viewModal
        :show="showViewModal"
        v-if="showViewModal"
        @close="showViewModal = false"
        :customerId="customerId"
      />
      <CustomAlert
        :show="showAlert"
        :type="type"
        :message="alertMessage"
        @hide-alert="hideAlert"
      />
    </section>
    <div
      class="font-Open-Sans mt-11 text-center font-semibold text-[0.85rem] leading-[1rem] text-[#1E1E1E]"
    >
      <p>Inspiration <span>Nkiru</span> @2025</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import emptyIcon from "@/components/icons/empty-icon.vue";
import createForm from "@/components/createForm.vue";
import { useCustomerStore } from "@/stores/customer";
import { computed } from "vue";
import TrashIcon from "@/components/icons/trash-icon.vue";
import CustomAlert from "@/components/customAlert.vue";
import EditPen from "@/components/icons/edit-pen.vue";
import SearchIcon from "@/components/icons/search-icon.vue";
import viewModal from "@/components/viewModal.vue";

const store = useCustomerStore();

const customers = ref(store.customers);
const isTableLoading = ref(false);
const showAddCustomerModal = ref(false);
const showViewModal = ref(false);
const searchKeyword = ref("");
const showAlert = ref(false);
const alertMessage = ref("");
const customerId = ref("");
const type = ref("");
const sortOrder = ref("new");

const displaySuccessAlert = (alertMsg, showAlertMsg, types) => {
  alertMessage.value = alertMsg;
  showAlert.value = showAlertMsg;
  type.value = types;
  setTimeout(() => {
    hideAlert();
  }, 5000);
};

const hideAlert = () => (showAlert.value = false);
const filteredCustomers = computed(() => {
  let sortedCustomers = store.customers.filter((customer) => {
    const searchTerm = searchKeyword.value.toLowerCase();
    const isActive = customer.is_active ? "active" : "inactive";

    return (
      customer.first_name.toLowerCase().includes(searchTerm) ||
      customer.surname.toLowerCase().includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm) ||
      customer.state.toLowerCase().includes(searchTerm) ||
      (customer.phone &&
        customer.phone.toString().toLowerCase().includes(searchTerm)) ||
      isActive.toLowerCase().includes(searchTerm)
    );
  });

  if (sortOrder.value === "new") {
    sortedCustomers.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (sortOrder.value === "old") {
    sortedCustomers.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

  return sortedCustomers;
});
const deleteCustomer = (customerId) => {
  store.deleteCustomer(customerId);
  displaySuccessAlert("Delete Successful", true, "success");
};
const updateCustomer = (id) => {
  customerId.value = id;
  showAddCustomerModal.value = true;
};
const showCustomerInfo = (id) => {
  showViewModal.value = true;
  customerId.value = id;
};
const handleCustomerAdded = () => {
  displaySuccessAlert("Customer added successfully", true, "success");
};
const handleCustomerUpdated = () => {
  displaySuccessAlert("Customer updatede successfully", true, "success");
};
const addCustomer = () => {
  customerId.value = "";
  showAddCustomerModal.value = true;
};
</script>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1px 6px;
}

.icon {
  margin-right: 10px;
}

.border-color {
  border: 2px solid var(--primary-color);
}

.border-color:hover {
  color: white;
  transition: all 0.4 ease-in-out;
}
</style>
