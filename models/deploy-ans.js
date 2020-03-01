const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deploy_basic = new Schema({
    c1_deploy1: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_deploy2: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_deploy3: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_deploy4: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_deploy5: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_deploy6: {
        type: String,
        required: false,
        default: 'false'
    }
},{ _id: false})

const deploy_intermediate = new Schema({
    c2_deploy1: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_deploy2: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_deploy3: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_deploy4: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_deploy4: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_deploy5: {
        type: String,
        required: false,
        default: 'false'
    }
},{ _id: false})

const deploy_mature = new Schema({
    c3_deploy1: {
        type: String,
        required: false,
        default: 'false'
    },
    c3_deploy2: {
        type: String,
        required: false,
        default: 'false'
    },
    c3_deploy3: {
        type: String,
        required: false,
        default: 'false'
    },
	c3_deploy4: {
        type: String,
        required: false,
        default: 'false'
    },
    c3_deploy5: {
        type: String,
        required: false,
        default: 'false'
    },
    c3_deploy6: {
        type: String,
        required: false,
        default: 'false'
    }
},{ _id: false})

const deploy = new Schema({
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    deploy_basic: {
        required: true,
        type: deploy_basic
    },
    deploy_intermediate: {
        required: true,
        type: deploy_intermediate
    },
    deploy_mature: {
        required: true,
        type: deploy_mature
    }
},{ _id: true})

module.exports = mongoose.model('Deploy', deploy);