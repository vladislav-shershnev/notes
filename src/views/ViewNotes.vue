<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"

import Note from "@/components/Notes/Note.vue"
import AddEditNote from "@/components/Notes/AddEditNote.vue"
import { useStoreNotes } from "../stores/storeNotes"

// Router
// для получения данных к маршруту
const route = useRoute()

// -----------------NOTES

// ДОБАВЛЯЕМ ЗАМЕТКУ
const newNote = ref("")

// store (задаем имя)
const storeNotes = useStoreNotes()
const addEditNoteRef = ref(null)

// КНОПКА ДОБАВЛЕНИЕ ЗАМЕТКИ
const addNote = () => {
  storeNotes.addNote(newNote.value)

  // удаление текста из поля после добавления заметки
  newNote.value = ""
  // фокусировака на поле ввода
  addEditNoteRef.value.focusTextarea()
}


</script>

<template>
  <div class="notes">
    <AddEditNote v-model="newNote" placeholder="Добавить новую заметку" ref="addEditNoteRef">
      <!-- v-slot:buttons -->
      <template #buttons>
        <button @click="addNote" :disabled="!newNote" class="button is-link has-background-success">
          Добавить заметку
        </button>
      </template>
    </AddEditNote>

    <!-- load bar Bulma -->
    <!-- если заметки еще не были загружены, отобразим -->
    <progress v-if="!storeNotes.notesLoaded" progress class="progress is-success" max="100" />

    <template v-else>
      <!-- Для получения данных для дочернего компонента:note="note" (пропс="компонент") -->
      <!-- обращаемся к стор и в его данные storeNotes.notes -->
      <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />

      <!-- отобразится если массив заметок в хранилище пуст -->
      <div v-if="!storeNotes.notes.length"
        class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6">
        Нет заметок...
      </div>
    </template>
  </div>
</template>

<style scoped></style>
