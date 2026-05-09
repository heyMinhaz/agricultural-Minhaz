const guideData = {
  crop: {
    title: "Guides Based on Crop Types",
    intro: "Choose crop-specific practices for grains, fruits, vegetables, and cash crops.",
    items: [
      "Select certified seeds or healthy planting materials.",
      "Prepare land according to crop root depth and water needs.",
      "Apply organic matter before sowing or transplanting.",
      "Follow proper spacing to improve sunlight and airflow.",
      "Harvest at the correct maturity stage for better yield and quality."
    ]
  },
  season: {
    title: "Guides Based on Seasons",
    intro: "Plan farming activities according to rainfall, temperature, and crop growth stages.",
    items: [
      "Pre-season: test soil, repair irrigation channels, and collect inputs.",
      "Planting season: sow or transplant at recommended dates.",
      "Growing season: weed, irrigate, monitor pests, and apply nutrients.",
      "Harvest season: collect produce during dry weather when possible.",
      "Post-harvest: dry, grade, pack, and store produce safely."
    ]
  },
  method: {
    title: "Guides Based on Farming Methods",
    intro: "Use suitable techniques for conventional, organic, mixed, or water-saving farming.",
    items: [
      "Organic method: use compost, green manure, mulch, and biological control.",
      "Conventional method: use inputs carefully according to label and expert advice.",
      "Integrated method: combine soil care, pest monitoring, and efficient irrigation.",
      "Raised bed method: improve drainage for vegetables and root crops.",
      "Drip irrigation method: save water and reduce leaf disease."
    ]
  }
};

const cropData = {
  grains: [
    {
      name: "Rice",
      varieties: "Aromatic, hybrid, short-duration, drought-tolerant",
      cultivation: "Nursery raising, transplanting or direct seeding, irrigation management",
      soil: "Clay loam or fertile lowland soil with good water retention",
      harvest: "Harvest when most grains turn golden and firm",
      nutrition: "Carbohydrates, small protein amount, B vitamins",
      uses: "Staple food, rice flour, puffed rice, animal feed by-products"
    },
    {
      name: "Wheat",
      varieties: "Bread wheat, durum wheat, heat-tolerant varieties",
      cultivation: "Line sowing, seed treatment, timely irrigation, weed control",
      soil: "Well-drained loam with moderate fertility",
      harvest: "Harvest when spikes dry and grains become hard",
      nutrition: "Carbohydrates, protein, fiber, minerals",
      uses: "Flour, bread, noodles, livestock feed"
    }
  ],
  fruits: [
    {
      name: "Mango",
      varieties: "Alphonso, Langra, Himsagar, Kent",
      cultivation: "Grafted plants, pruning, flowering-stage care, fruit fly control",
      soil: "Deep, well-drained loam or alluvial soil",
      harvest: "Harvest mature fruit before it becomes fully soft",
      nutrition: "Vitamin A, vitamin C, fiber, antioxidants",
      uses: "Fresh fruit, juice, pickle, chutney, dried slices"
    },
    {
      name: "Banana",
      varieties: "Cavendish, plantain, lady finger, local dessert types",
      cultivation: "Sucker or tissue culture planting, mulching, regular irrigation",
      soil: "Fertile soil with high organic matter and good drainage",
      harvest: "Harvest bunch when fingers become full and round",
      nutrition: "Potassium, vitamin B6, carbohydrates, fiber",
      uses: "Fresh fruit, cooking, chips, flour"
    }
  ],
  vegetables: [
    {
      name: "Tomato",
      varieties: "Cherry, determinate, indeterminate, processing types",
      cultivation: "Seedling transplanting, staking, pruning, balanced fertilizer",
      soil: "Well-drained sandy loam with organic matter",
      harvest: "Harvest from breaker stage to red-ripe stage",
      nutrition: "Vitamin C, potassium, lycopene",
      uses: "Fresh salad, sauce, paste, soup"
    },
    {
      name: "Spinach",
      varieties: "Savoy, semi-savoy, smooth leaf",
      cultivation: "Direct sowing, light irrigation, repeated leaf cutting",
      soil: "Moist fertile loam with good organic content",
      harvest: "Harvest tender leaves 30-45 days after sowing",
      nutrition: "Iron, folate, vitamin K, vitamin A",
      uses: "Leafy vegetable, soup, cooked greens"
    }
  ],
  cash: [
    {
      name: "Cotton",
      varieties: "Upland, long-staple, hybrid cotton",
      cultivation: "Line sowing, square-stage monitoring, nutrient management",
      soil: "Deep black soil or well-drained alluvial soil",
      harvest: "Pick open bolls in dry weather",
      nutrition: "Not a food crop; cottonseed provides oil and meal",
      uses: "Fiber, cottonseed oil, animal feed cake"
    },
    {
      name: "Sugarcane",
      varieties: "Early, mid-late, high-sucrose, disease-resistant types",
      cultivation: "Sett planting, earthing up, irrigation, ratoon management",
      soil: "Deep fertile loam or clay loam",
      harvest: "Harvest mature cane when sucrose is high",
      nutrition: "Source of sucrose and energy",
      uses: "Sugar, jaggery, ethanol, molasses, bagasse"
    }
  ]
};

