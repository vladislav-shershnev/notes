<script setup>
import {useStoreNotes} from '@/stores/storeNotes'



// PROPS
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  noteId: {
    type: String,
    required: true
  }
})

// EMITS
const emit = defineEmits(['update:modelValue'])

const storeNotes = useStoreNotes()

// close modal
const closeModal = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <div class="modal is-active p-2" @click="closeModal">
    <div class="modal-background"></div>
    <div class="modal-card" @click.stop>
      <header class="modal-card-head">
        <p class="modal-card-title">Удалить заметку?</p> <button @click="closeModal" class="delete"
          aria-label="close"></button>
      </header>
      <footer class="modal-card-foot "> <button @click="closeModal" class="button">Отмена</button> <button @click="storeNotes.deleteNote(noteId)"
          class="button is-danger">Удалить</button> </footer>
    </div>
  </div>
</template>

<style scoped></style>