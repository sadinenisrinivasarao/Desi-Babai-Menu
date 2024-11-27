fetch("/api/foodItems")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    const categories = [...new Set(data.map(food => food.category))]; // Get unique categories
    const tabs = document.getElementById("tabs");
    const tableBody = document.querySelector("#food-table tbody");

    // Function to render food items in the table
    const renderTable = (category) => {
      tableBody.innerHTML = ""; // Clear previous table rows
      const filteredData = data.filter(food => food.category === category);
      filteredData.forEach(food => {
        const row = document.createElement("tr");

        // Check if the food item is today's special
        const isSpecial = food.todayspecial = "yes";

        row.innerHTML = `
              <td class="item_name" class=${food.todayspecial}>
                ${food.item}
                ${isSpecial ? `<img src="./Special_logo.gif" alt="Special" class="special-gif">` : ''}
              </td>
              <td>$ ${food.price.toFixed(2)}</td>
            `;
        tableBody.appendChild(row);
      });
    };

    // Create tabs dynamically
    categories.forEach(category => {
      const tab = document.createElement("div");
      tab.className = "tab";
      tab.textContent = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize category name
      tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        renderTable(category); // Render table for the selected category
      });
      tabs.appendChild(tab);
    });

    // Set the first tab as active and render its table by default
    if (categories.length > 0) {
      tabs.firstChild.classList.add("active");
      renderTable(categories[0]);
    }
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });