<template>

  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')" >

    <template #title>
      MÄNGU JUHEND
    </template>

    <template #body>
<!--todo: Mängu juhend uuesti kirjutada. -->
      Iga mänguga on sul võimalus arvata, kus asuvad need 5 ilusat paika Eestimaal. Iga pildi arvamiseks on sul 2 minutit.

      Saad salvestada asukohti ka oma lemmikutesse.
    </template>

  </Modal>

</template>


<script>

import {defineComponent} from "vue";
import Modal from "@/components/modal/Modal.vue";

export default {
  gameName: 'InstructionsModal',
  components: {Modal},
  props: {
    modalIsOpen: Boolean
  }



}



</script>



