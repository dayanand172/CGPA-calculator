function addSubject() {
  const subjectDiv = document.createElement("div");
  subjectDiv.classList.add("subject-input");
  subjectDiv.innerHTML = `
        <input type="text" placeholder="Subject Name" class="subject-name">
        <input type="text" placeholder="Grade (10, 9, 8, 7, 6, 5, 0 or A+, A, B, C, D, P, F)" class="grade" oninput="calculateCGPA()">
        <input type="number" placeholder="Credit (1-7)" class="credit" min="1" max="7" oninput="calculateCGPA()">
    `;
  document.getElementById("subjects").appendChild(subjectDiv);
}

function clearAll() {
  document.getElementById("subjects").innerHTML = `
        <div class="subject-input">
            <input type="text" placeholder="Subject Name" class="subject-name">
            <input type="text" placeholder="Grade (10, 9, 8, 7, 6, 5, 0 or A+, A, B, C, D, P, F)" class="grade" oninput="calculateCGPA()">
            <input type="number" placeholder="Credit (1-7)" class="credit" min="1" max="7" oninput="calculateCGPA()">
        </div>
    `;
  document.getElementById("result").innerText = "";
  document.getElementById("error").textContent = "";
}

function calculateCGPA() {
  const grades = document.querySelectorAll(".grade");
  const credits = document.querySelectorAll(".credit");
  const errorElement = document.getElementById("error");
  errorElement.textContent = ""; // Clear previous errors

  let totalScore = 0;
  let totalCredits = 0;

  // Map character grades to numeric values
  const gradeMap = {
    "A+": 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    P: 5,
    F: 0,
  };

  let hasError = false; // Flag to track any errors

  for (let i = 0; i < grades.length; i++) {
    let grade = grades[i].value.trim().toUpperCase();
    const credit = parseFloat(credits[i].value);

    // Reset styles for validation
    grades[i].classList.remove("invalid");
    credits[i].classList.remove("invalid");

    // Convert character grade to numeric value
    if (gradeMap.hasOwnProperty(grade)) {
      grade = gradeMap[grade];
    } else {
      grade = parseFloat(grade);
    }

    // Validation checks
    const validGrades = [10, 9, 8, 7, 6, 5, 0];
    if (!validGrades.includes(grade) && isNaN(grade)) {
      grades[i].classList.add("invalid");
      hasError = true;
    }
    if (credit < 1 || credit > 7 || isNaN(credit)) {
      credits[i].classList.add("invalid");
      hasError = true;
    }

    // Only calculate if no errors so far
    if (!hasError) {
      totalScore += grade * credit;
      totalCredits += credit;
    }
  }

  // Display error message if there's an invalid input
  if (hasError) {
    errorElement.textContent =
      "Please ensure all inputs are valid. Check grades and credits.";
    return;
  }

  // Calculate and display CGPA if valid
  if (totalCredits === 0) {
    document.getElementById("result").innerText =
      "Please enter valid grades and credits.";
  } else {
    const cgpa = totalScore / totalCredits;
    document.getElementById("result").innerText = `Your CGPA is: ${cgpa.toFixed(
      2
    )}`; // Error: missing quotation mark
  }
}
