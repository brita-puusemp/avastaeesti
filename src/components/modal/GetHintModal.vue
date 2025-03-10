<template>


    <Modal :hint-modal-is-open="hintModalIsOpen"
           :hint="hint"
           @event-close-modal="$emit('event-close-modal')" >

      <template #title>
        VIHJE
      </template>

      <template #body>
        {{hint}}
      </template>

    </Modal>


</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'GetHintModal',
  components: {Modal},
  props: {
    hintModalIsOpen: Boolean,
    hint: String
  },
}
</script>



<style scoped>

</style>