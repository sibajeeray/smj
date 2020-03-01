const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const build_basic = new Schema({
    c1_build1: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_build2: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_build3: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_build4: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_build5: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_build6: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_build7: {
        type: String,
        required: false,
        default: 'false'
    }
},{ _id: false})

const build_intermediate = new Schema({
    c2_build1: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_build2: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_build3: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_build4: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_build5: {
        type: String,
        required: false,
        default: 'false'
    }
},{ _id: false})

const build_mature = new Schema({
    c3_build1: {
        type: String,
        required: false,
        default: 'false'
    },
    c3_build2: {
        type: String,
        required: false,
        default: 'false'
    },
    c3_build3: {
        type: String,
        required: false,
        default: 'false'
    },
	c3_build4: {
        type: String,
        required: false,
        default: 'false'
    },
    c3_build5: {
        type: String,
        required: false,
        default: 'false'
    },
    c3_build6: {
        type: String,
        required: false,
        default: 'false'
    }
},{ _id: false})

const build = new Schema({
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    build_basic: {
        required: true,
        type: build_basic
    },
    build_intermediate: {
        required: true,
        type: build_intermediate
    },
    build_mature: {
        required: true,
        type: build_mature
    }
},{ _id: true})

module.exports = mongoose.model('Build', build);