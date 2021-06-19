
import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class NotesService {
  async createNote(noteData) {
    const bug = await dbContext.Notes.create(noteData)
    await bug.populate('creator').execPopulate()
    return bug
  }

  async deleteNote(id, userId) {
    const note = await dbContext.Notes.findOneAndRemove({ _id: id, creatorId: userId })
    if (!note) {
      throw new BadRequest('invalid id')
    }
    return (note + 'deleted')
  }
}
export const notesService = new NotesService()
