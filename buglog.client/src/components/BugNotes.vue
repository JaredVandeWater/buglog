<template>
  <div class="row">
    <div class="col">
      <h1>Notes</h1>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <img class="prof-pic rounded-circle" :src="note.creator.picture" :alt="note.creator.name" :title="note.creator.name">
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { bugsService } from '../services/BugsService'
import { useRoute, useRouter } from 'vue-router'
import $ from 'jquery'
export default {
  props: {
    note: { type: Object, required: true }
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      bug: computed(() => AppState.currentBug),
      notes: computed(() => AppState.currentNotes),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      bugEdit: {}
    })

    return {
      state,
      closedChanger(c) {
        if (c) {
          return 'Closed'
        } return 'Open'
      },
      async closeBug() {
        try {
          if (await Notification.confirmAction('You are about to close this bug.', 'this cannot be undone!', 'warning', 'Confirm')) {
            bugsService.closeBug(state.bug.id)
            router.push({ name: 'Bugs' })
          }
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },
      editBug() {
        state.bugEdit.title = state.bug.title
        state.bugEdit.description = state.bug.description
      },
      async updateBug() {
        try {
          $('#bugEdit').modal('hide')
          bugsService.updateBug(state.bugEdit, route.params.id)
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },
      timeFixer(t) {
        const d = new Date(t)
        const ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d)
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
        return `${mo}/${da}/${ye}`
      }
    }
  }
}

</script>
<style>
.my-open{

    border: solid;
    padding: .2rem;
    background-color: #99ff6b;
}
.my-close{

    border: solid;
    padding: .2rem;
    background-color: #ff9e9e;
}

.prof-pic{
  max-height: 2rem;
}
.wrapper{
 overflow-wrap: anywhere;
}
</style>
