<template>
  <div class="container">
    <BugDetails />
    <div class="row ">
      <div class="col">
        <h1>Notes</h1>
      </div>
    </div>
    <BugNotes v-for="n in state.notes" :key="n.id" :note="n" />
    <div v-if="state.user.isAuthenticated && !state.bug.closed" class="row py-2">
      <div class="col d-flex justify-content-end">
        <button
          title="Create Note"
          class="btn btn-sm btn-danger"
          type="button"
          data-toggle="modal"
          data-target="#noteCreator"
        >
          Create Note
        </button>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade"
         id="noteCreator"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="noteCreator">
              <strong>Report New Bug</strong>
            </h5>
          </div>
          <form @submit.prevent="createNote">
            <div class="modal-body">
              <div class="d-flex flex-column">
                <label for="Note">Add a Note to this bug</label>
                <textarea v-model="state.newNote.body" rows="5" required></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, watchEffect } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService'

import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import $ from 'jquery'

export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      notes: computed(() => AppState.currentNotes),
      bug: computed(() => AppState.currentBug),
      user: computed(() => AppState.user),
      newNote: {}
    })
    watchEffect(async() => {
      try {
        if (route.name === 'BugDetails') {
          await bugsService.getActiveBug(route.params.id)
          await bugsService.getNotes(route.params.id)
        }
      } catch (error) {
        Notification.toast(error.message, 'error')
      }
    })
    return {
      state,
      closedChanger(c) {
        if (c) {
          return 'Closed'
        } return 'Open'
      },
      createNote() {
        try {
          $('#noteCreator').modal('hide')
          state.newNote.bug = route.params.id
          notesService.createNote(state.newNote)
          state.newNote = {}
        } catch (error) {
          Notification.toast(error.message, 'error')
        }
      }

    }
  }
}
</script>

<style>

</style>
