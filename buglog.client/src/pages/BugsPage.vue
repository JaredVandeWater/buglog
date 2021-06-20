<template>
  <div class="container titlepos">
    <div class="row pt-3 pl-2">
      <h1>
        Current Bugs
      </h1>
    </div>
    <div class=" d-none d-md-block container border border-dark allBugContainer">
      <Bug v-for="b in state.bugs" :key="b.id" :bug="b" />
    </div>
    <div class=" d-block d-md-none row">
      <BugMobile v-for="b in state.bugs" :key="b.id" :bug="b" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  name: 'Bugs',
  setup() {
    onMounted(() => {
      try {
        bugsService.getAllBugs()
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
.allBugContainer{
  height: 60vh;
  overflow-y:scroll;
  max-width: 800px;

}

.titlepos{
  max-width: 800px;
}
</style>
