Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
Webcam.attach("#camera");

function snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='shot' src=" + data_uri + " >";
    });



}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/DO9Ab423c/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}
prediction_1="";
prediction_2="";

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function predict(){
    img=document.getElementById("shot");
    classifier.classify(img,gotreasult);
}
function gotreasult(error,result){
if(error){
    console.log(error)
}
else{
    console.log(result);
    document.getElementById("result_emotion_name").innerHTML=result[0].label;
    document.getElementById("result_emotion_name1").innerHTML=result[1].label;
  prediction_1=result[0].label;
  prediction_2=result[1].label;
  speak();
  
if(prediction_1=="best"){
    document.getElementById("result_emoji").innerHTML="&#128077;";
}
else if(prediction_1=="amazing"){
  document.getElementById("result_emoji").innerHTML="&#128076;";
}
else if(prediction_1=="victory"){
  document.getElementById("result_emoji").innerHTML="&#9996;";
}
if(prediction_2=="best"){
    document.getElementById("result_emoji1").innerHTML="&#128077;";
}
else if(prediction_2=="amazing"){
  document.getElementById("result_emoji1").innerHTML="&#128076;";
}
else if(prediction_2=="victory"){
  document.getElementById("result_emoji1").innerHTML="&#9996;";
}
}

}