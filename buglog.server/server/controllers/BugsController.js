import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAllBugs)
      .get('/:id', this.getOneBug)
      .get('/:id/notes', this.getBugsNotes)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:id', this.editOpenBug)
      .delete('/:id', this.changeStatus)
  }

  async getAllBugs(req, res, next) {
    try {
      const bug = await bugsService.getAllBugs(req.query)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getOneBug(req, res, next) {
    try {
      const bug = await bugsService.getOneBug(req.params.id)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getBugsNotes(req, res, next) {
    try {
      const bug = await bugsService.getBugsNotes(req.params.id)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.createBug(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async editOpenBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.editOpenBug(req.params.id, req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async changeStatus(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.changeStatus(req.params.id, req.userInfo.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}
