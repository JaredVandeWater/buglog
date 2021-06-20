<template>
  <div @click="openBug" class="row singlebug pt-2 align-items-center">
    <div class="col-6 d-flex justify-content-start wrapper">
      {{ bug.title }}
    </div>
    <div class="col-2 d-flex justify-content-center wrapper">
      <img class="prof-pic rounded-circle" :src="bug.creator.picture" :title="bug.creator.name.split('@')[0]" :alt="bug.creator.name.split('@')[0]">
    </div>
    <div class="col-2 d-flex justify-content-center" :class="bug.closed ? 'text-danger' : 'text-success'">
      <b><p class="m-0">
        {{ closedChanger(bug.closed) }}
      </p></b>
    </div>
    <div class="col-2 d-flex justify-content-end">
      {{ timeFixer(bug.updatedAt) }}
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
  min-width: 300px;
  cursor: pointer;

}
.wrapper{
overflow-wrap: anywhere;
}
.singlebug:hover{
  background-color: rgba(38, 80, 10, 0.109);
}

.prof-pic{
  max-height: .5rem;
}
</style>
