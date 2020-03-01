var requirements = {
    competency_1: {
        requirements_1: 'Do all requirements have Acceptance Criteria?',
        requirements_2: 'Have at least 40% of Requirements been Risk Assessed (RRA) for Testing?',
        // requirements_3: 'Is Testing included in Req Elaboration?',
        // requirements_4: 'Is Testing included in all estimation / planning?',
        // requirements_5: 'Has DoD been agreed?',
        // requirements_6: 'Has Testing of requirements considered non-functional types?',
        // requirements_7: 'Have Non Functional requirements been defined?'
    },
    competency_2: {
        requirements_1: 'Does Acceptance criteria include functional and non-functional test types?',
        // requirements_2: 'Have at least 75% of Requirements been Risk Assessed for Testing?',
        // requirements_3: 'Has Test Type Coverage been completed for all requirements?',
        // requirements_4: 'Has testing in / out of sprints been confirmed for each requirement?'
    },
    competency_3: {
        requirements_1: 'Is functional testing planned in sprints more than out of sprint?',
        // requirements_2: 'Have all Requirements been Risk Assessed for Testing?',
        // requirements_3: 'Is non-functional testing planned in sprints more than out of sprints?'

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
                    <select id="select_1" name="c1_req1" comp_no=1 q_no=1 onChange="doAction(this);" >
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
    console.log("fillTheForm() called with data :: ");
    console.log(answers);
    
    window.showForm = true;
    // console.log(answers);

    window.current_select_id = 1;

    Object.keys(answers).forEach((q_name) => {
        var comp_no = q_name.slice(1, 2);
        var q_no = q_name.slice(6, 7);
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
            <input type="submit" name="save" value="Save my data >>">
        </div>

        <div id="submit2" class="submit text-center">
            <input type="submit"  name="proceed" value="Proceed to Testing Section >>">
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
                            <select id="select_${window.current_select_id}" name="c${comp_no}_req${q_no}" onChange="doAction(this);" comp_no=${comp_no} q_no=${q_no}>
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
                    <input type="submit" name="save" value="Save my data >>">
                </div>

                <div id="submit2" class="submit text-center">
                    <input type="submit"  name="proceed" value="Proceed to Testing Section >>">
                </div>
            `);
        $('#submit1').hide().show("slow"); // For animation
        $('#submit2').hide().show("slow"); // For animation

    }
}

function getQuestion(comp_no, ques_no) {
    var question = requirements['competency_' + comp_no]['requirements_' + ques_no];
    console.log(question);
    return question;
}
