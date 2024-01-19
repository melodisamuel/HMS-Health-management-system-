// const { router } = require('../app')
const patientController = require('../controllers/patientController')

const router = express.Router()

router.router('/').post(patientController)