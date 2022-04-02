let Hospitals = {
    "hospital1": {
        'patients': Array(10).fill(true),
        'doctor': Array(3).fill(true),
        'nurse': Array(5).fill(true)
    },
    "hospital2": {
        'patients': Array(10).fill(true),
        'doctor': Array(3).fill(true),
        'nurse': Array(5).fill(true)
    },
    "hospital3": {
        'patients': Array(10).fill(true),
        'doctor': Array(3).fill(true),
        'nurse': Array(5).fill(true)
    }
}

function update_hospital(hospital_name, type){
    hospital_name = (parseInt(hospital_name) + 1).toString();
    let adding = 0;
    for (const boolean of Hospitals['hospital' + hospital_name][type]){
        document.getElementById('room_' + just(adding.toString(), '0', 3)).disabled = !boolean;
        adding++;
    }

}

function modify_values(line){
    console.log(line);
    if (line === '')    return;

    let arr = line.split(' = ');
    console.log(arr);
    arr[0] = arr[0].split('.')
    arr[1] = arr[1].split(', ')
    console.log(arr[0] + ' ' + arr[1]);
    for (let i = 0; i < arr[1].length; i++){
        let integer = parseInt(arr[1][i]);
        if (integer < Hospitals[arr[0][0]][arr[0][1]].length){
            Hospitals[arr[0][0]][arr[0][1]][integer] = false;
        }
    }
}

function fileReader_local(){
    let readFile = new XMLHttpRequest();
    readFile.open('GET', "storage.txt", true);
    readFile.onreadystatechange = function() {
        if (readFile.readyState === 4) {
            let allText = readFile.responseText.replace('\r', '').split('\n');
            for (let i = 0; i < allText.length; i++){
                modify_values(allText[i]);
            }
        }
    }
    readFile.send();
    console.log(Hospitals)
}

function get_information(){
    console.log(Hospitals)
    let string = '';
    for (const hospital of Object.entries(Hospitals)){
        for (const set of Object.entries(Hospitals[hospital[0]])){

            let comma = 0, adding = 0;
            for (const boolean of Hospitals[hospital[0]][set[0]]){
                if (!boolean){
                    if (comma > 0) string += ', ';
                    else string += hospital[0] + '.' + set[0] + ' = ';
                    string += adding.toString();
                    comma++;

                }
                adding++;
            }
            if (comma !== 0) string += '\n';
        }
    }
    return string;
}

function save() {
    let text = get_information();

    let pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' +

        encodeURIComponent(text));
    pom.setAttribute('download', 'storage1.txt');

    pom.style.display = 'none';
    document.body.appendChild(pom);

    pom.click();

    document.body.removeChild(pom);
}

function patient_id(hospital, room, gender, disease, length_of_stay, citizen){
    // A bit easier to read them the previous function which just made everything basically on a single line.

    let entity_type = '0';
    hospital = just(hospital.toString(), '0', 2);
    room = just(room.toString(), '0', 3);
    gender = gender.toString();
    disease = just(disease.toString(), '0', 2);
    length_of_stay = length_of_stay.toString();
    citizen = citizen.toString();

    const html_patient_id = document.querySelector('#patient_id');
    html_patient_id.textContent = `${entity_type}${hospital}-${room}-${gender}${disease}-${length_of_stay}-${citizen}`;
    Hospitals['hospital' + (parseInt(hospital) + 1).toString()]['patients'][parseInt(room)] = false;
    update_hospital(hospital, 'patients')
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

// console.log("HELLO!!");
fileReader_local();
//save();