// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};
  
// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    // the ID of the course the assignment group belongs to
    course_id: 451,
    // the percentage weight of the entire assignment group
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        // the due date for the assignment
        due_at: "2023-01-25",
        // the maximum points possible for the assignment
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        // the due date for the assignment
        due_at: "2023-02-27",
        // the maximum points possible for the assignment
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        // the due date for the assignment
        due_at: "3156-11-15",
        // the maximum points possible for the assignment
        points_possible: 500
      }
    ]
};
  
// The provided learner submission data.
const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
];

// the learner’s total, weighted average, in which assignments
// with more points_possible should be counted for more
// e.g. a learner with 50/100 on one assignment and 190/200 on another
// would have a weighted average score of 240/300 = 80%.

// each assignment should have a key with its ID,
// and the value associated with it should be the percentage that
// the learner scored on the assignment (submission.score / points_possible)

// if an assignment is not yet due, it should not be included in either
// the average or the keyed dictionary of scores
  
// 
function getLearnerData(course, ag, submissions) {
  // Checking if course id match
  if (course.id !== ag.course_id) {
    throw new Error("Course ID does not match the assignment group");
  }

  // Calculating the score for an assignment
  function calculateScore(submission, assignment) {
    // Checking to make sure that the points possible for assignment is not zero
    try {
      if (assignment.points_possible === 0) {
        throw new Error(
          `Assignment ${assignment.id} has zero points possible.`
        );
      }

      let score = submission.score / assignment.points_possible;

      // Checking if the submission is late and take 10% off if assignment is late
      if (new Date(submission.submitted_at) > new Date(assignment.due_at)) {
        score -= 0.1;
      }

      // Checking if the score is between 0 and 1. within 100%
      return Math.max(0, Math.min(score, 1)); // Clamping to range [0, 1]

    } catch (error) {
      console.error(error); // If invalid score catch error return 0
      return 0;
    }
  }

  // Find the assignment
  let assignment;
  for (let i = 0; i < ag.assignments.length; i++) {
    if (ag.assignments[i].id === assignment_id) {
      assignment = ag.assignments[i];
      break;
    }
  }

  

  return result;
  
}
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);