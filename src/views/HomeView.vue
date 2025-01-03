<script>
import { useJobStore } from '@/stores/jobStore.js'
import JobCard from '@/components/JobCard.vue'
import Pagination from '@/components/Pagination.vue'
import JobFilter from '@/components/JobFilter.vue'
import mockJobs from '@/data/jobs.json'

export default {
  name: 'HomeView',
  components: {
    JobCard, Pagination, JobFilter
  },
  data() {
    return {
      loading: true,
      currentPage: 1,
      itemsPerPage: 5
    }
  },
  computed: {
    store() {
      return useJobStore()
    },
    filteredJobs() {
      return this.store.filteredJobs
    },
    paginatedJobs() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredJobs.slice(start, end)
    },totalPages() {
      return Math.ceil(this.filteredJobs.length / this.itemsPerPage)
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page
    },
    async initializeJobs() {
      try {
        const savedJobs = localStorage.getItem('jobs')
        if (savedJobs) {
          this.store.$patch({ jobs: JSON.parse(savedJobs) })
        } else {
          this.store.$patch({ jobs: mockJobs.jobs })
        }

        const savedFavorites = localStorage.getItem('favorites')
        if (savedFavorites) {
          this.store.$patch({ favorites: JSON.parse(savedFavorites) })
        }
      } catch (error) {
        console.error('Chyba pri načítaní dát:', error)
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.initializeJobs()
  }
}
</script>

<template>
  <div class="container py-4">
    <h1 class="mb-4">Pracovné ponuky</h1>
    <JobFilter />
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Načítavam...</span>
      </div>
    </div>
    <div v-else>
      <div v-if="filteredJobs.length" class="job-list">
        <JobCard
          v-for="job in paginatedJobs"
          :key="job.id"
          :job="job"
        />
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="handlePageChange"
        />
      </div>
      <div v-else class="alert alert-info">
        Neboli nájdené žiadne pracovné ponuky podľa zadaných kritérií.
      </div>
    </div>
  </div>
</template>


