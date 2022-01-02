class LVA {
  constructor(nr, name, descrip, semester, type, prof, maxParticipants) {
    this.nr=nr;
    this.name=name;
    this.descrip=descrip;
    this.semester=semester;
    this.type=type;
    this.maxParticipants=maxParticipants;
    this.prof=prof;
    this.students=new Map;
  }
  
  /**
   * Console log LVA infos.]
   */
  print() {
    console.log(
      this.name+" ("+this.type+")\nNr: "+this.nr+"\nDescription: "+
      this.descrip+
      "\nSemester: "+this.semester+"\nType: "+
      this.prof+"\nmax participants: "+this.maxParticipants);
  }
  
  addToLVAMenu() {
    let newLVA=`<li id="${this.nr}">${this.name} ${this.type}</li>`;
    $("#lvaMenu").append(newLVA);
  }
  
  /**
   * Add Student to LVA
   * @param student [Student]
   */
  addStudent(student) {
    this.students.set(student.matrNr, student);
  }
  
  /**
   * Remove Student from LVA
   * @param student [Student.]
   */
  removeStudent(student) {
    this.students.delete(student.matrNr, student);
  }
  
  /**
   * [Print all Students.]
   */
  printStudents() {
    for(let stud of this.students.keys()) {
      console.log(stud)
    }
  }
  
  /**
   * [Print view that changes when LVA in LVAMenu clicked.]
   */
  printLVAView() {
    $("#lvaView h2").remove();
    $("#appendName").children().remove();
    $("#appendNr").children().remove();
    $("#selStudents").children().remove();
    $("#allStudents").children().remove();
    
    let h2=`<h2>${this.name} ${this.type}</h2>`;
    $("#lvaView").prepend(h2);
    let nrHTML=`<label for="lvaNr2" class="col col-40">Nr.</label>`+
      `<input readOnly type="text" name="lvaNr2" id="lvaNr2" class="col col-60 readOnly" value="${this.nr}">`
    $("#appendNr").append(nrHTML);
    
    let nameHTML=`<label for="lvaName2" class="col col-40">Bezeichnung</label>`+
      `<input readOnly type="text" name="lvaName2" id="lvaName2" class="col col-60 readOnly" value="${this.name}">`
    $("#appendName").append(nameHTML);
    
    let lvaStudents=`<li class="listHeader">Teilnehmer</li>`;
    // this.printStudents();
    for(let stud of this.students.keys()) {
      let student=lvaManager.getStudentByMatrNr(stud);
      lvaStudents+=`<li id="${student.matrNr}">${student.firstName}`+
        ` ${student.lastName}</li>`;
    }
    $("#selStudents").append(lvaStudents);
    
    let d=new Date();
    let month=d.getMonth()+1;
     let year=d.getFullYear()%200;
   
    // handle Semester
    let allStudOfSem=handleSemester(year, month, this.semester);
    let allStudents=`<li class="listHeader">Alle Studenten</li>`;
    for(let semStud of allStudOfSem) {
      let student=lvaManager.getStudentByMatrNr(semStud);
      let hasStudent=this.hasStudent(semStud);
      if(!hasStudent) {
        allStudents+=`<li id="${student.matrNr}">${student.firstName}`+
          ` ${student.lastName}</li>`;
      }
    }
    $("#allStudents").append(allStudents);
  }
  
  /**
   * checks if LVA has student
   * @param matrNr [Matrikelnummer]
   * @param lvaStudents
   * @returns {boolean}
   */
  hasStudent(matrNr) {
    for(let stud of this.students.keys()) {
      if(stud==matrNr) {
        return true;
      }
    }
    return false;
  }
  
}

function handleSemester(year, month, sem) {
  let subYear=0;
  if(sem==3 || sem==4) {
    subYear=1;
  } else if(sem==4 || sem==6) {
    subYear=2;
  }
  let jg;
  if(month>=3 && month<=9) {
    jg=year-1-subYear;
  } else {
    jg=year-subYear;
  }
  let corrSemStudents=lvaManager.getStudentsBySemester(jg);
  return corrSemStudents;
}