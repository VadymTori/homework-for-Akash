// You only need to touch comments with the todo of this file to complete the assignment!

/*
=== How to build on top of the starter code? ===

Problems have multiple solutions.
We have created a structure to help you on solving this problem.
On top of the structure, we created a flow shaped via the below functions.
We left descriptions, hints, and to-do sections in between.
If you want to use this code, fill in the to-do sections.
However, if you're going to solve this problem yourself in different ways, you can ignore this starter code.
 */

/*
=== Terminology for the API ===

Clue: The name given to the structure that contains the question and the answer together.
Category: The name given to the structure containing clues on the same topic.
 */

/*
=== Data Structure of Request the API Endpoints ===

/categories:
[
  {
    "id": <category ID>,
    "title": <category name>,
    "clues_count": <number of clues in the category where each clue has a question, an answer, and a value>
  },
  ... more categories
]

/category:
{
  "id": <category ID>,
  "title": <category name>,
  "clues_count": <number of clues in the category>,
  "clues": [
    {
      "id": <clue ID>,
      "answer": <answer to the question>,
      "question": <question>,
      "value": <value of the question (be careful not all questions have values) (Hint: you can assign your own value such as 200 or skip)>,
      ... more properties
    },
    ... more clues
  ]
}
 */
//------------------------------------------------------------------------------------
//Hey, Akash!I'm still working on sound production for the game...
/** API_URL — base URL for all Axios requests to the Rithm Jeopardy API. */
const API_URL = "https://rithm-jeopardy.herokuapp.com/api/";

/** NUMBER_OF_CATEGORIES — how many category columns to display across the board (6). */
const NUMBER_OF_CATEGORIES = 6;

/** NUMBER_OF_CLUES_PER_CATEGORY — how many clue rows to show under each category (5). */
const NUMBER_OF_CLUES_PER_CATEGORY = 5;

/** REVEAL_SECONDS — how long the question stays visible before the answer auto-reveals. */
const REVEAL_SECONDS = 10;

/**
 * categories — global array of category objects, each holding its clues.
 * Mutated during play: clues are removed as the user clicks them.
 * When this array is empty, the game has ended.
 */
let categories = [];

/** activeClue — the clue object the user most recently clicked on the board. */
/**Check other ways to click */
let activeClue = null;

/**
 * activeClueMode — tracks what #active-clue is currently showing:
 *   0 = empty (waiting for a clue click)
 *   1 = showing the question (click to reveal answer)
 *   2 = showing the answer  (click to clear)
 */
let activeClueMode = 0;

/**
 * isPlayButtonClickable — guards the #play button.
 * true  → user can start or restart the game.
 * false → game is in progress; button clicks are ignored.
 */
let isPlayButtonClickable = true;

/** revealTimeoutId — setTimeout handle for the 10-second auto-reveal. */
let revealTimeoutId = null;

/** countdownIntervalId — setInterval handle that updates the visible timer each second. */
let countdownIntervalId = null;

/**
 * clearActiveTimers — cancels any running reveal/countdown timers.
 * Called before starting a new clue or resetting the game.
 */
function clearActiveTimers ()
{
  if (revealTimeoutId !== null)
  {
    clearTimeout(revealTimeoutId);
    revealTimeoutId = null;
  }

  if (countdownIntervalId !== null)
  {
    clearInterval(countdownIntervalId);
    countdownIntervalId = null;
  }
}

/**
 * showQuestionWithTimer — renders the clue question in #active-clue with a
 * visible countdown; automatically reveals the answer when the timer hits 0.
 *
 * @param {Object} clue — the active clue object ({ question, answer, value, id })
 */
