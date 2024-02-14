<script setup>
import { ref } from 'vue';
import {vAutofocus} from '@/directives/vAutofocus'

// PROPS
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  // смена цвета
  bgColor: {
    type: String,
    default: 'success'
  },
  placeholder: {
    type: String,
    default: 'Введите что тo...'
  },
  label: {
    type: String
  }
})

// EMITS
// обновление события
const emit = defineEmits(['update:modelValue'])

// FOCUS TEXTAREA
const textareaRef = ref(null)

const focusTextarea = () => {
  textareaRef.value.focus()
}

defineExpose({
  focusTextarea
})

</script>

<template>
  <div class="card p-4 mb-5" :class="`has-background-${bgColor}-dark`">

    <!-- отображать только если предоставлен атрибут label`` -->
    <label v-if="label" class="label has-text-white">{{ label }}</label>
    <div class="field">
      <div class="control">
        <!-- Привязка константы к полю ввода -->
        <!-- @input="$emit - прослушиваем событие в поле ввода, а затем отправить событие обновления модели передав последнее значение  -->
        <textarea v-autofocus :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" ref="textareaRef"
          class="textarea" :placeholder="placeholder" />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <!-- Для добавления любой кнопки -->
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>