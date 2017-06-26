import {observable, computed, reaction} from 'mobx'
import {handleModels} from 'restackx-core'

const modelContext = require.context('../', true, /.model.js$/)
var models = handleModels(modelContext)

export default models
