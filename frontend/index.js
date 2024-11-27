fetch("/api/foodItems")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    const categories = [...new Set(data.map(food => food.category))];
    const tabs = document.getElementById("tabs");
    const tableBody = document.querySelector("#food-table tbody");
    const renderTable = (category) => {
      tableBody.innerHTML = "";
      const filteredData = data.filter(food => food.category === category);
      filteredData.forEach(food => {
        const row = document.createElement("tr");

        const isSpecial = food.todayspecial === "yes";

        row.innerHTML = `
              <td class="item_name ${food.todayspecial}">
                ${food.item}
                ${isSpecial ? `<img src="./Special_logo.gif" alt="Special" class="special-gif">` : ""}
              </td>
              <td>$ ${food.price.toFixed(2)}</td>
            `;
        tableBody.appendChild(row);
      });
    };

    categories.forEach(category => {
      const tab = document.createElement("div");
      tab.className = "tab";
      tab.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
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
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
