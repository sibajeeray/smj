var testing = {
    competency_1: {
        testing_1: 'Has a Test Approach (Tribe) been completed & agreed with stakeholders?',
        testing_2: 'Is Regression automated at least 50%?',
        // testing_3: 'Is Progression automated at least 30%? ',
        // testing_4: `Is the 'Level of Test' identified during Requirements Risk Analysis comparable to the number of linked tests for at least 40% of testable requirements?`,
        // testing_5: 'Is a TSR produced for all testing done?',
        // testing_6: 'Is an orchestrator being used for CI?',
        // testing_7: 'Does your customer contribute to Showcases?',
        // testing_8: 'Is Test data masked / synthetic?',
        // testing_9: 'Are all tests recorded/integrated in JIRA (issue type of Test)?',
        // testing_10: 'Do all testable requirements have linked tests?'
    },
    competency_2: {
        testing_1: 'Was at least 60% of testing done in Sprints?',
        // testing_2: 'Is Regression at least 85% automated?',
        // testing_3: 'Is Progression at least 85% automated? ',
        // testing_4: `Is the 'Level of Test' identified during Requirements Risk Analysis comparable to the number of linked tests for more than 40% of testable requirements?`,
        // testing_5: 'Is a TSR at least 50% automated?',
        // testing_6: 'Do you reuse tests?'
    },
    competency_3: {
        testing_1: 'Was at least 80% of testing done in Sprints?',
        // testing_2: 'Is Regression at least 90% automated?',
        // testing_3: 'Is Progression at least 90% automated?',
        // testing_4: `Is the 'Level of Test' identified during Requirements Risk Analysis comparable to the number of linked tests for at least 80% of testable requirements?`,
        // testing_5: 'Is the TSR fully automated?',
        // testing_6: 'Is testing integrated with the CI Tool?',
        // testing_7: 'Is the Customer a member of the Squad?'

    }
}

window.current_select_id = 1;
window.showForm = false;

$(document).ready(function () {
    if (!window.showForm) {

        $("#form1").append(
            `<div id="row_1" class="row">
                <div class="col-md-10 questions">
                    <p class="data"> ${getQuestion(1, 1)}</p>
                </div>
                <div class="col-md-2 value">
                    <select id="select_1" name="c1_test1" comp_no=1 q_no=1 onChange="doAction(this);" >
                        <option value=""> </option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>`
        ).hide().show('slow');

    }
})

function fillTheForm(answers) {
    console.log("fillTheForm() called");
    window.showForm = true;
    console.log(answers);

    window.current_select_id = 1;


    Object.keys(answers).forEach((q_name) => {
        var comp_no = q_name.slice(1, 2);
        var q_no = q_name.slice(7, 8);
        var options = "";

        if (answers[q_name] === "true") {
            options = '<option value="true" selected>Yes</option><option value="false">No</option>';
        }
        else if (answers[q_name] === "false") {
            options = '<option value="true">Yes</option><option value="false" selected>No</option>';
        }

        $("#form1").append(
            `<div id="row_${window.current_select_id}" class="row">
                <div class="col-md-10 questions">
                    <p class="data"> ${getQuestion(comp_no, q_no)}</p>
                </div>
                <div class="col-md-2 value">
                    <select id="select_${window.current_select_id}" name="${q_name}" comp_no=${comp_no} q_no=${q_no} onChange="doAction(this);" >
                        ${options}
                    </select>
                </div>
            </div>`
        )
        window.current_select_id = window.current_select_id + 1;

    });
    $("#form1").append(`
        <div id="submit1" class="submit text-center">
            <input type="submit" name="save" value="Save my data">
        </div>

        <div id="submit2" class="submit text-center">
            <input type="submit"  name="proceed" value="Proceed to Build Section >>">
        </div>
    `);

}


function doAction(element) {

    var id = JSON.parse($(element).attr('id').replace('select_', ''));

    //To clear all rows below
    if (window.current_select_id > id) {
        for (i = id + 1; i <= window.current_select_id; i++) {
            $('#row_' + i).hide('slow', function () { $(this).remove(); }); // remove with animation
        }
        $('#submit1').hide('slow', function () { $(this).remove(); }); // remove with animation
        $('#submit2').hide('slow', function () { $(this).remove(); }); // remove with animation
        window.current_select_id = id;
    }

    var comp_no = JSON.parse($(element).attr('comp_no'));
    var q_no = JSON.parse($(element).attr('q_no'));
    var answer = element.value;

    comp_no = comp_no + 1;
    window.current_select_id = window.current_select_id + 1;

    if (answer === "false") {
        comp_no = 1;
        q_no = q_no + 1;
    }

    var found = false;

    for (var q_no = q_no; q_no <= 10; q_no++) {
        for (var comp_no = comp_no; comp_no <= 3; comp_no++) {
            var question = getQuestion(comp_no, q_no);
            if (!question) continue;
            else {
                $("#form1").append(
                    `<div id="row_${window.current_select_id}" class="row">
                        <div class="col-md-10 questions">
                            <p class="data"> ${question}</p>
                        </div>
                        <div class="col-md-2 value">
                            <select id="select_${window.current_select_id}" name="c${comp_no}_test${q_no}" onChange="doAction(this);" comp_no=${comp_no} q_no=${q_no}>
                                <option value=""> </option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>`
                );
                $(`div#row_${window.current_select_id}`).hide().show("slow"); // For animation
                found = true;
                break;
            }
        }
        if (found) break;
        else comp_no = 1;
    }

    if (!found) {

        $("#form1").append(`
                <div id="submit1" class="submit text-center">
                    <input type="submit" name="save" value="Save my data ">
                </div>

                <div id="submit2" class="submit text-center">
                    <input type="submit"  name="proceed" value="Proceed to Build Section >>">
                </div>
            `);
        $('#submit1').hide().show("slow"); // For animation
        $('#submit2').hide().show("slow"); // For animation

    }
}

function getQuestion(comp_no, ques_no) {
    var question = testing['competency_' + comp_no]['testing_' + ques_no];
    console.log(comp_no);
    console.log(ques_no);
    console.log(question);
    return question;
}
