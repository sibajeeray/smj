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
}, { _id: false })

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
}, { _id: false })

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
}, { _id: false })

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
}, { _id: false })

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
}, { _id: false })

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
}, { _id: false })

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
}, { _id: false })

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
}, { _id: false })

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
}, { _id: false })

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
}, { _id: false })

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
}, { _id: false })

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
}, { _id: false })

const requirements = new Schema({
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
}, { _id: false })

const testing = new Schema({
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
}, { _id: false })

const build = new Schema({
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
}, { _id: false })

const deploy = new Schema({
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

const answerSchema = new Schema({
    availed: {
        required: true,
        type: Number,
        default: 0
    },
    lastUpdatedDate: Date,
    answers: {
        required: false,
        type: answerSet
    }
});

module.exports = mongoose.model('Answers', answerSchema);
