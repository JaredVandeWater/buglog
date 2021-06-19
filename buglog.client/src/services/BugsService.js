import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { api } from './AxiosService'

class BugsService {
  async getAllBugs() {
    const res = await api.get('api/bugs')
    AppState.allBugs = res.data
  }

  async getActiveBug(id) {
    const res = await api.get(`api/bugs/${id}`)
    AppState.currentBug = res.data
  }

  async getNotes(id) {
    const res = await api.get(`api/bugs/${id}/notes`)
    AppState.currentNotes = res.data
  }
}
export const bugsService = new BugsService()
