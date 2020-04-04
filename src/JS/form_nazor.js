import { render } from "mustache";  


function opinion2html(opinion){


    opinion.createdDate=(new Date(opinion.created)).toDateString();


    const template = document.getElementById("form_answer").innerHTML;

    const htmlWOp = render(template,opinion);

    delete(opinion.createdDate);

    return htmlWOp;

}


function opinionArray2html(sourceData){
    return sourceData.reduce((htmlWithOpinions,opn) => htmlWithOpinions+ opinion2html(opn),"");  

}


    let opinions=[];
    const opinionsElm=document.getElementById("answers_div");
    if(localStorage.rubiks_web){
        opinions=JSON.parse(localStorage.rubiks_web);
    }

    opinionsElm.innerHTML=opinionArray2html(opinions);


    const commFrmElm=document.getElementById("nazor");
    commFrmElm.addEventListener("submit",processOpnFrmData);

    function processOpnFrmData(event){
        event.preventDefault();

        const name = document.getElementById("meno").value.trim();
        const surname = document.getElementById("priezvisko").value.trim();
        const email = document.getElementById("email").value.trim();
        const man = document.getElementById("muz").checked;
        const some_text = document.getElementById("text_area").value.trim();
        const image = document.getElementById("obrazok").src;

        if(name=="" || surname=="" ||
            email=="" || some_text==""){
            window.alert("VyplÅ vÅ¡etky polia.");
            return;
        }

        let pohlavie;
        if (man==true) {
            pohlavie="MuÅ¾";
        }
        else{
            pohlavie="Å½ena"
        }

        let cube = "";
        if(document.getElementById("kocka_3x3").checked == true){
            cube="kocka 3x3";
        }
        if(document.getElementById("kocka_4x4").checked == true){
            if(cube==""){
                cube="kocka 4x4";
            }
            else {
                cube = cube + ", " + "kocka 4x4";
            }
        }
        if(document.getElementById("ine").checked == true){
            if(cube==""){
                cube="ine";
            }
            else {
                cube = cube + ", " + "inÃ©";
            }}


        const newOpinion =
            {
                Meno: name,
                Priezvisko: surname,
                Email: email,
                Pohlavie: pohlavie,
                Oblubeny_hlavolam: cube,
                SprÃ¡va: some_text,
                Obrazok: image,
                created: new Date()
            };

        opinions.push(newOpinion);

        localStorage.rubiks_web = JSON.stringify(opinions);

        opinionsElm.innerHTML+=opinion2html(newOpinion);


        commFrmElm.reset();
    }