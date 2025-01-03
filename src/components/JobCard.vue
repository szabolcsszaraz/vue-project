<script>
import { useJobStore } from '@/stores/jobStore.js'

export default {
  name: 'JobCard',
  props: {
    job: {
      type: Object,
      required: true
    }
  },
  computed: {
    store() {
      return useJobStore()
    },
    isFavorite() {
      return this.store.favorites.includes(this.job.id)
    },
    truncatedDescription() {
      return this.job.description.length > 150
        ? this.job.description.slice(0, 150) + '...'
        : this.job.description
    }
  },
  methods: {
    toggleFavorite() {
      this.store.toggleFavorite(this.job.id)
    }
  }
}
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <h5 class="card-title">{{ job.title }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ job.company }}</h6>
        </div>
        <button class="btn btn-link" @click.stop="toggleFavorite">
          <i :class="['bi', isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart']"></i>
        </button>
      </div>
      <p class="card-text">
        <i class="bi bi-geo-alt"></i> {{ job.location }}
        <span class="mx-2">|</span>
        <i class="bi bi-clock"></i> {{ job.type }}
        <span class="mx-2">|</span>
        <i class="bi bi-cash"></i> {{ job.salary }} EUR
      </p>
      <p class="card-text">{{ truncatedDescription }}</p>
      <router-link :to="{ name: 'job-detail', params: { id: job.id }}" class="btn btn-primary">
        Zobraziť detail
      </router-link>
    </div>
  </div>
</template>


