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

      if (submission.score > assignment.points_possible) {
        throw new Error(
          "Score cannot be more than points possible"
        );
      }

      if (typeof submission.score !== 'number') {
        throw new Error(
          "Not a valid score"
        );
      }

      let score = submission.score / assignment.points_possible;

      // Checking if the submission is late and take 10% off if assignment is late
      if (new Date(submission.submitted_at) > new Date(assignment.due_at)) {
        score -= 0.1;
      }

      // Checking if the score is between 0 and 1. to check if it is within 100%
      if (score < 0) {
        return 0;
      } else if (score > 1) {
        return 1;
      } else {
        return score;
      }

    } catch (error) {
      console.error(error); // If invalid score catch error return 0
      return 0;
    }
  }

  // Checking if an assignment is due
  function isAssignmentDue(dueDate) {
    const now = new Date();
    return new Date(dueDate) <= now;
  }

  const learnerResults = {}; // object variable to store data to calculate scores and avg

  submissions.forEach((submissionData) => {
    const learner_id = submissionData.learner_id;
    const assignment_id = submissionData.assignment_id;
    const submission = submissionData.submission;

    // Finding the assignment
    let assignment;
    for (let i = 0; i < ag.assignments.length; i++) {
      if (ag.assignments[i].id === assignment_id) {
        assignment = ag.assignments[i];
        break;
      }
    }

    // Skipping assignment if it is not due
    // if assignment is found and is due... 
    if (assignment && isAssignmentDue(assignment.due_at)) {
      // Initializing objects to store results
      if (!learnerResults[learner_id]) {
        learnerResults[learner_id] = {
          id: learner_id,
          avg: 0,
          assignments: {},
          totalWeight: 0,
          totalPoints: 0,
        };
      }

      // Calculating score for the assignment
      const scorePercentage = calculateScore(submission, assignment);

      // Storing the score for the assignment
      learnerResults[learner_id].assignments[assignment_id] = parseFloat(
        scorePercentage.toFixed(3)
      );

      // Adding weighted points to total
      learnerResults[learner_id].totalWeight +=
        (assignment.points_possible * ag.group_weight) / 100;
      learnerResults[learner_id].totalPoints +=
        (scorePercentage * assignment.points_possible * ag.group_weight) / 100;
    }
  });

  // Calculating average for each learner
  const result = [];
  Object.values(learnerResults).forEach((learner) => {
    const avg = parseFloat(
      (learner.totalPoints / learner.totalWeight).toFixed(3)
    );
    result.push({
      id: learner.id,
      avg: avg,
      ...learner.assignments,
    });
  });

  return result;
  
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);