<script>
import { useJobStore } from '@/stores/jobStore'
import JobCard from '@/components/JobCard.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'FavoritesView',
  components: {
    JobCard,
    Pagination
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
    favoriteJobs() {
      return this.store.jobs.filter(job => this.store.favorites.includes(job.id))
    },
    totalPages() {
      return Math.ceil(this.favoriteJobs.length / this.itemsPerPage)
    },
    paginatedJobs() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.favoriteJobs.slice(start, end)
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page
    }
  },
  created() {
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
      <div v-if="favoriteJobs.length" class="job-list">
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
        Nemáte žiadne obľúbené pracovné ponuky.
        <router-link to="/" class="alert-link">Prejsť na zoznam ponúk</router-link>
      </div>
    </div>
  </div>
</template>
