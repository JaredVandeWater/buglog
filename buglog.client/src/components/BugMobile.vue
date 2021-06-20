<template>
  <div @click="openBug" class="row singlebug pb-1">
    <div class="card w-100">
      <div class="card-body">
        <h5 class="card-title">
          {{ bug.title }}
        </h5>
        <div class="d-flex justify-content-between">
          <h6 :class="bug.closed ? 'text-danger' : 'text-success'">
            {{ closedChanger(bug.closed) }}
          </h6>
          {{ timeFixer(bug.updatedAt) }}
        </div>
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
.singlebug{
  cursor: pointer;

}
.wrapper{
overflow-wrap: anywhere;
}
.singlebug:hover{
  background-color: rgba(0, 0, 0, 0.13);
}
</style>
