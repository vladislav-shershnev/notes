import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from '../js/firebase'
import { useStoreNotes } from '../stores/storeNotes'

// defineStore - метод для настройки хранилища, присваиваем имя
export const useStoreAuth = defineStore('storeAuth', {
  // Хранение данных
  state: () => {
    return {
      user: {}
    }
  },
  // действие (методы)
  actions: {
    //ХУК активируется при входе или регистрации пользователя
    init() {
      const storeNotes = useStoreNotes()
      onAuthStateChanged(auth, (user) => {
        // если вошли в систему тут будут пользовательские данные
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          // после авторизации перейти на главную
          this.router.push('/')
          // инициализировать заметки
          storeNotes.init()
          // или выход из системы
        } else {
          this.user = {}
          // замена истории браузера, чтобы при выходе не смог вернуться назад
          this.router.replace('/auth')
          // очистить заметки
          storeNotes.clearNotes()
        }
      });
    },


    //  РЕИСТРАЦИЯ ДАННЫХ. credentials - объект с учетными данными
    registerUser(credentials) {
      // Метод Регистрация пользователья (данные с сайта firebase)
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
        const user = userCredential.user
      }).catch((error) => {
        console.log('Ошибка')
      })
    },
    // ВХОД В СИСТЕМУ
    loginUser(credentials) {
      // код Firebaase
      signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {

        const user = userCredential.user

      }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
    },

    // ВЫХОД ИЗ СИСТЕМЫ АККАУНТА
    logoutUser() {
      signOut(auth).then(() => {
        // если выход успешен запустится этот блок

      }).catch((error) => {
        // или ошибка если 
      });
    }
  }
})
