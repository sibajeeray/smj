const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testing_basic = new Schema({
    c1_test1: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_test2: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_test3: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_test4: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_test5: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_test6: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_test7: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_test8: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_test9: {
        type: String,
        required: false,
        default: 'false'
    },
    c1_test10: {
        type: String,
        required: false,
        default: 'false'
    }
},{ _id: false})

const testing_intermediate = new Schema({
    c2_test1: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_test2: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_test3: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_test4: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_test4: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_test5: {
        type: String,
        required: false,
        default: 'false'
    },
    c2_test6: {
        type: String,
        required: false,
        default: 'false'
    }
},{ _id: false})

const testing_mature = new Schema({
    c3_test1: {
        type: String,
        required: false,
        default: 'false'
    },
    c3_test2: {
        type: String,
        required: false,
        default: 'false'
    },
    c3_test3: {
        type: String,
        required: false,
        default: 'false'
    },
	c3_test4: {
        type: String,
        required: false,
        default: 'false'
    },
    c3_test5: {
        type: String,
        required: false,
        default: 'false'
    },
    c3_test6: {
        type: String,
        required: false,
        default: 'false'
    },
    c3_test7: {
        type: String,
        required: false,
        default: 'false'
    }
},{ _id: false})

const testing = new Schema({
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    testing_basic: {
        required: true,
        type: testing_basic
    },
    testing_intermediate: {
        required: true,
        type: testing_intermediate
    },
    testing_mature: {
        required: true,
        type: testing_mature
    }
},{ _id: true})

module.exports = mongoose.model('Testing', testing);