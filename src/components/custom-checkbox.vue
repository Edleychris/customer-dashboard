<template>
    <span class="flex items-center">
      <label class="radio-container">
        {{ label }}
        <input v-bind="$attrs" type="checkbox" v-model="checked" />
        <span class="checkmark"></span>
      </label>
    </span>
  </template>
  
  <script setup>
  import { computed, onMounted } from 'vue'
  
  const props = defineProps({
    label: String,
    modelValue: String,
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const checked = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

function getPrimaryColor() {
    return '#080056'
}
  onMounted(() => {
    const primaryColor = getPrimaryColor();
    document.documentElement.style.setProperty('--primary-color', primaryColor);
})
  </script>
  
  <style scoped>
.radio-container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  user-select: none;
}

.radio-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 5px; 
}

.radio-container:hover input ~ .checkmark {
  background-color: #ccc;
}

.radio-container input:checked ~ .checkmark {
  background-color: #080056;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.radio-container input:checked ~ .checkmark:after {
  display: block;
}

.radio-container .checkmark:after {
  left: 9px;
  top: 2px;
  width: 8px;
  height: 16px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
</style>