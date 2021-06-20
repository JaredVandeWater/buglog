<template>
  <div class="row">
    <div class="col">
      <h1>Notes</h1>
    </div>
  </div>
  <div class="row wrapper my-3">
    <div class="col">
      <h1>{{ state.bug.title }}</h1>
    </div>
  </div>
  <hr>
  <div class="row align-items-baseline">
    <div v-if="state.bug.creator" class="col d-flex align-items-center">
      <h3>
        Reporter:
      </h3>
      <img class="prof-pic rounded-circle mx-2" :src=" state.bug.creator.picture" alt="">
      <h5 class="d-none d-sm-block" v-if="state.bug.creator">
        {{ state.bug.creator.name.split('@')[0] }}
      </h5>
    </div>
    <div class="col-md-3 d-flex justify-content-md-end align-items-baseline">
      <h3 class="mr-3">
        Status:
      </h3>
      <div>
        <h4 class="pt-0"
            :class="state.bug.closed ? 'my-close text-danger' : 'my-open text-success'"
        >
          {{ closedChanger(state.bug.closed) }}
        </h4>
      </div>
    </div>
  </div>
  <div class="row">
    <div v-if="state.bug.creator" class="col d-flex justify-content-between">
      <div>
        <small>Bug Created: {{ timeFixer(state.bug.createdAt) }}</small>
      </div>

      <small>Last Updated: {{ timeFixer(state.bug.updatedAt) }}</small>
    </div>
  </div>

  <div class="row mx-2 mx-sm-0 mt-3">
    <div class="col border border-dark">
      <p class="m-3">
        {{ state.bug.description }}
      </p>
    </div>
  </div>
  <div class="row mt-2">
    <div class="col">
      <button v-if="state.bug.creator && !state.bug.closed && state.account.id === state.bug.creator.id" @click="closeBug" title="Close Bug" class="btn btn-danger btn-sm">
        Close Bug
      </button>
      <b><p v-if="state.bug.closed">Closed: {{ timeFixer(state.bug.updatedAt) }}</p></b>
    </div>

    <div class="col d-flex justify-content-end">
      <button v-if="state.bug.creator && !state.bug.closed && state.account.id === state.bug.creator.id"
              @click="editBug"
              data-toggle="modal"
              type="button"
              data-target="#bugEdit"
              title="Edit Bug"
              class="btn btn-danger btn-sm"
      >
        Edit Bug
      </button>
    </div>
  </div>
  <hr>

  <div class="modal fade"
       id="bugEdit"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalCenterTitle"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="bugEdit">
            <strong>Edit Bug</strong>
          </h5>
        </div>
        <form @submit.prevent="updateBug">
          <div class="modal-body">
            <div class="d-flex flex-column">
              <label for="title">Title</label>
              <input v-model="state.bugEdit.title" type="text" required maxlength="65">
            </div>
            <div class="d-flex flex-column">
              <label for="Description">Description</label>
              <textarea v-model="state.bugEdit.description" rows="7" required></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
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
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      bug: computed(() => AppState.currentBug),
      notes: computed(() => AppState.currentNotes),
      account: computed(() => AppState.account),
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
