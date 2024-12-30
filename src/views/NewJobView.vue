<script>
export default {
  name: 'NewJobView',
  data() {
    return {
      form: {
        title: '',
        company: '',
        location: '',
        type: '',
        salary: '',
        description: ''
      }
    }
  },
  methods: {
    submitForm() {
      console.log('Form submitted:', this.form)
    }
  }
}
</script>

<template>
  <div class="container py-4">
    <h1 class="mb-4">Pridať novú ponuku</h1>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label class="form-label">Názov pozície *</label>
            <input type="text" class="form-control" v-model="form.title" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Spoločnosť *</label>
            <input type="text" class="form-control" v-model="form.company" required>
          </div>
          <!-- Viac form udaje pojdu sem -->
          <button type="submit" class="btn btn-primary">Pridať ponuku</button>
        </form>
      </div>
    </div>
  </div>
</template>
