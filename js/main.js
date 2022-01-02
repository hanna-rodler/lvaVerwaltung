"use strict";

let lvaManager;

$(function() {
  $("#newLVA").hide();
  $("#lvaView").hide();
  lvaManager=new LVAMgtSystem();
  
  /**
   * [Gets LVAs, Professors and Students from JSON]
   */
  $.getJSON("js/initialLVAs.json", function(data) {
    for(let student of data.studentsList){
      let stud = new Student(student.firstName, student.lastName, student.matrNr);
      lvaManager.addStudent(stud);
    }
    for(let initLVA of data.initialLVAs) {
      let lva=new LVA(initLVA.nr, initLVA.name, initLVA.description,
                      initLVA.semester,
                      initLVA.type, initLVA.prof, initLVA.maxParticipants);
      lva.addToLVAMenu();
      for(let stud of initLVA.students){
        // console.log(stud);
        lva.addStudent(stud);
      }
      lvaManager.addLVA(lva);
      /*lva.print();
      lva.printStudents();*/
    }
    for(let prof of data.profList){
      let professor = new Professor(prof.firstName, prof.lastName, prof.occupationGroup);
      professor.addAssOption();
    }
    // lvaManager.consoleLogAll();
  });
  
  /**
   * Save LVA after clicking on 'Speichern'
   */
  $("input[type='submit']").on("click", function(e) {
    e.preventDefault();
    saveLVA();
  });
  
  $("#plus").on("click", function(){
    $("#newLVA").show();
    $("#lvaView").hide();
  });
  
  /**
   * [If the site menu is clicked, the view for the specific lva is shown
   * or the LVA Übersicht is shown.]
   */
  $("#lvaMenu").on("click", function(e){
    let lvaID = e.target.id;
    if(lvaID !== "overview" && lvaID !== "plus"){
      $("#newLVA").hide();
      $("#lvaView").show();
      let lva = lvaManager.getLVAByNr(lvaID);
      lva.printLVAView();
    }else{
      $("#lvaView").hide();
      $("#newLVA").show();
    }
  });
  
  
  
  /**
   * [Move students from 'Teilnehmer' to 'Alle Studenten'.]
   */
  $("#selStudents").on("click", function(e){ // TODO: not first li
    // move to all Students
    let studID = "#"+e.target.id;
    move(studID);
    
    // remove from UML
    removeStudent(e);
  });
  
  /**
   * Move students from 'Alle Studenten' to 'Teilnehmer'.]
   */
  $("#allStudents").on("click", function(e){
    // move to selStudents
    let matrNr = e.target.id;
    let elem = "#"+e.target.id;
    move(elem);
    
     // add to UML LVA
    addStudent(e);
  });
});

/**
 * [Move Student to to 'Alle Studenten' if in "Teilnehmer' and vice versa.]
 * @param elem
 */
function move(elem){
  if ($(elem).parent().attr("id") === "allStudents") {
    $(elem).detach().appendTo("#selStudents");
  } else {
    $(elem).detach().appendTo("#allStudents");
  }
}

/**
 * [Removes student from the LVA when clicked upon and .]
 * @param e
 */
function removeStudent(e){
  let lvaNr = $("#lvaNr2").attr('value');
  console.log(lvaNr);
  let lva = lvaManager.getLVAByNr(lvaNr);
  console.log(e.target.id);
  let student = lvaManager.getStudentByMatrNr(e.target.id);
  console.log(student);
  lva.removeStudent(student);
  lva.print();
  lva.printStudents();
}

/**
 * [Adds student to LVA when clicked upon.]
 * @param e
 */
function addStudent(e){
  let lvaNr = $("#lvaNr2").attr('value');
   console.log("LVA Nr: "+lvaNr);
   let lva = lvaManager.getLVAByNr(lvaNr);
   let student = lvaManager.getStudentByMatrNr(e.target.id);
   console.log(student);
  lva.addStudent(student);
  lva.print();
  lva.printStudents();
}

/**
 * [Saves LVA when form is filled out and adds it to HTML.]
 */
function saveLVA() {
  let nr=$("#lvaNr").val();
  let name=$("#lvaName").val();
  let description=$("#description").val();
  let semester=$("#semester").val();
  let type=$("#type").val();
  let prof=$("#profs").val();
  let maxParticipants=$("#maxParticipants").val();
  console.log(nr);
  if(nr !== "" && name !== "" && description !== "" && semester >0 && semester <7 && maxParticipants !== ""){
    let foundNr=lvaManager.compareKeys(nr);
    console.log(foundNr);
    if(!foundNr) {
      let lva=new LVA(nr, name, description, semester, type, prof,
                      maxParticipants);
      lva.addToLVAMenu();
      lvaManager.addLVA(lva);
      lvaManager.consoleLogAll();
    } else{
      alert("LVA Number already exists");
    }
  }else{
    if(semester <=0 || semester >=7){
      alert("Semester muss Zahl von 1-6 sein!");
    }else{
      alert("Bitte alle Felder ausfüllen.");
    }
  }
  
}