<template>
  <div class="container">
    <Bug v-for="b in state.bugs" :key="b.id" :bug="b" />
  </div>
</template>

<script>
import { computed, reactive, watchEffect } from '@vue/runtime-core'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  name: 'Bugs',
  setup() {
    watchEffect(async() => {
      try {
        await bugsService.getAllBugs()
      } catch (error) {
        Notification.toast(error.message)
      }
    })
    const state = reactive({
      bugs: computed(() => AppState.allBugs)
    })
    return {
      state
    }
  }
}

</script>

<style>
</style>
