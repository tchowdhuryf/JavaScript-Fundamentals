Java Script Fundamentals

This application processes learner submission data for assignments, calculating their weighted average scores based on the assignments' points and weights.
The program ensures that only assignments that are due are considered in the final average calculation.
Additionally, late submissions are penalized by 10% of the total available points.

The program takes in a set of input data:
- Course Information - Describes the course to which assignments belong.
- Assignment Group - Contains information about assignments, including their weight and due dates.
- Learner Submissions - A list of submissions made by learners, including their scores and submission times.

To create:
- A list of learners with their weighted average scores.
- The percentage scores for each assignment per learner.

The application will return an array of objects, each representing a learner's data:

[
  {
    "id": 125,
    "avg": 0.985,
    "1": 0.94,
    "2": 1.0
  },
  {
    "id": 132,
    "avg": 0.82,
    "1": 0.78,
    "2": 0.833
  }
]