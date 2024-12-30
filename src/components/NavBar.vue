<script lang="ts">
export default {
  name: 'NavBar',
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <i class="bi bi-briefcase-fill me-2"></i>
        Pracovný Portál
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: $route.name === 'home' }" to="/">
              Ponuky práce
            </router-link>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
/* Aktívny link v navigácii */
.navbar .router-link-active {
  font-weight: bold;
}

/* Responsive úpravy */
@media (max-width: 768px) {
  .navbar-brand {
    font-size: 1.1rem;
  }

  .nav-link {
    padding: 0.5rem 0;
  }
}
</style>
