/**
 * [LVA Management System. Has Studendts and LVAs]
 */
class LVAMgtSystem {
  constructor() {
    this.lvaMgt=new Map;
    this.students=new Map;
  }
  
  /**
   * [Add LVA to lvaMgt]
   * @param lva [LVA]
   */
  addLVA(lva) {
    this.lvaMgt.set(lva.nr, lva);
  }
  
  /**
   * get LVA by it's number
   * @param nr [nr of LVA]
   * @returns {any}
   */
  getLVAByNr(nr) {
    return this.lvaMgt.get(nr);
  }
  
  /**
   * [Add Student to this.students]
   * @param student [Student]
   */
  addStudent(student) {
    this.students.set(student.matrNr, student);
  }
  
  /**
   * [Get Studet by Matrikelnummer]
   * @param matrNr [Matrikelnummer]
   * @returns {any}
   */
  getStudentByMatrNr(matrNr) {
    return this.students.get(matrNr);
  }
  
  /**
   * [Get Student By Semester they're in.]
   * @param yearOfStudents [Jahrgang]
   * @returns {[]}
   */
  getStudentsBySemester(yearOfStudents) {
    let corrSemesterStudents=[];
    let i=0;
    for(let stud of this.students.keys()) {
      if(stud.substring(0,2) == yearOfStudents){
        console.log(stud.substring(0,2));
        corrSemesterStudents[i]=stud;
        i++;
      }
    }
    return corrSemesterStudents;
  }
  
  /**
   * [Console logs all Students and all LVAs]
   */
  consoleLogAll() {
    for(let lva of this.lvaMgt.values()) {
      console.log("------");
      lva.print();
    }
    for(let stud of this.students.values()) {
      console.log(stud.firstName+" "+stud.lastName+" "+stud.matrNr);
    }
    console.log("\n");
  }
  
  /**
   * [compare Nr of LVAs]
   * @param nr [LVA nr.]
   * @returns {boolean} [True if LVA nr already exists, false if doesn't
   * exist yet.]
   */
  compareKeys(nr) {
    for(let key of this.lvaMgt.keys()) {
      if(key===nr) {
        return true;
      }
    }
    return false;
  }
  
}