let currentSlide = 0;

function moveSlide(direction) {
  const track = document.getElementById('testimonialTrack');
  const slides = document.querySelectorAll('.testimonial');
  const totalSlides = slides.length;

  currentSlide += direction;

  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if (currentSlide >= totalSlides) currentSlide = 0;

  const shift = currentSlide * -100;
  track.style.transform = `translateX(${shift}%)`;
}

document.addEventListener("DOMContentLoaded", () => {
  // 🌗 Theme toggle
  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }

  // 🎭 Emoji mood selector
  const emojis = document.querySelectorAll(".emoji-tracker span");
  emojis.forEach((emoji) => {
    emoji.addEventListener("click", () => {
      emojis.forEach((e) => e.classList.remove("selected"));
      emoji.classList.add("selected");
    });
  });

  // 📩 Journal form submission
  const journalForm = document.getElementById("journalForm");
  if (journalForm) {
    journalForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const text = document.getElementById("feeling").value;
      const mood = document.querySelector(".emoji-tracker .selected")?.textContent || "😐";

      try {
        const res = await fetch("http://localhost:5000/api/journal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, mood }),
        });

        const data = await res.json();
        alert("✅ Your feeling was posted anonymously!");

        // Clear form
        document.getElementById("feeling").value = "";
        emojis.forEach(el => el.classList.remove("selected"));
      } catch (err) {
        alert("❌ Failed to post. Please try again.");
        console.error(err);
      }
    });
  }
});
