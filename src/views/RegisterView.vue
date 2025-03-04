<template>
  <div>

    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col col-4">
          <h3>Loo uus kasutaja</h3>
          <div class="input-group mb-3">
            <span class="input-group-text">E-MAIL</span>
            <input type="text" class="form-control">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">KASUTAJANIMI</span>
            <input type="text" class="form-control">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">PAROOL</span>
            <input type="password" class="form-control" >
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">KORDA PAROOLI</span>
            <input type="password" class="form-control">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'RegisterView'
}
</script>



