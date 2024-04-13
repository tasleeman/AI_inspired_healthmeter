document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  let currentCardIndex = 0;

  function showCard(index) {
    cards.forEach((card, idx) => {
      if (idx === index) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });
  }

  function validateInputs(card) {
    const inputs = card.querySelectorAll("input[required]");
    return Array.from(inputs).every(input => input.checkValidity());
  }

  function handleNext() {
    const currentCard = cards[currentCardIndex];
    if (validateInputs(currentCard)) {
      currentCardIndex++;
      if (currentCardIndex < cards.length) {
        showCard(currentCardIndex);
      } else {
        // Handle final form submission logic here
        alert("Form submitted successfully!");
        // Uncomment the line below to submit the form
        // document.querySelector(".multi-step-form").submit();
      }
    } else {
      alert("Please fill out all required fields.");
    }
  }

  function handlePrevious() {
    currentCardIndex--;
    if (currentCardIndex >= 0) {
      showCard(currentCardIndex);
    }
  }

  document.querySelectorAll(".next").forEach(button => {
    button.addEventListener("click", handleNext);
  });

  document.querySelectorAll(".previous").forEach(button => {
    button.addEventListener("click", handlePrevious);
  });

  // Handle gender, medicine, stress button clicks
  function handleButtonClick(buttonClass, inputId) {
    document.querySelectorAll(buttonClass).forEach(button => {
      button.addEventListener("click", () => {
        document.querySelectorAll(buttonClass).forEach(btn => {
          btn.classList.remove("selected");
        });
        button.classList.add("selected");
        const value = button.getAttribute("data-value");
        document.getElementById(inputId).value = value;
      });
    });
  }

  handleButtonClick(".gender-button", "genderInput");
  handleButtonClick(".medicine-button", "medicineInput");
  handleButtonClick(".stress-button", "stressInput");

  // Handle meal button clicks
  document.querySelectorAll(".meal-button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".meal-button").forEach(btn => {
        btn.classList.remove("selected");
      });
      button.classList.add("selected");
      const mealValue = button.getAttribute("data-value");
      document.getElementById("mealInput").value = mealValue;
    });
  });

  // Handle hormone button clicks
  document.querySelectorAll(".hormone-button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".hormone-button").forEach(btn => {
        btn.classList.remove("selected");
      });
      button.classList.add("selected");
      const hormoneValue = button.getAttribute("data-value");
      document.getElementById("hormoneInput").value = hormoneValue;
    });
  });

  // Prevent form submission on Enter key press
  document.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });

  showCard(currentCardIndex);
});
