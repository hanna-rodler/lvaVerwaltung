class Person {
  constructor(firstName, lastName) {
    this.firstName=firstName;
    this.lastName=lastName;
  }
}

class Student extends Person {
  constructor(firstName, lastName, matrNr) {
    super(firstName, lastName);
    this.matrNr=matrNr;
  }
}

class Professor extends Person {
  constructor(firstName, lastName, occupationGroup) {
    super(firstName, lastName);
    this.occupationGroup=occupationGroup;
  }
  
  /**
   * Add Professor as option to dropdown in form.
   */
  addAssOption() {
    let parent=$("#profs");
    let option=`<option value=" ${this.firstName} ${this.lastName}">`+
      `${this.firstName} ${this.lastName}</option>`
    parent.append(option);
  }
}