function showQuestionWithTimer (clue)
{
  clearActiveTimers();

  const circumference = 2 * Math.PI * 30; // 2πr where r = 30 (the radius of the SVG circle)
  let secondsLeft = REVEAL_SECONDS;
// max seconds value 10
  $("#active-clue")
    .removeClass("is-answer is-end")
    .addClass("is-question")
    .html(`
      <p class="active-clue__question">${clue.question}</p>
      <div class="active-clue__timer">
        <div class="active-clue__timer-ring">
          <svg viewBox="0 0 72 72" aria-hidden="true">
            <circle class="active-clue__timer-track" cx="36" cy="36" r="30"></circle>
            <circle
              class="active-clue__timer-progress"
              cx="36"
              cy="36"
              r="30"
              stroke-dasharray="${circumference}"
              stroke-dashoffset="0"
            ></circle>
          </svg>
          <span class="active-clue__timer-value">${secondsLeft}</span>
        </div>
        <span class="active-clue__timer-label">seconds until answer</span>
      </div>
    `);

  const $progress = $("#active-clue .active-clue__timer-progress");
  const $timerValue = $("#active-clue .active-clue__timer-value");

  countdownIntervalId = setInterval(() =>
  {
    secondsLeft -= 1;
    $timerValue.text(Math.max(secondsLeft, 0));
    $progress.attr(
      "stroke-dashoffset",
      circumference * (1 - secondsLeft / REVEAL_SECONDS)
    );

    if (secondsLeft <= 0)
    {
      clearInterval(countdownIntervalId);
      countdownIntervalId = null;
    }
  }, 1000);

  revealTimeoutId = setTimeout(() =>
  {
    revealAnswer();
    revealTimeoutId = null;
  }, REVEAL_SECONDS * 1000);
}

/**
 * revealAnswer — switches #active-clue from the timed question view to the answer.
 */
function revealAnswer ()
{
  clearActiveTimers();
  activeClueMode = 2;

  $("#active-clue")
    .removeClass("is-question")
    .addClass("is-answer")
    .html(`
      <p class="active-clue__answer">
        <span class="active-clue__answer-label">Correct answer</span>
        ${activeClue.answer}
      </p>
      <span class="active-clue__hint">Click to continue</span> 
    `);
    // make it bigger to see Click to continue  
}

// Delegated click handler so dynamically created .clue rows still receive clicks.
$("#clues").on("click", ".clue", handleClickOfClue);

$("#play").on("click", handleClickOfPlay);

/**
 * Manages the behavior of the play button (start or restart) when clicked.
 * Sets up the game.
 *
 * Hints:
 * - Sets up the game when the play button is clickable.
 */
function handleClickOfPlay ()
{
  // Only start/restart when the button is not locked during active play.
  if (isPlayButtonClickable)
  {
    // Lock the button so the user cannot re-fetch mid-game.
    isPlayButtonClickable = false;

    // Kick off the async setup pipeline (fetch data → build board).
    setupTheGame();
  }
}

/**
 * Sets up the game.
 *
 * 1. Cleans the game since the user can be restarting the game.
 * 2. Get category IDs
 * 3. For each category ID, get the category with clues.
 * 4. Fill the HTML table with the game data.
 *
 * Hints:
 * - The game play is managed via events.
 */
async function setupTheGame ()
{
  // Show the Font Awesome spinner while API requests are in flight.
  $("#spinner").removeClass("disabled");

  // --- Reset the DOM to a clean slate (important on Restart) ---
  $("#categories").empty();       // clear old category header cells
  $("#clues").empty();            // clear old clue column cells
  $("#active-clue").empty();      // clear any question/answer/end text
  $("#play").text("Start the Game!");

  // Reset in-memory game state variables.
  clearActiveTimers();
  activeClue = null;
  activeClueMode = 0;
  categories = [];
  $("#active-clue").removeClass("is-question is-answer is-end");

  try
  {
    // Step 1: get an array of 6 random category IDs from the API.
    const categoryIds = await getCategoryIds();

    // Step 2: for each ID, fetch the full category object with its clues.
    for (const categoryId of categoryIds)
    {
      const categoryWithClues = await getCategoryData(categoryId);
      categories.push(categoryWithClues);
    }

    // Hide the spinner now that all data has arrived.
    $("#spinner").addClass("disabled");

    // Step 3: render the fetched data into the HTML table.
    fillTable(categories);
  }
  catch (error)
  {
    // On any network/API failure, hide spinner and unlock the play button.
    $("#spinner").addClass("disabled");
    isPlayButtonClickable = true;
    $("#active-clue").text("Could not load game data. Please try again.");
    console.error("setupTheGame error:", error);
  }
}

