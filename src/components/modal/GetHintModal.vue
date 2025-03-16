<template>

    <Modal :hint-modal-is-open="hintModalIsOpen"
           @event-close-modal="$emit('event-close-modal')" >

      <template #title>
        VIHJE
        <div id="modal-timer">{{ formattedTime }}</div>
      </template>

      <template #body>
        {{ hint }}
      </template>

      <template #footer>
        <router-link to="/game" @click.native="$emit('event-close-modal')">Tagasi pildile</router-link>
        <button @click="openMapModal" type="submit" class="btn btn-success ms-5">AVA KAARDI</button>
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
    hint: String,
    minutes: Number,
    seconds: Number

  },
  computed: {
    //meetod Vormindab minutid ja sekundid kahekohaliseks (nt 05:09)
    formattedTime() {
      const formattedMinutes = String(this.minutes).padStart(2, '0');
      const formattedSeconds = String(this.seconds).padStart(2, '0');
      return `${formattedMinutes}:${formattedSeconds}`;
    },
  },
  methods: {
    openMapModal() {
      this.$emit('event-open-map-modal-from-hint-modal')
    },
  }
}
</script>

<style scoped>

</style>