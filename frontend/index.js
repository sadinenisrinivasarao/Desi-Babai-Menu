fetch("/api/foodItems")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 2000); // 2-second delay
    });
  })
  .then((data) => {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No data available or invalid format.");
    }

    const categories = [...new Set(data.map((food) => food.category))];
    const tabs = document.getElementById("tabs");
    const tableContent = document.getElementById("#food-table");
    const tableBody_h4 = document.querySelector("h4#tableBody_h4");
    const tableHead = document.querySelector("#food-table thead");
    const tableBody = document.querySelector("#food-table tbody");

    const renderTable = (category) => {
      tableBody.innerHTML = "";
      if (tableBody_h4) tableBody_h4.remove();
      tableHead.innerHTML = "";
      const filteredData = data.filter((food) => food.category === category);

      if (filteredData.length === 0) {
        tableContent.innerHTML = "<tr><td colspan='2'>No items available</td></tr>";
        return;
      }
      tableHead.innerHTML = `
      <tr>
        <th>Item</th>
        <th>Price ($)</th>
      </tr>
      `;

      filteredData.forEach((food) => {
        const row = document.createElement("tr");
        const isSpecial = food.todayspecial === "yes";

        row.innerHTML = `
          <td class="item_name">
            ${food.item}
            ${isSpecial
            ? `<img src="./Special_logo.gif" alt="Special" class="special-gif">`
            : ""}
          </td>
          <td>$ ${food.price.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
      });
    };

    categories.forEach((category) => {
      const tab = document.createElement("div");
      tab.className = "tab";
      tab.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        renderTable(category);
      });
      tabs.appendChild(tab);
    });

    if (categories.length > 0) {
      tabs.firstChild.classList.add("active");
      renderTable(categories[0]);
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
    const tableBody = document.querySelector("#food-table tbody");
    tableBody.innerHTML = `<tr><td colspan="2" class="error">Error: ${error.message}</td></tr>`;
  });


const carouselContainer = document.querySelector('.carousel-container');
const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function updateCarousel() {
  // Move the carousel to show the current slide
  carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update the index for the next slide
  currentIndex = (currentIndex + 1) % items.length;
}

// Auto-play the carousel
setInterval(updateCarousel, 3000);