/**
 * Gets as many category IDs as in the `NUMBER_OF_CATEGORIES` constant.
 * Returns an array of numbers where each number is a category ID.
 *
 * Hints:
 * - Use /categories endpoint of the API.
 * - Request as many categories as possible, such as 100. Randomly pick as many categories as given in the `NUMBER_OF_CATEGORIES` constant, if the number of clues in the category is enough (<= `NUMBER_OF_CLUES` constant).
 */
async function getCategoryIds ()
{
  // Fetch up to 100 category summaries from the API.
  const response = await axios.get(`${API_URL}categories`, {
    params: { count: 100 },
  });

  // Keep only categories that have at least NUMBER_OF_CLUES_PER_CATEGORY clues.
  const eligibleCategories = response.data.filter(
    (category) => category.clues_count >= NUMBER_OF_CLUES_PER_CATEGORY
  );

  // Use Lodash to randomly sample exactly NUMBER_OF_CATEGORIES unique IDs.
  const sampledCategories = _.sampleSize(eligibleCategories, NUMBER_OF_CATEGORIES);

  // Return just the numeric IDs — getCategoryData() fetches the full objects.
  const ids = sampledCategories.map((category) => category.id);

  return ids;
}

/**
 * Gets category with as many clues as given in the `NUMBER_OF_CLUES` constant.
 * Returns the below data structure:
 *  {
 *    "id": <category ID>
 *    "title": <category name>
 *    "clues": [
 *      {
 *        "id": <clue ID>,
 *        "value": <value of the question>,
 *        "question": <question>,
 *        "answer": <answer to the question>
 *      },
 *      ... more clues
 *    ]
 *  }
 *
 * Hints:
 * - You need to call this function for each category ID returned from the `getCategoryIds` function.
 * - Use /category endpoint of the API.
 * - In the API, not all clues have a value. You can assign your own value or skip that clue.
 */
async function getCategoryData (categoryId)
{
  // Fetch the full category object (includes a large clues array) from the API.
  const response = await axios.get(`${API_URL}category`, {
    params: { id: categoryId },
  });

  const apiCategory = response.data;

  // Randomly pick NUMBER_OF_CLUES_PER_CATEGORY clues from the returned pool.
  const sampledClues = _.sampleSize(apiCategory.clues, NUMBER_OF_CLUES_PER_CATEGORY);

  // Normalise each clue to the shape our game expects, assigning a dollar
  // value when the API did not provide one (100, 200, 300, 400, 500).
  const clues = sampledClues.map((clue, index) => ({
    id: clue.id,
    value: clue.value || (index + 1) * 100,
    question: clue.question,
    answer: clue.answer,
  }));

  const categoryWithClues = {
    id: apiCategory.id,
    title: apiCategory.title,
    clues: clues,
  };

  return categoryWithClues;
}

/**
 * Fills the HTML table using category data.
 *
 * Hints:
 * - You need to call this function using an array of categories where each element comes from the `getCategoryData` function.
 * - Table head (thead) has a row (#categories).
 *   For each category, you should create a cell element (th) and append that to it.
 * - Table body (tbody) has a row (#clues).
 *   For each category, you should create a cell element (td) and append that to it.
 *   Besides, for each clue in a category, you should create a row element (tr) and append it to the corresponding previously created and appended cell element (td).
 * - To this row elements (tr) should add an event listener (handled by the `handleClickOfClue` function) and set their IDs with category and clue IDs. This will enable you to detect which clue is clicked.
 */
