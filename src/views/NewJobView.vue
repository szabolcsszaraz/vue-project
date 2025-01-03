<script>
import { useJobStore } from '@/stores/jobStore'

export default {
  name: 'NewJobView',
  data() {
    return {
      isSubmitting: false,
      form: {
        title: '',
        company: '',
        location: '',
        type: '',
        minSalary: null,
        maxSalary: null,
        description: ''
      },
      errors: {
        title: '',
        company: '',
        location: '',
        type: '',
        minSalary: '',
        maxSalary: '',
        description: ''
      }
    }
  },
  computed: {
    store() {
      return useJobStore()
    },
    isEditing() {
      return this.$route.query.edit === 'true'
    }
  },
  methods: {
    validateForm() {
      let isValid = true
      this.errors = {
        title: '',
        company: '',
        location: '',
        type: '',
        minSalary: '',
        maxSalary: '',
        description: ''
      }

      // Validácia title
      if (!this.form.title.trim()) {
        this.errors.title = 'Názov pozície je povinný'
        isValid = false
      }

      // Validácia company
      if (!this.form.company.trim()) {
        this.errors.company = 'Názov spoločnosti je povinný'
        isValid = false
      }

      // Validácia location
      if (!this.form.location.trim()) {
        this.errors.location = 'Lokalita je povinná'
        isValid = false
      }

      // Validácia type
      if (!this.form.type) {
        this.errors.type = 'Vyberte typ práce'
        isValid = false
      }

      // Validácia salary
      if (!this.form.minSalary || this.form.minSalary < 0) {
        this.errors.minSalary = 'Zadajte platný minimálny plat'
        isValid = false
      }

      if (!this.form.maxSalary || this.form.maxSalary <= this.form.minSalary) {
        this.errors.maxSalary = 'Maximálny plat musí byť väčší ako minimálny'
        isValid = false
      }

      // Validácia description
      if (!this.form.description.trim()) {
        this.errors.description = 'Popis pozície je povinný'
        isValid = false
      } else if (this.form.description.trim().length < 50) {
        this.errors.description = 'Popis musí mať aspoň 50 znakov'
        isValid = false
      }

      return isValid
    },

    async submitForm() {
      if (!this.validateForm()) return

      this.isSubmitting = true

      try {
        const jobData = {
          ...this.form,
          salary: `${this.form.minSalary}-${this.form.maxSalary}`
        }

        if (this.isEditing) {
          // Pridaj id pre job data ked editujem
          const jobId = parseInt(this.$route.params.id)
          await this.store.updateJob({
            ...jobData,
            id: jobId
          })
        } else {
          // Generovanie novej id pri vytvaranie job
          jobData.id = Date.now()
          this.store.jobs.push(jobData)
          this.store.saveToLocalStorage()
        }

        // Presmerovanie ked je submit schvaleny
        this.$router.push('/')
      } catch (error) {
        console.error('Chyba pri ukladaní:', error)
      } finally {
        this.isSubmitting = false
      }
    },

    async loadJobData() {
      if (this.isEditing && this.$route.params.id) {
        const job = this.store.jobs.find(
          job => job.id === parseInt(this.$route.params.id)
        )

        if (job) {
          // min - max
          const [minSalary, maxSalary] = job.salary.split('-').map(Number)

          // Nacitanie existujuces data do form
          this.form = {
            title: job.title,
            company: job.company,
            location: job.location,
            type: job.type,
            minSalary,
            maxSalary,
            description: job.description
          }
        } else {
          // ked job sa nenajde
          this.$router.push('/')
        }
      }
    }
  },
  created() {
    this.loadJobData()
  }
}
</script>
<template>
  <div class="container py-4">
    <h1 class="mb-4">{{ isEditing ? 'Upraviť ponuku' : 'Pridať novú ponuku' }}</h1>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="submitForm" novalidate>
          <div class="mb-3">
            <label class="form-label">Názov pozície *</label>
            <input
              type="text"
              class="form-control"
              v-model="form.title"
              :class="{ 'is-invalid': errors.title }"
              required
            >
            <div class="invalid-feedback">
              {{ errors.title }}
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Spoločnosť *</label>
            <input
              type="text"
              class="form-control"
              v-model="form.company"
              :class="{ 'is-invalid': errors.company }"
              required
            >
            <div class="invalid-feedback">
              {{ errors.company }}
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Lokalita *</label>
            <input
              type="text"
              class="form-control"
              v-model="form.location"
              :class="{ 'is-invalid': errors.location }"
              required
            >
            <div class="invalid-feedback">
              {{ errors.location }}
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Typ práce *</label>
            <select
              class="form-select"
              v-model="form.type"
              :class="{ 'is-invalid': errors.type }"
              required
            >
              <option value="">Vyberte typ práce</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
            </select>
            <div class="invalid-feedback">
              {{ errors.type }}
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label">Minimálny plat (EUR) *</label>
              <input
                type="number"
                class="form-control"
                v-model.number="form.minSalary"
                :class="{ 'is-invalid': errors.minSalary }"
                min="0"
                required
              >
              <div class="invalid-feedback">
                {{ errors.minSalary }}
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label">Maximálny plat (EUR) *</label>
              <input
                type="number"
                class="form-control"
                v-model.number="form.maxSalary"
                :class="{ 'is-invalid': errors.maxSalary }"
                :min="form.minSalary"
                required
              >
              <div class="invalid-feedback">
                {{ errors.maxSalary }}
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Popis pozície *</label>
            <textarea
              class="form-control"
              v-model="form.description"
              :class="{ 'is-invalid': errors.description }"
              rows="5"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ errors.description }}
            </div>
          </div>

          <div class="d-flex gap-2">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="isSubmitting"
            >
              <span
                v-if="isSubmitting"
                class="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              {{ isEditing ? 'Uložiť zmeny' : 'Pridať ponuku' }}
            </button>
            <router-link to="/" class="btn btn-secondary">
              Zrušiť
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
