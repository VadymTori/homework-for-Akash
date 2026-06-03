/* Task 1: Compile Participant Details with Shorthand Property Names */
const name = 'Avery';
const age = 26;
const studyField = 'Biotechnology';

const participant = {
  name,
  age,
  studyField,
};

console.log('Task 1 participant:', participant);

/* Task 2: Implement a Shorthand Function for Participant Info */
const participantWithMethod = {
  ...participant,
  displayInfo() {
    console.log(`Participant: ${this.name}, Age: ${this.age}, Field: ${this.studyField}`);
  },
};

console.log('Task 2 displayInfo output:');
participantWithMethod.displayInfo();

/* Task 3: Implement a Same Shorthand Arrow Function for Participant Info */
const participantWithArrow = {
  ...participant,
  displayInfo: () => {
    console.log(`Arrow participant: ${this.name}, Age: ${this.age}, Field: ${this.studyField}`);
  },
};

console.log('Task 3 displayInfo arrow output:');
participantWithArrow.displayInfo();

/*
 * Observations:
 * EXPLAIN HERE
 * Well, it's not an object  itself, but it is a function that is a property of the object with undefined properties. Something like this... =\
 */

/* Task 4: Using Computed Property Names */
function updateParticipantInfo(propertyName, value, obj) {
  return {
    ...obj,
    [propertyName]: value,
  };
}

const updatedParticipant = updateParticipantInfo('studyField', 'Genetics', participant);
console.log('Task 4 updated participant:', updatedParticipant);
console.log('Task 4 original participant remains unchanged:', participant);
