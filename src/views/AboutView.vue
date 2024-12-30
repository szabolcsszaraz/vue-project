<script>
export default {
  name: 'AboutView'
}
</script>

<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title mb-4">O aplikácii</h1>
            <div class="about-content">
              <h2 class="h5 mb-3">Vitajte na portáli pracovných ponúk</h2>
              <p>
                Náš portál ponúka jednoduchý a prehľadný spôsob vyhľadávania pracovných
                príležitostí. Používatelia si môžu:
              </p>
              <ul class="list-unstyled ps-4">
                <li class="mb-2">
                  <i class="bi bi-check2-circle text-success me-2"></i>
                  Prezerať aktuálne pracovné ponuky
                </li>
                <li class="mb-2">
                  <i class="bi bi-check2-circle text-success me-2"></i>
                  Filtrovať ponuky podľa rôznych kritérií
                </li>
                <li class="mb-2">
                  <i class="bi bi-check2-circle text-success me-2"></i>
                  Ukladať obľúbené ponuky
                </li>
                <li class="mb-2">
                  <i class="bi bi-check2-circle text-success me-2"></i>
                  Zobraziť detailné informácie o každej ponuke
                </li>
              </ul>

              <h2 class="h5 mb-3 mt-4">Kontaktné informácie</h2>
              <p>
                Pre viac informácií nás môžete kontaktovať:
              </p>
              <div class="contact-info">
                <p class="mb-2">
                  <i class="bi bi-envelope me-2"></i>
                  Email: info@pracovneponuky.sk
                </p>
                <p class="mb-2">
                  <i class="bi bi-telephone me-2"></i>
                  Tel.: +421 900 123 456
                </p>
                <p class="mb-2">
                  <i class="bi bi-geo-alt me-2"></i>
                  Adresa: Hlavná 123, 811 01 Bratislava
                </p>
              </div>

              <div class="text-center mt-4">
                <router-link to="/" class="btn btn-primary">
                  Prejsť na pracovné ponuky
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-content {
  line-height: 1.6;
}

.contact-info {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.contact-info p {
  margin-bottom: 0.5rem;
}
</style>
