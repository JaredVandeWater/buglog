<template>
  <div class="container">
    <BugDetails />
    <BugNotes v-for="n in state.notes" :key="n.id" :note="n" />
  </div>
</template>

<script>
import { computed, reactive, watchEffect } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService'

import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'

export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      try {
        if (route.name === 'BugDetails') {
          await bugsService.getActiveBug(route.params.id)
          await bugsService.getNotes(route.params.id)
        }
      } catch (error) {
        Notification.toast(error.message)
      }
    })
    const state = reactive({
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
