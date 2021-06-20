import { AppState } from '../AppState'
import { api } from './AxiosService'

class BugsService {
  async getAllBugs() {
    const res = await api.get('api/bugs')
    AppState.allBugs = res.data.reverse()
  }

  async getActiveBug(id) {
    const res = await api.get(`api/bugs/${id}`)
    AppState.currentBug = res.data
  }

  async getNotes(id) {
    const res = await api.get(`api/bugs/${id}/notes`)
    AppState.currentNotes = res.data
  }

  async createBug(bugData) {
    const res = await api.post('api/bugs', bugData)
    AppState.allBugs = [res.data, ...AppState.allBugs]
    return res.data.id
  }

  async closeBug(id) {
    await api.delete(`api/bugs/${id}`)
    this.getAllBugs()
  }

  async updateBug(bugData, id) {
    const res = await api.put(`/bug/${id}`, bugData)
    AppState.currentBug = res.data
  }
}
export const bugsService = new BugsService()
