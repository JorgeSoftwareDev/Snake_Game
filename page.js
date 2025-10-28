document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  if (!startBtn) return;

  startBtn.addEventListener("click", handleStartGame);
});

function handleStartGame() {
  runIntroSequence().then(removeLandingScreen).then(loadGameScreen).then(startGameLogic); // you can hook game.js init here
}

// Flash + shake sequence
function runIntroSequence() {
  return new Promise((resolve) => {
    const body = document.body;
    let flashes = 0;

    function doFlash() {
      flashes++;

      body.classList.add("flash-invert", "shake");

      setTimeout(() => {
        body.classList.remove("flash-invert", "shake");

        if (flashes < 3) {
          setTimeout(doFlash, 300);
        } else {
          resolve();
        }
      }, 400);
    }

    doFlash();
  });
}

// remove landing container
function removeLandingScreen() {
  return new Promise((resolve) => {
    const landing = document.getElementById("landingScreen");
    if (!landing) {
      resolve();
      return;
    }

    landing.classList.add("fade-out");

    setTimeout(() => {
      landing.remove();
      resolve();
    }, 650);
  });
}

// 3. Inject the game
function loadGameScreen() {
  return new Promise((resolve) => {
    const root = document.getElementById("root");
    if (!root) {
      resolve();
      return;
    }

    root.innerHTML = `
			<div class="pageContainer">
				<div id="arcade" class="console">
					<div class="scoreContainer">
						<h2 class="levelNum">Level: <span id="levelNum">0</span></h2>
						<h2 class="scoreNum">Score: <span id="scoreNum">0</span></h2>
					</div>

					<canvas id="gameCanvas" class="gameCanvas" width="500px" height="500px"></canvas>
				</div>
			</div>
		`;

    resolve();
  });
}

function startGameLogic() {
  if (typeof main === "function") {
    initGame();
  }
}
