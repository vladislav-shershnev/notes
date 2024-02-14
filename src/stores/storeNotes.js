import { defineStore } from 'pinia'
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query, orderBy, addDoc } from "firebase/firestore"
// выгружаем базу данных
import { db } from '@/js/firebase'
import { useStoreAuth } from '../stores/storeAuth'



// коллекция useResizeObserver, id пользователя
let notesCollectionRef
let notesCollectionQuery

let getNoteSnapshot = null

// defineStore - метод для настройки хранилища, присваиваем имя
export const useStoreNotes = defineStore('storeNotes', {
  // Хранение данных
  state: () => {
    return {
      // массив заметок
      notes: [
        // перенесен  в  async getNotes() 
        // {
        //   id: 'id1',
        //   content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur explicabo tempore ab facilis consequatur'
        // },
        // {
        //   id: 'id2',
        //   content: 'This is a shorter note!'
        // }
      ],
      // Прогресс загрузки
      notesLoaded: false

    }
  },
  // действие (методы)
  actions: {

    init() {
      const storeAuth = useStoreAuth()

      // коллекция useResizeObserver, id пользователя
      notesCollectionRef = collection(db, "users", storeAuth.user.id, 'notes')
      notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"))
      // получение заметок пользователя
      this.getNotes()
    },

    // получение заметок (код из документации firebase)
    // при использовании метода await делаем асинхронно
    async getNotes() {
      this.notesLoaded = false

      // отписка от прослушивания , чтобы у другого пользователя не отображались новые заметки другого польз
      if (getNoteSnapshot) getNoteSnapshot()

      // Код из документации firebase
      // обновление данных
      // "notes" - заметки из firebase
      getNoteSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            // добавляем дату в заметки
            date: doc.data().date
          }
          // ссылаемся на наш массив заметок и добавляем данные из БД
          notes.push(note)
        })
        this.notes = notes
        this.notesLoaded = true

      })

    },

    // ОЧИСТИТЬ ЗАМЕТКИ ПОСЛЕ ВЫХОДА ПОЛЬЗОВАТЕЛЯ
    clearNotes() {
      this.notes = []
    },

    async addNote(newNoteContent) {
      // // генерирует временную метку текущ даты для id в мс
      let currentDate = new Date().getTime(),
        // преобразуем в строку
        date = currentDate.toString()


      // АВТОГЕНЕРАЦИЯ ID FIREBASE
      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date: date
      })

    },
    // УДАЛИТЬ ЗАМЕТКУ
    async deleteNote(idToDelete) {
      // удалить заметку и удалить из БД firebase
      await deleteDoc(doc(notesCollectionRef, idToDelete))
    },
    // ОБНОВЛЕНИЕ ЗАМЕТКИ
    async updateNote(id, content) {

      // обновление через firebase
      await updateDoc(doc(notesCollectionRef, id), {
        content: content
      });

    }
  },
  // ПОЛУЧЕНИЕ ДАННЫХ
  // getters - это свойство хранилища, которое предоставляет возможность получить данные из состояния хранилища. В данном случае, мы определили геттер getNoteContent, который возвращает содержимое первой заметки из массива notes.
  getters: {
    // получатель данных. state представляет собой функцию, которая возвращает объект состояния хранилища. В данном случае, состояние хранилища содержит массив заметок.
    getNoteContent: (state) => {
      // обязательно нужно возвращать полученные данные
      return (id) => {
        // возвращаем заметку равную id и извлечь контент
        return state.notes.filter(note => { return note.id === id })[0].content
      }
    },
    // ОБЩЕЕ КОЛ-ВО ЗАМЕТОК
    // state - для получения доступа к массиву заметок
    totalNotesCount: (state) => {
      return state.notes.length
    },
    // ОБЩЕЕ КОЛ-ВО СИМВОЛОВ
    totalCharactersCount: (state) => {
      let count = 0
      state.notes.forEach(note => {
        count += note.content.length
      })
      return count
    }
  }
})
