import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [],
  }),
  actions: {
    addCustomer(customer) {
      this.customers.push(customer)
    },
    deleteCustomer(index) {
      this.customers.splice(index, 1)
    },
    updateCustomer(updatedCustomer) {
      const index = this.customers.findIndex(c => c.id === updatedCustomer.id);
      if (index !== -1) {
        this.customers[index] = updatedCustomer;
      }
    },
    getCustomerById(id) {
      return this.customers.find(customer => customer.id === id);
    }
  },
})
