<!-- Страница регистрации/входа -->

<script setup>
import { ref, computed, reactive } from "vue";
// хранилище аутентификации
import {useStoreAuth} from '@/stores/storeAuth'


// Store
const storeAuth = useStoreAuth()

// логин/регистр переключение
const register = ref(false);

// СМЕНА НАЗВАНИЯ ПРИ КЛИКЕ
const formTitle = computed(() => {
  return register.value ? "Регистрация" : "Логин";
});

// Хранение учетных данных
const credentials = reactive({
  email: "",
  password: "",
});

// SUBMIT
const onSubmit = () => {
  // проверка данных, если поля пустые - ошибка
  if (!credentials.email || !credentials.password) {
    alert('Введите данные для входа!')
  }
  else {
    // если данные введены
    if (register.value) {
      // передаем данные email и pass (registerUser - действие store)
      storeAuth.registerUser(credentials)
    }
    else {
      storeAuth.loginUser(credentials)
    }
  }
}
</script>

<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <!-- при клике меняет активный элемент -->
        <li :class="{ 'is-active': !register }">
          <a @click.prevent="register = false">Логин</a>
        </li>
        <li :class="{ 'is-active': register }">
          <a @click.prevent="register = true">Регистрация</a>
        </li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">
          {{ formTitle }}
        </div>

        <form @submit="onSubmit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                v-model="credentials.email"
                class="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Пароль</label>
            <div class="control">
              <input
                v-model="credentials.password"
                class="input"
                type="password"
                placeholder="Введите пароль"
              />
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary">{{ formTitle }}</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.is-active {
  border-bottom: 1px solid #48c78e;
}
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
