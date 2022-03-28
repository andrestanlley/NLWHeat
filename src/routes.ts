import {Router} from 'express'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateMessageController } from './controllers/CreateMessageController'
import { Get3LastMessagesController } from './controllers/Get3LastMessagesController'
import { ProfileUserController } from './controllers/ProfileUserController'

const router = Router()


router.get("/github", (req,res)=>{
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

router.get("/signin/callback", (req,res)=>{
    const { code } = req.query
    return res.json(code);
})

router.post("/authenticate", new AuthenticateUserController().handle)

router.post("/messages", ensureAuthenticated, new CreateMessageController().handle)

router.get("/messages/last3", new Get3LastMessagesController().handle)

router.get("/profile", ensureAuthenticated, new ProfileUserController().handle)

export {router}