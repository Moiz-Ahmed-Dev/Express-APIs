const app = require('express')
const router = app.Router()
const {getUser,signupUser, loginUser, deleteUser,updateUser, getUserByID, getUserByEmail} = require('./Controller')

router.get('/get-all-users', getUser)
router.post('/login', loginUser)
router.post('/signup',signupUser)
router.delete('/delete-user-by-email',deleteUser)
router.put('/update-user',updateUser)
router.get('/get-user-by-id',getUserByID)
router.get('/get-user-by-email',getUserByEmail) 





module.exports = router