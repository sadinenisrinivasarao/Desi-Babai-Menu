}

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