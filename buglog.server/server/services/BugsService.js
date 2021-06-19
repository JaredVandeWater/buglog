
import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class BugsService {
  async getAllBugs(query = {}) {
    const bugs = await dbContext.Bugs.find(query).select('-description').populate('creator', 'name picture')
    return bugs
  }

  async getOneBug(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator', 'name picture').populate('notes.creator', 'name picture')
    return bug
  }

  async getBugsNotes(id) {
    const note = await dbContext.Notes.find({ bugId: id }).populate('bug')
    if (!note) {
      throw new BadRequest('incorrect note id (service)')
    }
    return note
  }

  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator')
    return bug
  }

  async editOpenBug(id, bugData) {
    const currentBug = await this.getOneBug(id)
    if (currentBug.closed) {
      throw new BadRequest('Cannot Edit closed bug')
    }

    bugData = {
      description: bugData.description,
      title: bugData.title
    }

    const bug = await dbContext.Bugs.findByIdAndUpdate(id, bugData, { new: true })
    return bug
  }

  async changeStatus(id, userId) {
    const currentBugStatus = await dbContext.Bugs
      .findOneAndUpdate({ _id: id, creatorId: userId }, { closed: true }).select('closed')
    if (!currentBugStatus) {
      throw new BadRequest('invalid id')
    }
    return currentBugStatus.closed
  }
}
export const bugsService = new BugsService()
