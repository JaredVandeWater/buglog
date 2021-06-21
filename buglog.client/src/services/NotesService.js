import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async createNote(noteData) {
    const res = await api.post('api/notes', noteData)
    AppState.currentNotes = [...AppState.currentNotes, res.data]
  }

  async deleteNote(id) {
    await api.delete(`api/notes/${id}`)
    AppState.currentNotes = AppState.currentNotes.filter(n => n.id !== id)
  }
}
export const notesService = new NotesService()
