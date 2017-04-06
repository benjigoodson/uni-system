var conn = new Mongo();
db = conn.getDB("uni-system");
db = db.getSiblingDB("uni-system");

var outcome = true;

///////////// DEFAULT VALUES /////////////

// Student names
var studentNames = ["Colin", "Lauren", "Ben", "Amy", "Emily", "Chris", "Theo", "James", "Polly", "Henry", "Jack", "Josie", "Rachel", "Emma", "Harriet", "Abigail", "Jessica", "Jacob", 
    "Daniel", "Jamie", "John", "David", "Kyle", "Tom", "Tina", "Kevin", "Anne", "Simon", "Paul", "Dan", "Martin", "Ryan", "Lucy", "Kacey", "Kate", "Vicky", "Mike", "Mario", "Joe"];

// Genders
var genders = ["MALE", "FEMALE"]

// Course names
var courseNames = ["Nursing", "Computing", "Chemistry", "Biology", "Maths", "Creative Arts", "Drama", "Journalism", "English"];

// Campus names
var campusNames = ["City Space", "St Peters", "Sir Tom Cowie"];

var NUM_STUDENTS_PER_COURSE = 6

// Remove all data
db.course.drop();
print("Dropped course collection.");

db.student.drop();
print("Dropped student collection.");

print("\nAll existing data has been removed.\n");
               
//// Students ////
var newStudents = [];

for(var studentCount = 0; studentCount < studentNames.length; studentCount++) {
    var newStudent = {};
    newStudent.name = studentNames[studentCount];
    newStudent.age =  getRandomNumber(18, 22);
    newStudent.gender = getRandomValue(genders);

    newStudents.push(newStudent);
};

db.student.insert(newStudents);

var students = db.student.find().toArray();

// Check all students have been inserted
if(studentNames.length == students.length) {
    print(studentNames.length + " students have been created.");
} else {
    print("Not all students created!");
    outcome = false;
}

//// Courses ////
var newCourses = [];

for(var courseCount = 0; courseCount < courseNames.length; courseCount++) {
    var newCourse = {};

    newCourse.name = courseNames[courseCount];
    newCourse.campus = getRandomValue(campusNames);

    newCourse.students = [];

    for(var courseStuCount = 0; courseStuCount < NUM_STUDENTS_PER_COURSE; courseStuCount++) {

        var index = getRandomNumber(0, students.length);

        var student = {};
        student.id = students[index]._id.str;
        student.grade = getRandomNumber(30, 101);

        newCourse.students.push(student);
    }

    newCourses.push(newCourse);
};

db.course.insert(newCourses);

var courses = db.course.find().toArray();

// Check all courses have been inserted
if(courseNames.length == courses.length) {
    print(courseNames.length + " courses have been created.");
} else {
    print("Not all courses created!");
    outcome = false;
}

//// Private functions ////

// Get a random value
function getRandomValue(passedArray) {
    if(passedArray && passedArray.length > 0) {
        return passedArray[getRandomNumber(0, passedArray.length)];
    } else {
        return null;
    }
};

// Random number generator
function getRandomNumber(lower, upper) {
    return Math.floor(Math.random() * (upper - lower)) + lower; 
};

print("\nHas it ran correctly? " + outcome);