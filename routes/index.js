const express = require('express');
const router = express.Router();
const UserRoutes = require('./userRoutes');
const PostRoutes = require('./postRoutes');
const CollegeRoutes = require('./collegeRoutes');
const authRouter = require('./authRoutes')
const eventRouter = require('./eventRoutes');
const chatRouter = require('./chatRoutes');
router.use('/auth',authRouter)
router.use('/user', UserRoutes);
router.use('/post', PostRoutes);
router.use('/college', CollegeRoutes)
router.use('/event', eventRouter)
router.use('/chat', chatRouter)


module.exports = router;
