<template>
  <div v-if="note.creator" class="row m-1" :class="getnoteI() ? 'notecolor' : '' ">
    <div class="col-2 m-2">
      <div class="d-flex">
        <img class="prof-pic rounded-circle" :src="note.creator.picture" :alt="note.creator.name" :title="note.creator.name">
        <b><p class="mx-2">{{ note.creator.name.split('@')[0] }}</p></b>
      </div>
      <h6>{{ timeFixer(note.updatedAt) }}</h6>
    </div>
    <div class="col d-flex align-items-center">
      <p>{{ note.body }}</p>
    </div>
    <div class="col-1">
      <button @click="deleteNote" v-if="state.account.id === note.creator.id" class="btn btn-sm btn-danger">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { bugsService } from '../services/BugsService'
import { useRoute, useRouter } from 'vue-router'
import $ from 'jquery'
import { notesService } from '../services/NotesService'
export default {
  props: {
    note: { type: Object, required: true }
  },
  setup(props) {
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

      getnoteI() {
        const i = state.notes.indexOf(props.note)
        if (i % 2 === 0) { return true }
        return false
      },
      closedChanger(c) {
        if (c) {
          return 'Closed'
        } return 'Open'
      },
      async closeBug() {
        try {
          if (await Notification.confirmAction('You are about to close this bug.', 'This cannot be undone!', 'warning', 'Confirm')) {
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
      },
      async deleteNote() {
        try {
          if (await Notification.confirmAction('You are about to delete this note.', 'This cannot be undone!', 'warning', 'Confirm')) {
            notesService.deleteNote(props.note.id)
          }
        } catch (error) {
          Notification.toast(error.message, 'error')
        }
      }
    }
  }
}

</script>
<style>
.notecolor{
  background-color: #838c7629;
}

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
