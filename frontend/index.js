fetch("/api/foodItems")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No data available or invalid format.");
    }

    const categories = [...new Set(data.map((food) => food.category))];
    const tabs = document.getElementById("tabs");
    const tableBody_h4 = document.querySelector("#food-table_h4");
    const tableBody = document.querySelector("#food-table");

    const renderTable = (category) => {

      tableBody.innerHTML = "";
      tableBody_h4.innerHTML = "";
      const filteredData = data.filter((food) => food.category === category);

      if (filteredData.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='2'>No items available</td></tr>";
        return;
      }
      tableBody.innerHTML = `
       <thead>
      <tr>
        <th>Item</th>
        <th>Price ($)</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
      `

      filteredData.forEach((food) => {
        const row = document.createElement("tr");
        const isSpecial = food.todayspecial === "yes";

        row.innerHTML = `
          <td class="item_name">
            ${food.item}
            ${isSpecial
            ? `<img src="./Special_logo.gif" alt="Special" class="special-gif">`
            : ""
          }
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
