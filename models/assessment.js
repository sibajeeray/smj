const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requirements_basic = new Schema({
    q1: {
        type: String,
        required: false,
        default: 'NA'
    },
    q2: {
        type: String,
        required: false,
        default: 'NA'
    },
    q3: {
        type: String,
        required: false,
        default: 'NA'
    },
    q4: {
        type: String,
        required: false,
        default: 'NA'
    },
    q5: {
        type: String,
        required: false,
        default: 'NA'
    },
    q6: {
        type: String,
        required: false,
        default: 'NA'
    },
    q7: {
        type: String,
        required: false,
        default: 'NA'
    }
}, { _id: false })

const requirements_intermediate = new Schema({
    q1: {
        type: String,
        required: false,
        default: 'NA'
    },
    q2: {
        type: String,
        required: false,
        default: 'NA'
    },
    q3: {
        type: String,
        required: false,
        default: 'NA'
    },
    q4: {
        type: String,
        required: false,
        default: 'NA'
    }
}, { _id: false })

const requirements_mature = new Schema({
    q1: {
        type: String,
        required: false,
        default: 'NA'
    },
    q2: {
        type: String,
        required: false,
        default: 'NA'
    },
    q3: {
        type: String,
        required: false,
        default: 'NA'
    }
}, { _id: false })

const testing_basic = new Schema({
    q1: {
        type: String,
        required: false,
        default: 'NA'
    },
    q2: {
        type: String,
        required: false,
        default: 'NA'
    },
    q3: {
        type: String,
        required: false,
        default: 'NA'
    },
    q4: {
        type: String,
        required: false,
        default: 'NA'
    },
    q5: {
        type: String,
        required: false,
        default: 'NA'
    },
    q6: {
        type: String,
        required: false,
        default: 'NA'
    },
    q7: {
        type: String,
        required: false,
        default: 'NA'
    },
    q8: {
        type: String,
        required: false,
        default: 'NA'
    },
    q9: {
        type: String,
        required: false,
        default: 'NA'
    },
    q10: {
        type: String,
        required: false,
        default: 'NA'
    }
}, { _id: false })

const testing_intermediate = new Schema({
    q1: {
        type: String,
        required: false,
        default: 'NA'
    },
    q2: {
        type: String,
        required: false,
        default: 'NA'
    },
    q3: {
        type: String,
        required: false,
        default: 'NA'
    },
    q4: {
        type: String,
        required: false,
        default: 'NA'
    },
    q4: {
        type: String,
        required: false,
        default: 'NA'
    },
    q5: {
        type: String,
        required: false,
        default: 'NA'
    },
    q6: {
        type: String,
        required: false,
        default: 'NA'
    }
}, { _id: false })

const testing_mature = new Schema({
    q1: {
        type: String,
        required: false,
        default: 'NA'
    },
    q2: {
        type: String,
        required: false,
        default: 'NA'
    },
    q3: {
        type: String,
        required: false,
        default: 'NA'
    },
    q4: {
        type: String,
        required: false,
        default: 'NA'
    },
    q5: {
        type: String,
        required: false,
        default: 'NA'
    },
    q6: {
        type: String,
        required: false,
        default: 'NA'
    },
    q7: {
        type: String,
        required: false,
        default: 'NA'
    }
}, { _id: false })

const build_basic = new Schema({
    q1: {
        type: String,
        required: false,
        default: 'NA'
    },
    q2: {
        type: String,
        required: false,
        default: 'NA'
    },
    q3: {
        type: String,
        required: false,
        default: 'NA'
    },
    q4: {
        type: String,
        required: false,
        default: 'NA'
    },
    q5: {
        type: String,
        required: false,
        default: 'NA'
    },
    q6: {
        type: String,
        required: false,
        default: 'NA'
    },
    q7: {
        type: String,
        required: false,
        default: 'NA'
    }
}, { _id: false })

const build_intermediate = new Schema({
    q1: {
        type: String,
        required: false,
        default: 'NA'
    },
    q2: {
        type: String,
        required: false,
        default: 'NA'
    },
    q3: {
        type: String,
        required: false,
        default: 'NA'
    },
    q4: {
        type: String,
        required: false,
        default: 'NA'
    },
    q5: {
        type: String,
        required: false,
        default: 'NA'
    }
}, { _id: false })