const pestData = {
  ipm: {
    title: "Integrated Pest Management (IPM)",
    points: [
      "Use resistant crop varieties where available.",
      "Rotate crops to break pest and disease cycles.",
      "Keep fields clean by removing infected plant residue.",
      "Apply pesticides only when pest levels cross economic thresholds."
    ]
  },
  monitoring: {
    title: "Monitoring and Early Detection",
    points: [
      "Inspect fields at least twice a week.",
      "Check the underside of leaves for eggs, larvae, and mites.",
      "Use sticky traps, pheromone traps, and field records.",
      "Treat small affected areas early to prevent spread."
    ]
  },
  biological: {
    title: "Biological Controls",
    points: [
      "Protect lady beetles, lacewings, spiders, and parasitoid wasps.",
      "Avoid broad-spectrum spraying when beneficial insects are active.",
      "Use approved microbial products when suitable.",
      "Grow flowering border plants to support natural enemies."
    ]
  },
  organic: {
    title: "Organic Remedies",
    points: [
      "Use neem extract for many sucking and chewing pests.",
      "Apply soap spray carefully for soft-bodied insects.",
      "Use ash barriers where suitable for crawling pests.",
      "Use clean water, correct dilution, and expert guidance before spraying."
    ]
  }
};

const guideContent = document.querySelector("#guideContent");
const guideSelect = document.querySelector("#guideSelect");
const guideTabs = document.querySelectorAll("[data-guide]");
const cropContent = document.querySelector("#cropContent");
const cropSelect = document.querySelector("#cropSelect");
const cropTabs = document.querySelectorAll("[data-crop-category]");
const pestContent = document.querySelector("#pestContent");
const pestSelect = document.querySelector("#pestSelect");
const pestTabs = document.querySelectorAll("[data-pest]");
const form = document.querySelector(".contact-form");
const statusText = document.querySelector("#formStatus");

let currentCropCategory = "grains";

function setActive(buttons, attribute, value) {
  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset[attribute] === value);
  });
}

function renderGuide(type) {
  const guide = guideData[type];
  guideContent.innerHTML = `
    <h3>${guide.title}</h3>
    <p>${guide.intro}</p>
    <div class="content-grid">
      <div>
        <h3>Step-by-step Instructions</h3>
        <ol class="info-list">
          ${guide.items.map((item) => `<li>${item}</li>`).join("")}
        </ol>
      </div>
      <div>
        <h3>Tips and Best Practices</h3>
        <ul class="info-list">
          <li>Keep records of planting date, fertilizer, irrigation, and pest control.</li>
          <li>Follow local extension service recommendations.</li>
          <li>Use clean tools and safe storage for seeds and produce.</li>
        </ul>
      </div>
    </div>
  `;
  guideSelect.value = type;
  setActive(guideTabs, "guide", type);
}

function fillCropSelect(category) {
  cropSelect.innerHTML = cropData[category]
    .map((crop, index) => `<option value="${index}">${crop.name}</option>`)
    .join("");
}

function renderCrop(category, index) {
  const crop = cropData[category][index];
  cropContent.innerHTML = `
    <h3>${crop.name}</h3>
    <table class="details-table">
      <tbody>
        <tr><th>Varieties</th><td>${crop.varieties}</td></tr>
        <tr><th>Cultivation Method</th><td>${crop.cultivation}</td></tr>
        <tr><th>Soil Requirement</th><td>${crop.soil}</td></tr>
        <tr><th>Harvesting Technique</th><td>${crop.harvest}</td></tr>
        <tr><th>Nutritional Value</th><td>${crop.nutrition}</td></tr>
        <tr><th>Potential Uses</th><td>${crop.uses}</td></tr>
      </tbody>
    </table>
  `;
}

function setCropCategory(category) {
  currentCropCategory = category;
  fillCropSelect(category);
  cropSelect.value = "0";
  renderCrop(category, 0);
  setActive(cropTabs, "cropCategory", category);
}

function renderPest(type) {
  const pest = pestData[type];
  pestContent.innerHTML = `
    <h3>${pest.title}</h3>
    <ul class="info-list">
      ${pest.points.map((point) => `<li>${point}</li>`).join("")}
    </ul>
  `;
  pestSelect.value = type;
  setActive(pestTabs, "pest", type);
}

guideTabs.forEach((button) => {
  button.addEventListener("click", () => renderGuide(button.dataset.guide));
});

guideSelect.addEventListener("change", () => renderGuide(guideSelect.value));

cropTabs.forEach((button) => {
  button.addEventListener("click", () => setCropCategory(button.dataset.cropCategory));
});

cropSelect.addEventListener("change", () => {
  renderCrop(currentCropCategory, Number(cropSelect.value));
});

pestTabs.forEach((button) => {
  button.addEventListener("click", () => renderPest(button.dataset.pest));
});

pestSelect.addEventListener("change", () => renderPest(pestSelect.value));

form.addEventListener("submit", function (event) {
  event.preventDefault();
  statusText.textContent = "Thank you. Your inquiry has been submitted for expert review.";
  form.reset();
});

renderGuide("crop");
setCropCategory("grains");
renderPest("ipm");
