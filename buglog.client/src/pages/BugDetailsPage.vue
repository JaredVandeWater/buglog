<template>
  <div class="container">
    <BugDetails />
    <BugNotes />
  </div>
</template>

<script>
import { watchEffect } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService'

import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'

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
    return {
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
