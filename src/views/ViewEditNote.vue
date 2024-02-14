<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useStoreNotes } from '@/stores/storeNotes'

// router
const route = useRoute()
const router = useRouter()

// store
const storeNotes = useStoreNotes()

// ЗАМЕТКИ
const noteContent = ref('')

// получить содержимое заметки
noteContent.value = storeNotes.getNoteContent(route.params.id)

// SAVE CLICKED
const handleSaveClicked = () => {
  // получаем id и контент из стор
  storeNotes.updateNote(route.params.id, noteContent.value)
  // перенаправление назад после сохранения
  router.push('/')
}

</script>

<template>
  <div class="edit-note">
    <AddEditNote v-model="noteContent" bgColor="link" placeholder="Edit note" label="Edit Note" ref="addEditNoteRef">
      <!-- v-slot:buttons -->
      <template #buttons>
        <button @click="$router.back()" class="button is-link is-light mr-2">
          Отмена
        </button>
        <button @click="handleSaveClicked" class="button is-link has-background-link" :disabled="!noteContent">
          Сохранить
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

