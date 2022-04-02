function patient(hospital, room, gender, disease, length_of_stay, citizen){
    //document.getElementById("demo").innerHTML = patient("John");
    const patientid = document.querySelector('#patient_id');
    console.log('1' + just(hospital, '0', 2) + '-' + just(room.toString(), '0', 3) + '-' + gender.toString() + just(disease.toString(), '0', 2) + '-' + length_of_stay.toString() + '-' + citizen.toString());
    patientid.textContent = '1' + just(hospital, '0', 2) + '-' + just(room.toString(), '0', 3) + '-' + gender.toString() + just(disease.toString(), '0', 2) + '-' + length_of_stay.toString() + '-' + citizen.toString();
    return '1' + just(hospital, '0', 2) + '-' + just(room.toString(), '0', 3) + '-' + gender.toString() + just(disease.toString(), '0', 2) + '-' + length_of_stay.toString() + '-' + citizen.toString();
}

function just(string, char, number){
    let arr = [];
    let string_arr = Array.from(string)

    if (char.length > 1) return;

    for (let i = 0; i < number; i++){
        if (string_arr.length > 0)arr.splice(0, 0, string_arr.pop())

        else arr.splice(0, 0, char)

    }
    return arr.join('');
}