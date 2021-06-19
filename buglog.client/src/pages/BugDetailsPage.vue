<template>
  <div>
    {{ state.bug }}
    {{ state.notes }}
  </div>
</template>

<script>
import { computed, onMounted, reactive, watchEffect } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
export default {
  name: 'BugDetails',
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
      bug: computed(() => AppState.currentBug),
      notes: computed(() => AppState.currentNotes)
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
