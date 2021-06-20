<template>
  <div class="row wrapper my-3">
    <div class="col">
      <h1>{{ state.bug.title }}</h1>
    </div>
  </div>
  <div class="row align-items-center">
    <div v-if="state.bug.creator" class="col d-flex ">
      <h2 class="mr-3">
        Reporter:
      </h2>
      <img class="prof-pic rounded-circle " :src=" state.bug.creator.picture" alt="">
      <h3 class="d-none d-sm-block" v-if="state.bug.creator">
        {{ state.bug.creator.name.split('@')[0] }}
      </h3>
    </div>
    <div class="col-md-3 d-flex justify-content-md-end">
      <h3 class="mr-3">
        Status:
      </h3>
      <div>
        <h3 class="PT-0"
            :class="state.bug.closed ? 'my-close text-danger' : 'my-open text-success'"
        >
          {{ closedChanger(state.bug.closed) }}
        </h3>
      </div>
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
      <button v-if="state.bug.creator && !state.bug.closed && state.account.id === state.bug.creator.id" @click="closeBug" title="Edit Bug" class="btn btn-danger btn-sm">
        Edit Bug
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { bugsService } from '../services/BugsService'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      bug: computed(() => AppState.currentBug),
      notes: computed(() => AppState.currentNotes),
      account: computed(() => AppState.account)
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
