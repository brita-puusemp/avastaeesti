<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')" >
    <template #title>
      <h1>Kaart</h1>
    </template>

  </Modal>


</template>


<script>

import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'MapModal',
  components: {Modal},
  props:{
    modalIsOpen: Boolean
  }
};


</script>