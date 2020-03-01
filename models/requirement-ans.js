const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requirements_basic = new Schema({
    c1_req1: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_req2: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_req3: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_req4: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_req5: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_req6: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_req7: {
        type: String,
        required: false,
        default: 'false'
    }
},{ _id: false})

const requirements_intermediate = new Schema({
    c2_req1: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_req2: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_req3: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_req4: {
        type: String,
        required: false,
        default: 'false'
    }
},{ _id: false})

const requirements_mature = new Schema({
    c3_req1: {
        type: String,
        required: false,
        default: 'false'
    },
    c3_req2: {
        type: String,
        required: false,
        default: 'false'
    },
    c3_req3: {
        type: String,
        required: false,
        default: 'false'
    }
},{ _id: false})

const requirements = new Schema({
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    requirements_basic: {
        required: true,
        type: requirements_basic
    },
    requirements_intermediate: {
        required: true,
        type: requirements_intermediate
    },
    requirements_mature: {
        required: true,
        type: requirements_mature
    }
},{ _id: true})

module.exports = mongoose.model('Requirements', requirements);