function fillTable (categories)
{
  // $categoriesRow — the <tr id="categories"> in <thead>; receives <th> cells.
  const $categoriesRow = $("#categories");

  // $cluesRow — the single <tr id="clues"> in <tbody>; receives one <td> per category.
  const $cluesRow = $("#clues");

  for (const category of categories)
  {
    // --- Category header ---
    // Append a <th> with the category title to the header row.
    $categoriesRow.append($("<th>").text(category.title));

    // --- Clue column for this category ---
    // Each category gets one <td> containing a nested <table> of clue rows.
    const $columnCell = $("<td>");
    const $innerTable = $("<table>");

    for (const clue of category.clues)
    {
      // Each clue is a card-style cell showing its dollar value until clicked.
      // The id format "categoryId-clueId" lets handleClickOfClue find the clue.
      const $clueRow = $("<tr>")
        .addClass("clue")
        .attr("id", `${category.id}-${clue.id}`)
        .append(
          $("<td>").append(
            $("<div>").addClass("clue-card").append(
              $("<span>").addClass("clue-card__value").text(`$${clue.value}`)
            )
          )
        );

      $innerTable.append($clueRow);
    }

    $columnCell.append($innerTable);
    $cluesRow.append($columnCell);
  }
}

/**
 * Manages the behavior when a clue is clicked.
 * Displays the question if there is no active question.
 *
 * Hints:
 * - Control the behavior using the `activeClueMode` variable.
 * - Identify the category and clue IDs using the clicked element's ID.
 * - Remove the clicked clue from categories since each clue should be clickable only once. Don't forget to remove the category if all the clues are removed.
 * - Don't forget to update the `activeClueMode` variable.
 *
 */
function handleClickOfClue (event)
{
  // Ignore board clicks while a question/answer is already showing in #active-clue.
  if (activeClueMode !== 0)
  {
    return;
  }

  // $clickedClue — the <tr class="clue"> element the user clicked.
  const $clickedClue = $(event.currentTarget);

  // Already-played cards stay on the board but cannot be clicked again.
  if ($clickedClue.hasClass("viewed"))
  {
    return;
  }

  // elementId — string like "2-1183" → categoryId 2, clueId 1183.
  const elementId = $clickedClue.attr("id");
  const [categoryId, clueId] = elementId.split("-").map(Number);

  // Locate the matching category and clue inside the global categories array.
  const categoryIndex = categories.findIndex((cat) => cat.id === categoryId);
  const clueIndex = categories[categoryIndex].clues.findIndex((clue) => clue.id === clueId);

  // Store the clue so handleClickOfActiveClue can show its answer later.
  activeClue = categories[categoryIndex].clues[clueIndex];

  // Remove this clue from the in-memory array (each clue is playable once).
  categories[categoryIndex].clues.splice(clueIndex, 1);

  // If the category has no clues left, remove the whole category object.
  if (categories[categoryIndex].clues.length === 0)
  {
    categories.splice(categoryIndex, 1);
  }

  // Mark the board cell as viewed (line-through via .viewed in style.css).
  $clickedClue.addClass("viewed");

  // Show the question with a 10-second timer; answer reveals automatically.
  activeClueMode = 1;
  showQuestionWithTimer(activeClue);
}

$("#active-clue").on("click", handleClickOfActiveClue);

/**
 * Manages the behavior when a displayed question or answer is clicked.
 * Displays the answer if currently displaying a question.
 * Clears if currently displaying an answer.
 *
 * Hints:
 * - Control the behavior using the `activeClueMode` variable.
 * - After clearing, check the categories array to see if it is empty to decide to end the game.
 * - Don't forget to update the `activeClueMode` variable.
 */
function handleClickOfActiveClue (event)
{
  // During the timed question phase, wait for the auto-reveal — ignore clicks.
  if (activeClueMode === 1)
  {
    return;
  }

  if (activeClueMode === 2)
  {
    // Answer is showing → clear the display and reset mode.
    clearActiveTimers();
    activeClueMode = 0;
    activeClue = null;
    $("#active-clue").removeClass("is-answer").empty();

    // When every clue has been clicked, categories is empty → game over.
    if (categories.length === 0)
    {
      isPlayButtonClickable = true;
      $("#play").text("Restart the Game!");
      $("#active-clue").addClass("is-end").html("The End!");
    }
  }
}