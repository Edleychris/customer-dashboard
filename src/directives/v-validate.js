export default {
  beforeMount(el, binding) {
    el.addEventListener("input", () => {
      const value = el.value;
      const { required, type } = binding.value;

      let isValid = true;
      let errorMessage = "";

      if (required && !value) {
        isValid = false;
        errorMessage = "This field is required";
      }
      if (type === "email" && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          isValid = false;
          errorMessage = "Invalid email address";
        }
      }
      if (type === "first_name" && value) {
        const namePattern = /^[A-Za-z]+$/;
        if (!namePattern.test(value)) {
          isValid = false;
          errorMessage = "First name can only contain letters.";
        }
      }

      if (type === "surname" && value) {
        const surnamePattern = /^[A-Za-z]+$/;
        if (!surnamePattern.test(value)) {
          isValid = false;
          errorMessage = "Surname can only contain letters.";
        }
      }

      if (type === "phone" && value) {
        const phonePattern = /^\d{11}$/;
        if (!phonePattern.test(value)) {
          isValid = false;
          errorMessage = "Invalid phone number. Must be 10 digits.";
        }
      }
      if (type === "state") {
        if (!value || value === "unknown") {
          errorMessage = "Please select a valid state.";
        } else {
          errorMessage = "";
        }
      }

      el.setCustomValidity(errorMessage);
      el.reportValidity();

      el.dispatchEvent(new Event("validate", { bubbles: true }));
    });
  },
};
