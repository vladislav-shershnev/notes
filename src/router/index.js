import { createRouter, createWebHashHistory } from 'vue-router'
import { useStoreAuth } from '@/stores/storeAuth'
import ViewNotes from '@/views/ViewNotes.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewAuth from '@/views/ViewAuth.vue'

const routes = [
  {
    path: '/',
    name: 'notes',
    component: ViewNotes
  },
  {
    // id для того, чтобы знал какую заметку редактируем
    path: '/editNote/:id',
    name: 'edit-note',
    component: ViewEditNote
  },
  {
    path: '/stats',
    name: 'stats',
    component: ViewStats
  },
  {
    path: '/auth',
    name: 'auth',
    component: ViewAuth
  }
]


const router = createRouter({
  // создаем createWebHistory или 
  history: createWebHashHistory(),
  routes
})

// ЗАЩИТА НАВИАЦИИ
router.beforeEach(async (to, from) => {
  const storeAuth = useStoreAuth()
  // если пользователь не зашел в систему, не сможет перейти куда либо
  if (!storeAuth.user.id && to.name !== 'auth') {
    return { name: 'auth' }
  }
  // если вошел в систему, запрет перейти на стр регистрации
  if (storeAuth.user.id && to.name === 'auth') {
    return false
  }
})


export default router