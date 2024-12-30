<script>
export default {
  name: 'FavoritesView',
  data() {
    return {
      loading: true,
      favorites: []
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
    <h1 class="mb-4">Obľúbené pracovné ponuky</h1>
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Načítavam...</span>
      </div>
    </div>
    <div v-else>
      <div v-if="favorites.length" class="job-list">
        <!-- Oblubene pracovne ponuky pojdu sem -->
      </div>
      <div v-else class="alert alert-info">
        Nemáte žiadne obľúbené pracovné ponuky.
        <router-link to="/" class="alert-link">Prejsť na zoznam ponúk</router-link>
      </div>
    </div>
  </div>
</template>
