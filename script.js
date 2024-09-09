$(document).ready(function () {
  const currentYear = new Date().getFullYear();
  const startYear = 1900;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  months.forEach((month, index) => {
    $("#workStartMonth").append(`<option value="${index + 1}">${month}</option>`);
    $("#workEndMonth").append(`<option value="${index + 1}">${month}</option>`);
  });

  for (let year = currentYear; year >= startYear; year--) {
    $("#year10th").append(`<option value="${year}">${year}</option>`);
    $("#year12th").append(`<option value="${year}">${year}</option>`);
    $("#yeargraduation").append(`<option value="${year}">${year}</option>`);
    $("#WorkFromYear").append(`<option value="${year}">${year}</option>`);
    $("#WorkToYear").append(`<option value="${year}">${year}</option>`);
  }

  //submit
  document
    .getElementById("resumeForm")
    .addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the default form submission
      document.getElementById("submit-button").disabled = true;
      document.getElementById("loader").style.display = "block";
      // Collect the form data

      var formData = new FormData(this);
      //date
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
      var yyyy = today.getFullYear();
      var formattedDate = dd + "-" + mm + "-" + yyyy;

      formData.append("Date", formattedDate);

      var keyValuePairs = [];
      for (var pair of formData.entries()) {
        keyValuePairs.push(pair[0] + "=" + pair[1]);
      }

      var formDataString = keyValuePairs.join("&");

      console.log(formData);

      // Send a POST request to your Google Apps Script
      fetch(
        "https://script.google.com/macros/s/AKfycbyQozt0o49piSqyILICiHMFWanaPep3LuHlsNHVWWQILic84g3iQoqMomtQThNCjbDtEQ/exec",
        {
          redirect: "follow",
          method: "POST",
          body: formDataString,
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
        }
      )
        .then(function (response) {
          // Check if the request was successful
          document.getElementById("loader").style.display = "none";
          if (response) {
            return response; // Assuming your script returns JSON response
          } else {
            throw new Error("Failed to submit the form.");
          }
        })
        .then(function (data) {
          document.getElementById("submit-button").disabled = false;
          document.getElementById("resumeForm").reset();

          $("#ContainerRegistrationForm").remove();
          $("#ContainerSuccess")
            .html(
              `
                    <div class="successDiv">
                        <img src="tick.svg" alt="Success Image">
                        <h1 class="heading">We will contact you soon.</h1>
                        <a class="btn btn-custom" href="https://earlyskillsapp.com">Enroll Now</a>
                    </div>
                `
            )
            .show();
          setTimeout(function () {}, 2600);
        })
        .catch(function (error) {
          // Handle errors, you can display an error message here
          console.error(error);
          document.getElementById("loader").style.display = "none";
          alert("Something Went Wrong!!");
        });
    });
});
