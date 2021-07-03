require('dotenv').config();
const multer  = require('multer')

const uploadDocument = multer({ dest: 'server/documents/' })
const uploadImage = multer({ dest: 'server/images/' })

const userController = require('../controllers/profile');
const postController = require('../controllers/posts')

const express = require('express');
const router = express.Router();

const {registerUser} = require('../controllers/register')
const {loginUser1} = require('../controllers/login')
const {loginUser2, updateUser} = require('../controllers/setting')

const moduleController = require('../controllers/modules')
router.get('/profile/getUsers', userController.get_all_profiles);

router.get('/profile/getImage/:id', userController.get_image)

router.get('/profile/getDocument/:name', userController.get_document)

router.get('/profile/:id', userController.user_details);

router.post("/register", registerUser)

router.post('/login', loginUser1)

router.post('/profile/auth', loginUser2)

router.put('/profile/update/settings', updateUser)

router.put("/post", postController.create_post)
router.put("/comment", postController.add_comment)
router.get("/getrec", postController.get_recent_posts)
router.put("/editpost", postController.edit_post)
router.put("/deletepost", postController.remove_post)

router.post("/createModule/:id", moduleController.create_module)
router.get("/getrecmodules", moduleController.get_recent_modules)
router.put("/deletemodule", moduleController.delete_module)


router.put('/profile/edit/:id', userController.user_updates)

router.post('/profile/editImage/:id',
	uploadImage.fields([
		{ name: 'imageURL', maxCount: 1 },
	]),
    userController.save_image
);

router.post('/profile/addDocuments/:id',
	uploadDocument.fields([
		{ name: 'documents' },
	]),
    userController.save_documents
);


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

router.use(
	'/api-docs',
	swaggerUi.serve, 
	swaggerUi.setup(swaggerDocument)
  );

module.exports = router;
  