<template>
  <div class="container titlepos">
    <div class="row d-none d-md-block pt-3 pl-2 ">
      <h1>
        Current Bugs
      </h1>
    </div>
    <div class=" d-block d-md-none  pt-3 pl-2 row my-b">
      <h1 class="d-flex justify-content-center">
        Current Bugs
      </h1>
    </div>
    <div class="row d-none d-md-flex mt-3">
      <div class="col-6 ">
        <b>Title</b>
      </div>
      <div class="col d-flex justify-content-between">
        <div class="mx-2">
          <b>Reporter</b>
        </div>
        <div class="mx-2">
          <b>Status</b>
        </div>
        <div class="mx-2">
          <b>Last Updated</b>
        </div>
      </div>
    </div>
    <div class=" d-none d-md-block container border border-dark allBugContainer">
      <Bug v-for="b in state.bugs" :key="b.id" :bug="b" />
    </div>
    <div class=" d-block d-md-none row allBugContainer2 ">
      <div class="p-1"></div>
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
  name: 'BugsPage',
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
.my-b{

  border-bottom: 2px solid rgba(0, 0, 0, 0.103);
}
.allBugContainer{
  height: 70vh;
  overflow-y:scroll;
  max-width: 800px;

}
.allBugContainer2{
  max-height: 75vh;
  overflow-y:scroll;
  max-width: 800px;
  overflow-x: hidden;

}
.titlepos{
  max-width: 800px;
}
</style>
