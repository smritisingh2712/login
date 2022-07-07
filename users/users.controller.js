const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const  user =reqquire('./user/user.model')

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.get('./audit',getAllUser)
router.post('/login',login)
router.get('/logout',logout)


module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function login (req,res,next)
{
    let username=req.body.usernamel
    let password=req.body.password
    if(authenticate(username,password))

{
    await user.findoneAndUpdate({username:username},{createdDate:Date.now})

    
    res.status(200).json({msg:'loginsuccessfull'})
}}
function logout (req,res,next)
{
    user.find(req.username).then((ruser)=>{
        ruser.online=false
        ruser.save()
    })
req.logout()
res.redirect('/')}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

