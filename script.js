document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("navbar-toggle");
  const navbarMenu = document.getElementById("navbar-menu");

  toggleButton.addEventListener("click", () => {
    navbarMenu.classList.toggle("active");
  });

  // Set the active class on the "About Me" link when page loads and scroll to it
  const aboutMeLink = document.querySelector(".navbar-link[href='#about-me']");
  aboutMeLink.classList.add("active");

  // Scroll to the "About Me" section when page loads
  const aboutMeSection = document.querySelector("#about-me");
  if (aboutMeSection) {
    aboutMeSection.scrollIntoView({ behavior: "smooth" });

    // Adjust scroll position to ensure navbar is visible
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Handle click events on navbar links
  document.querySelectorAll(".navbar-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      // Remove active class from all links
      document.querySelectorAll(".navbar-link").forEach((link) => {
        link.classList.remove("active");
      });

      // Add active class to the clicked link
      link.classList.add("active");

      // Scroll to the section smoothly, accounting for the fixed navbar height
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        event.preventDefault();
        const headerOffset = document.querySelector("header").offsetHeight;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", (event) => {
  // Function to format the date with ordinal suffixes
  function formatDate(date) {
    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US", {
      month: "long",
      timeZone: "UTC",
    });
    const suffix = getOrdinalSuffix(day);
    return `${day}${suffix} ${month}`;
  }

  // Function to get the ordinal suffix for a given day
  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return "th"; // Covers 11th to 20th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  // Get current UTC time and day
  function getCurrentTimeAndDay() {
    const now = new Date();
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    };
    const dayOptions = {
      weekday: "long",
      timeZone: "UTC",
    };

    const formattedDate = formatDate(now);
    const formattedTime = now.toLocaleTimeString("en-US", timeOptions);

    document.getElementById(
      "current-time"
    ).textContent = `${formattedDate}, ${formattedTime}`;
    document.getElementById("current-day").textContent = now.toLocaleDateString(
      "en-US",
      dayOptions
    );
  }

  // Update time and day every second
  setInterval(getCurrentTimeAndDay, 1000);

  // Initial call to display current time and day
  getCurrentTimeAndDay();
});
