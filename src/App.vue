<script>
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {NavBar, Footer},
  mounted() {
    // Inicializácia Bootstrap JavaScript pre mobilné menu
    import('bootstrap').catch(error => {
        console.error('Chyba pri načítaní Bootstrap JS:', error)
      })
  }
}
</script>

<template>

  <NavBar />

<!--  dynamicky vykresľuje komponentu na základe aktuálnej trasy-->
  <main>
    <router-view v-slot="{ Component }">
        <component :is="Component" />
    </router-view>
  </main>

  <Footer />

</template>



<style>
/* Základné štýly */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

</style>
