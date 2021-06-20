<template>
  <div class="row">
    <h1>{{ state.bug.title }}</h1>
  </div>
  <div class="row">
    <div class="col d-flex">
      <h2 class="mr-3">
        Reporter:
      </h2>
      <h3 v-if="state.bug.creator">
        {{ state.bug.creator.name.split('@')[0] }}
      </h3>
    </div>
    <div class="col-md-3 d-flex justify-content-md-end">
      <h3 class="mr-3">
        Status:
      </h3>
      <h3
        :class="state.bug.closed ? 'my-closetext-danger' : 'my-open text-success'"
      >
        {{ closedChanger(state.bug.closed) }}
      </h3>
    </div>
  </div>
  <div class="row">
    <p>{{ state.bug.description }}</p>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      bug: computed(() => AppState.currentBug),
      notes: computed(() => AppState.currentNotes)
    })

    return {
      state,
      closedChanger(c) {
        if (c) {
          return 'Closed'
        } return 'Open'
      }
    }
  }
}

</script>
<style>

</style>
