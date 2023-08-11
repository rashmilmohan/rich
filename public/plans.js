// const arrowButton = document.getElementById("arrowButton");
// const arrow = document.getElementById("arrow");

// arrowButton.addEventListener("click", () => {
//   arrow.classList.toggle("arrow-down");
// });

// const plans = ["mobilePlan", "basicPlan", "standardPlan", "premiumPlan"];

// plans.forEach((plan) => {
//   const planElement = document.getElementById(plan);
//   const arrow = planElement.querySelector(".arrow");

//   planElement.addEventListener("mouseenter", () => {
//     arrow.style.display = "block";
//   });

//   planElement.addEventListener("mouseleave", () => {
//     arrow.style.display = "none";
//   });
// });
// Get the buttons and price containers
// Get the buttons and price containers
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".price button");
  const priceContainers = document.querySelectorAll(".price");

  // Add click event listeners to each button
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Remove 'selected' class from all price containers
      priceContainers.forEach((container) => {
        container.classList.remove("selected");
      });

      // Add 'selected' class to the clicked button's parent container
      priceContainers[index].classList.add("selected");
    });
  });

  // ... your existing code ...

  const nextButton = document.querySelector(".next button");

  nextButton.addEventListener("click", () => {
    const selectedColumn = document.querySelector(".price.selected");
    const selectedData = {
      name: selectedColumn.querySelector("button").textContent,
      price: selectedColumn.querySelector(".paragraph").textContent,
      // Add more properties as needed
    };

    // Send selected data to the backend
    sendDataToBackend(selectedData);
  });

  function sendDataToBackend(data) {
    fetch("/send-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Backend response:", result);
        // Handle the response as needed
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });
  }
});
