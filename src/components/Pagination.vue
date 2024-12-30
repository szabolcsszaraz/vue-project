<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    maxVisiblePages: {
      type: Number,
      default: 5
    }
  },
  computed: {
    visiblePages() {
      let start = Math.max(
        Math.min(
          this.currentPage - Math.floor(this.maxVisiblePages / 2),
          this.totalPages - this.maxVisiblePages + 1
        ),
        2
      )
      let end = Math.min(start + this.maxVisiblePages - 1, this.totalPages - 1)

      if (end - start + 1 < this.maxVisiblePages) {
        start = Math.max(2, end - this.maxVisiblePages + 2)
      }

      return Array.from(
        { length: end - start + 1 },
        (_, i) => start + i
      )
    },
    showFirstPage() {
      return this.visiblePages[0] > 2
    },
    showLastPage() {
      return this.visiblePages[this.visiblePages.length - 1] < this.totalPages - 1
    },
    showLeftEllipsis() {
      return this.visiblePages[0] > 2
    },
    showRightEllipsis() {
      return this.visiblePages[this.visiblePages.length - 1] < this.totalPages - 1
    }
  },
  methods: {
    handlePageChange(page) {
      this.$emit('page-change', page)
    }
  }
}
</script>

<template>
  <nav v-if="totalPages > 1" class="mt-4">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button
          class="page-link"
          @click="handlePageChange(currentPage - 1)"
          :disabled="currentPage === 1"
        >
          Predchádzajúce
        </button>
      </li>

      <!-- First page -->
      <li v-if="showFirstPage" class="page-item" :class="{ active: currentPage === 1 }">
        <button class="page-link" @click="handlePageChange(1)">1</button>
      </li>

      <!-- Left ellipsis -->
      <li v-if="showLeftEllipsis" class="page-item disabled">
        <span class="page-link">...</span>
      </li>

      <!-- Page numbers -->
      <li
        v-for="page in visiblePages"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <button class="page-link" @click="handlePageChange(page)">
          {{ page }}
        </button>
      </li>

      <!-- Right ellipsis -->
      <li v-if="showRightEllipsis" class="page-item disabled">
        <span class="page-link">...</span>
      </li>

      <!-- Last page -->
      <li v-if="showLastPage" class="page-item" :class="{ active: currentPage === totalPages }">
        <button class="page-link" @click="handlePageChange(totalPages)">
          {{ totalPages }}
        </button>
      </li>

      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <button
          class="page-link"
          @click="handlePageChange(currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          Nasledujúce
        </button>
      </li>
    </ul>
  </nav>
</template>


