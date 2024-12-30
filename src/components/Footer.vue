<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>


<template>
  <footer class="footer mt-auto py-3 bg-light">
    <div class="container text-center">
      <span class="text-muted">
        © {{ currentYear }} Pracovný Portál. Všetky práva vyhradené.
      </span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  background-color: #f8f9fa;
  padding: 1rem 0;
  border-top: 1px solid #dee2e6;
}
</style>
