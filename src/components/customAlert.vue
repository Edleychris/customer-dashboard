<template>
    <transition name="slide-fade" mode="out-in">
      <div v-if="show" aria-live="assertive"
        class="z-50 top-32 pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
          <transition enter-active-class="transform ease-out duration-300 transition"
            enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
            leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div v-if="show"
              class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div class="p-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <CheckCircleIcon v-if="props.type == 'info'" class="text-tespire-primary h-6 w-6"
                      aria-hidden="true" />
                    <checkMark v-else-if="props.type == 'success'" class="text-green-600 h-6 w-6" aria-hidden="true" />
                    <XCircleIcon v-else class="h-6 w-6 text-red-900" aria-hidden="true" />
                  </div>
                  <div class="ml-3 w-0 flex-1 pt-0.5">
                    <p class="text-sm font-medium" :class="[props.type == 'info' ? 'text-gray-900' : props.type == 'success' ? 'text-green-600' : 'text-red-900']">
                      {{ message }}</p>
                  </div>
                  <div class="ml-4 flex flex-shrink-0">
                    <button type="button" @click="show = false"
                      class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span class="sr-only">Close</span>
                      <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'
  import { XMarkIcon } from '@heroicons/vue/20/solid'
import checkMark from './icons/checkMark.vue';
  
  const emit = defineEmits(['hide-alert'])
  const props = defineProps({
    show: Boolean,
    message: String,
    type: String,
  });
  
  onMounted(() => {
    setTimeout(() => {
      hideAlert();
    }, 5000);
  });
  
  const hideAlert = () => {
    emit('hide-alert');
  };
  </script>
  
  <style>
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }
  
  .slide-fade-leave-active {
    transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
  }
  
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
  </style>