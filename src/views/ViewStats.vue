<script setup>
import { useStoreNotes } from '@/stores/storeNotes'
import {vAutofocus} from '@/directives/vAutofocus'

// STORE
const storeNotes = useStoreNotes()


</script>

<template>
  <div class="stats">
    <table class="table is-fullwidth ">
      <thead>
        <tr>
          <th>
            Статистика
          </th>
          <th>
            Значение
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Количество заметок</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Количество символов (всех заметок)</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>