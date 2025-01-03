import { defineStore } from 'pinia'

export const useJobStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
    favorites: [],
    filters: {
      keyword: '',
      location: '',
      type: '',
      minSalary: null,
      maxSalary: null
    }
  }),

  getters: {
    filteredJobs: (state) => {
      return state.jobs.filter(job => {
        const matchesKeyword = !state.filters.keyword ||
          job.title.toLowerCase().includes(state.filters.keyword.toLowerCase()) ||
          job.company.toLowerCase().includes(state.filters.keyword.toLowerCase())

        const matchesLocation = !state.filters.location ||
          job.location.toLowerCase().includes(state.filters.location.toLowerCase())

        const matchesType = !state.filters.type || job.type === state.filters.type

        const matchesSalary = (!state.filters.minSalary ||
            parseInt(job.salary.split('-')[0]) >= state.filters.minSalary) &&
          (!state.filters.maxSalary ||
            parseInt(job.salary.split('-')[1]) <= state.filters.maxSalary)

        return matchesKeyword && matchesLocation && matchesType && matchesSalary
      })
    },

    getFavorites: (state) => {
      return state.jobs.filter(job => state.favorites.includes(job.id))
    }
  },

  actions: {
    toggleFavorite(jobId) {
      const index = this.favorites.indexOf(jobId)
      if (index === -1) {
        this.favorites.push(jobId)
      } else {
        this.favorites.splice(index, 1)
      }
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem('jobs', JSON.stringify(this.jobs))
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },

    deleteJob(jobId) {
      this.jobs = this.jobs.filter(job => job.id !== jobId)
      this.favorites = this.favorites.filter(id => id !== jobId)
      this.saveToLocalStorage()
    },

    updateFilters(filters) {
      this.filters = { ...this.filters, ...filters }
    }
  }
})
