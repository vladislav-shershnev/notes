<script setup>
// вычисляемый метод
import { computed, reactive } from "vue"
import { useDateFormat } from "@vueuse/core"
import { useStoreNotes } from "@/stores/storeNotes"
import ModalDeleteNote from "./ModalDeleteNote.vue"



// PROPS
const props = defineProps({
  note: {
    type: Object,
    // обязательный реквизит для заполнения
    required: true,
  },
});

// store (задаем имя)
const storeNotes = useStoreNotes();

// ФОРМАТИРОВАНИЕ ДАТЫ
const dateFormatted = computed(() => {
  let date = new Date(parseInt(props.note.date))
  let formatterDate = useDateFormat(date, 'YYYY-MM-DD HH:mm')
  return formatterDate.value
})


// ВЫЧИСЛЯЕМЫЙ МЕТОД
// длина символов
const characterLength = computed(() => {
  let length = props.note.content.length
  // возвращаем данные content от родителя через пропс
  return  `${length}`;
})

// MODAL
const modals = reactive({
  // отображение или нет модал окна
  deleteNote: false,
});
</script>

<template>
  <div class="card mb-4">
    <div class="card-content">
      <!-- Для получения данных от родителя создаем пропс для note.content  -->
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <!-- подсчет количества символов -->
          <small class="column">{{ dateFormatted }} </small>
          <small class="column has-text-right"> символов: {{ characterLength }} </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <!-- путь(обращаемся к массиву пропса.id) -->
      <router-link :to="`/editNote/${note.id}`" class="card-footer-item"
        >Редактировать</router-link
      >
      <!-- смена на true модал окно-->
      <a
        @click.prevent="modals.deleteNote = true"
        href="#"
        class="card-footer-item"
        >Удалить</a
      >
    </footer>

    <ModalDeleteNote
      :noteId="note.id"
      v-model="modals.deleteNote"
      v-if="modals.deleteNote"
    />
  </div>
</template>

<style scoped></style>