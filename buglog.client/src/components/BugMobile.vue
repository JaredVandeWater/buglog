<template>
  <div @click="openBug" title="Bug Details" class="row  pb-1 justify-content-center">
    <div class="card my-w shadow singlebug2">
      <div class="card-header p-1">
        <h5 class="m-1">
          {{ bug.title }}
        </h5>
      </div>
      <div class="card-body">
        <div class="d-flex">
          <p class="ml-2">
            <strong>Status:</strong>
          </p>
          <b><p class="ml-2" :class="bug.closed ? 'text-danger' : 'text-success'">
            {{ closedChanger(bug.closed) }}
          </p></b>
        </div>
        <div class="d-flex">
          <strong><p class="m-0 mx-2">Last Updated:</p></strong>
          {{ timeFixer(bug.updatedAt) }}
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end p-0 px-3">
        <p>
          {{ bug.creator.name.split('@')[0] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import Notification from '../utils/Notification'
export default {
  props: {
    bug: { type: Object, required: true }
  },
  setup(props) {
    const router = useRouter()
    return {

      closedChanger(c) {
        if (c) {
          return 'Closed'
        } return 'Open'
      },

      timeFixer(t) {
        const d = new Date(t)
        const ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d)
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
        return `${mo}/${da}/${ye}`
      },

      async openBug() {
        try {
          await router.push(`/bug/${props.bug.id}`)
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  }
}

</script>

<style>
.my-w{
  width: 85vw;
}
.singlebug2{
  cursor: pointer;

}
.wrapper{
overflow-wrap: anywhere;
}
.singlebug2:hover{
  background-color: rgba(106, 182, 55, 0.048);
}
</style>
