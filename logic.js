let Hospitals = {
    "hospital1": {
        'patients': Array(10).fill(true),
        'doctors': Array(3).fill(true),
        'nurses': Array(5).fill(true)
    },
    "hospital2": {
        'patients': Array(10).fill(true),
        'doctors': Array(3).fill(true),
        'nurses': Array(5).fill(true)
    },
    "hospital3": {
        'patients': Array(10).fill(true),
        'doctors': Array(3).fill(true),
        'nurses': Array(5).fill(true)
    }
}
let homepage_images = ["images/homepage/Harold.jpg", "images/homepage/stethoscope.jpg", "images/homepage/hospital_h.jpg"]
let current_homepage_images = 0;


function change_image(direction){

    (direction === 'left') ? current_homepage_images--:current_homepage_images++;
    if (current_homepage_images < 0) current_homepage_images = homepage_images.length-1;
    else if (current_homepage_images === homepage_images.length) current_homepage_images = 0;

    document.getElementById('homepage_image_show').src = homepage_images[current_homepage_images];
}

function update_hospital(hospital_name, type){
    // let start_string = '';
    // if (type === 'patients'){
    //     start_string = 'room_';
    // }
    // else if (type === 'nurses'){
    //     start_string = 'nurse_';
    // }
    // else{
    //     start_string = 'doctor_';
    // }
    let start_string = (type === 'patients') ? 'room_' : ((type === 'nurses') ? 'nurse_' : 'doctor_');
    console.log(start_string)
    hospital_name = (parseInt(hospital_name) + 1).toString();
    let adding = 0;
    for (const boolean of Hospitals['hospital' + hospital_name][type]){
        document.getElementById(start_string + just(adding.toString(), '0', 3)).disabled = !boolean;
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
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', 'storage1.txt');

    pom.style.display = 'none';
    document.body.appendChild(pom);

    pom.click();

    document.body.removeChild(pom);
}

function nurse_id(hospital, nurse_index){

    let entity_type = '1';
    hospital = just(hospital.toString(), '0', 2);
    nurse_index = just(nurse_index.toString(), '0', 3);

    const html_nurse_id = document.querySelector('#nurse_id');
    html_nurse_id.textContent = `${entity_type}${hospital}-${nurse_index}`;
    Hospitals['hospital' + (parseInt(hospital) + 1).toString()]['nurses'][parseInt(nurse_index)] = false;
    update_hospital(hospital, 'nurses')
}

function doctor_id(hospital, doctor_index){

    let entity_type = '2';
    hospital = just(hospital.toString(), '0', 2);
    doctor_index = just(doctor_index.toString(), '0', 3);

    const html_doctor_id = document.querySelector('#doctor_id');
    html_doctor_id.textContent = `${entity_type}${hospital}-${doctor_index}`;
    Hospitals['hospital' + (parseInt(hospital) + 1).toString()]['doctors'][parseInt(doctor_index)] = false;
    update_hospital(hospital, 'doctors')
}

function patient_id(hospital, room, gender, disease, length_of_stay, citizen){

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