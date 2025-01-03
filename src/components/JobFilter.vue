<script>
import { useJobStore } from '../stores/jobStore.js'

export default {
  name: 'JobFilter',
  data() {
    return {
      filters: {
        keyword: '',
        location: '',
        type: '',
        minSalary: null,
        maxSalary: null
      }
    }
  },
  methods: {
    applyFilters() {
      const store = useJobStore()
      store.updateFilters(this.filters)
    },
    resetFilters() {
      this.filters = {
        keyword: '',
        location: '',
        type: '',
        minSalary: null,
        maxSalary: null
      }
      this.applyFilters()
    }
  }
}
</script>

<template>
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title mb-3">Filtrovať ponuky</h5>
      <form @submit.prevent="applyFilters">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label">Kľúčové slovo</label>
            <input
              type="text"
              class="form-control"
              v-model="filters.keyword"
              placeholder="Názov pozície alebo spoločnosti"
            >
          </div>
          <div class="col-md-4">
            <label class="form-label">Lokalita</label>
            <input
              type="text"
              class="form-control"
              v-model="filters.location"
              placeholder="Mesto"
            >
          </div>
          <div class="col-md-4">
            <label class="form-label">Typ práce</label>
            <select class="form-select" v-model="filters.type">
              <option value="">Všetky typy</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Minimálny plat</label>
            <input
              type="number"
              class="form-control"
              v-model.number="filters.minSalary"
              placeholder="EUR"
            >
          </div>
          <div class="col-md-6">
            <label class="form-label">Maximálny plat</label>
            <input
              type="number"
              class="form-control"
              v-model.number="filters.maxSalary"
              placeholder="EUR"
            >
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary me-2">Aplikovať filtre</button>
            <button type="button" class="btn btn-secondary" @click="resetFilters">Reset</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
