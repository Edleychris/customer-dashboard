export default {
    mounted(el, binding) {
        el.addEventListener("input", () => {
            const value = el.value;
            if (!value && binding.value.required) {
                el.classList.add("border-red-500");            
            } else {
                el.classList.add("border-red-500");
            }
        });
        
    },
}