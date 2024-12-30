<script>
export default {
  name: 'JobDetailView',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 500)
  }
}
</script>

<template>
  <div class="container py-4">
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Načítavam...</span>
      </div>
    </div>
    <div v-else class="card">
      <div class="card-body">
        <h1 class="card-title h2">Job Title</h1>
        <!-- Job detaily pojdu sem-->
      </div>
    </div>
  </div>
</template>
