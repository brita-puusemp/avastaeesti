<template>
  <div>
    <!-- Modal -->
    <div v-if="modalIsOpen" class="modal-overlay" @click.self="$emit('event-close-modal')">
      <div class="modal-container">
        <div class="modal-content">

          <div class="modal-header d-flex justify-content-between align-items-center">
            <h1 class="modal-title fs-5">
              <slot name="title"></slot>
            </h1>
            <button type="button" class="btn-close" @click="$emit('event-close-modal')" aria-label="Close"/>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer mt-3">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props:{
    modalIsOpen: Boolean
  }
};
</script>
