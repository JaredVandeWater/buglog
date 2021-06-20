<template>
  <div class="container">
    <BugDetails />
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService'

import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await bugsService.getActiveBug(route.params.id)
        console.log(AppState.currentBug)
        await bugsService.getNotes(route.params.id)
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
.my-open{

    border: solid;
    padding: .2rem;
    background-color: #99ff6b;
}
.my-close{

    border: solid;
    padding: .2rem;
    background-color: #ff6b6b;
}
</style>