const build_mature = new Schema({
    q1: {
        type: String,
        required: false,
        default: 'NA'
    },
    q2: {
        type: String,
        required: false,
        default: 'NA'
    },
    q3: {
        type: String,
        required: false,
        default: 'NA'
    },
    q4: {
        type: String,
        required: false,
        default: 'NA'
    },
    q5: {
        type: String,
        required: false,
        default: 'NA'
    },
    q6: {
        type: String,
        required: false,
        default: 'NA'
    }
}, { _id: false })

const deploy_basic = new Schema({
    q1: {
        type: String,
        required: false,
        default: 'NA'
    },
    q2: {
        type: String,
        required: false,
        default: 'NA'
    },
    q3: {
        type: String,
        required: false,
        default: 'NA'
    },
    q4: {
        type: String,
        required: false,
        default: 'NA'
    },
    q5: {
        type: String,
        required: false,
        default: 'NA'
    },
    q6: {
        type: String,
        required: false,
        default: 'NA'
    }
}, { _id: false })

const deploy_intermediate = new Schema({
    q1: {
        type: String,
        required: false,
        default: 'NA'
    },
    q2: {
        type: String,
        required: false,
        default: 'NA'
    },
    q3: {
        type: String,
        required: false,
        default: 'NA'
    },
    q4: {
        type: String,
        required: false,
        default: 'NA'
    },
    q4: {
        type: String,
        required: false,
        default: 'NA'
    },
    q5: {
        type: String,
        required: false,
        default: 'NA'
    }
}, { _id: false })

const deploy_mature = new Schema({
    q1: {
        type: String,
        required: false,
        default: 'NA'
    },
    q2: {
        type: String,
        required: false,
        default: 'NA'
    },
    q3: {
        type: String,
        required: false,
        default: 'NA'
    },
    q4: {
        type: String,
        required: false,
        default: 'NA'
    },
    q5: {
        type: String,
        required: false,
        default: 'NA'
    },
    q6: {
        type: String,
        required: false,
        default: 'NA'
    }
}, { _id: false })

const requirements = new Schema({
    c1: {
        required: true,
        type: requirements_basic
    },
    c2: {
        required: true,
        type: requirements_intermediate
    },
    c3: {
        required: true,
        type: requirements_mature
    }
}, { _id: false })

const testing = new Schema({
    c1: {
        required: true,
        type: testing_basic
    },
    c2: {
        required: true,
        type: testing_intermediate
    },
    c3: {
        required: true,
        type: testing_mature
    }
}, { _id: false })

const build = new Schema({
   c1: {
        required: true,
        type: build_basic
    },
    c2: {
        required: true,
        type: build_intermediate
    },
    c3: {
        required: true,
        type: build_mature
    }
}, { _id: false })

const deploy = new Schema({
    c1: {
        required: true,
        type: deploy_basic
    },
    c2: {
        required: true,
        type: deploy_intermediate
    },
    c3: {
        required: true,
        type: deploy_mature
    }
}, { _id: false })

const answerSet = new Schema({
    requirements: {
        required: true,
        type: requirements
    },
    testing: {
        required: true,
        type: testing
    },
    build: {
        required: true,
        type: build
    },
    deploy: {
        required: true,
        type: deploy
    }
}, { _id: false })

const assessmentSchema = new Schema({
    businessname: {
        type: String,
        required: true
    },
    tribename: {
        type: String,
        required: true
    },
    squadname: {
        type: String,
        required: true
    },
    personname: {
        type: String,
        required: true
    },
    cdate: {
        type: Date,
        required: true
    },
    talname: {
        type: String,
        required: true
    },
    tplname: {
        type: String,
        required: true
    },
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    email: {
        required: false,
        type: String
    },
    answered: {
        required: true,
        type: Number,
        default: 0
    },
    answers: {
        required: false,
        type: answerSet
    },
    created_at: { 
        required: false,
        type: Date,
    },
    updated_at: { 
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Assessment', assessmentSchema);