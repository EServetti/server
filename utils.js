import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { connect } from 'mongoose'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

