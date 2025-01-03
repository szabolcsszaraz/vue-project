<script>
import { useJobStore } from '../stores/jobStore.js'

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
      showDeleteModal: false
    }
  },
  computed: {
    store() {
      return useJobStore()
    },
    job() {
      return this.store.jobs.find(job => job.id === parseInt(this.id))
    },
    isFavorite() {
      return this.store.favorites.includes(parseInt(this.id))
    },
  },
  methods: {
    toggleFavorite() {
      this.store.toggleFavorite(parseInt(this.id))
    },
    confirmDelete() {
      this.showDeleteModal = true
    },
    deleteJob() {
      this.store.deleteJob(parseInt(this.id))
      this.showDeleteModal = false
      this.$router.push('/')
    },
    editJob() {
      this.$router.push({
        name: 'new-job',
        query: { edit: 'true' },
        params: { id: this.id }
      })
    }
  }
}
</script>

<template>
  <div class="container py-4">
    <div v-if="job" class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h1 class="card-title h2">{{ job.title }}</h1>
            <h2 class="card-subtitle h5 mb-3 text-muted">{{ job.company }}</h2>
          </div>
          <button
            class="btn btn-link"
            @click="toggleFavorite"
          >
            <i :class="['bi', isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart']"></i>
          </button>
        </div>

        <div class="job-details mb-4">
          <p class="mb-2">
            <i class="bi bi-geo-alt"></i> {{ job.location }}
          </p>
          <p class="mb-2">
            <i class="bi bi-clock"></i> {{ job.type }}
          </p>
          <p class="mb-2">
            <i class="bi bi-cash"></i> {{ job.salary }} EUR
          </p>
        </div>

        <h3 class="h5">Popis pozície</h3>
        <p class="card-text">{{ job.description }}</p>

        <div class="mt-4">
          <button
            class="btn btn-warning me-2"
            @click="editJob"
          >
            Upraviť
          </button>
          <button
            class="btn btn-danger me-2"
            @click="confirmDelete"
          >
            Vymazať
          </button>
          <router-link
            to="/"
            class="btn btn-secondary"
          >
            Späť na zoznam
          </router-link>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-danger">
      Pracovná ponuka nebola nájdená.
    </div>

    <!-- Vymaz Modal -->
    <div
      v-if="showDeleteModal"
      class="modal fade show"
      style="display: block;"
      tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Potvrdiť vymazanie</h5>
            <button
              type="button"
              class="btn-close"
              @click="showDeleteModal = false"
            ></button>
          </div>
          <div class="modal-body">
            Naozaj chcete vymazať túto pracovnú ponuku?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showDeleteModal = false"
            >
              Zrušiť
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteJob"
            >
              Vymazať
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showDeleteModal"
      class="modal-backdrop fade show"
    ></div>
  </div>
</template>
