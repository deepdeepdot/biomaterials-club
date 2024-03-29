<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width" />
    <title>Biomaterials Studio @Genspace</title>
    <link rel="shortcut icon" type="image/png" href="genspace-icon.png" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Amatic+SC"
    />
    <link rel="stylesheet" href="css/styles.css" />
    <link rel="stylesheet" href="css/responsive.css" />
  </head>

  <body class="gradient-bg">
    <div class="page">
      <div class="modal position style transparent invisible">
        <span class="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="orange"
              d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z"
            />
          </svg>
        </span>
        <div id="modal-content"></div>
      </div>

      <button class="toggle toggle-bananas command" id="bananas">
        Go Bananas!
      </button>
      <button
        class="toggle toggle-poem command"
        onclick="dashboard.togglePoem(this)"
      >
        Show Poem
      </button>

      <div class="dashboard">
        <div class="dashboard-left command">
          <button onclick="dashboard.setBackground('gradient')">
            Background Gradient
          </button>
          <button onclick="dashboard.setBackground('gradient2')">
            Background Gradient 2
          </button>
          <button onclick="dashboard.setBackground('gradient3')">
            Background Gradient 3
          </button>
          <button onclick="dashboard.setBackground('black')">
            Background Black
          </button>
          <button onclick="dashboard.setBackground('blue')">
            Background Blue lines
          </button>
          <button onclick="dashboard.setBackground('green')">
            Background Plant
          </button>
        </div>
        <div class="dashboard-right command">
          <button onclick="dashboard.setColumnSize(3)">3 Columns</button>
          <button onclick="dashboard.setColumnSize(5)">5 Columns</button>
          <button onclick="dashboard.setColumnSize(7)">7 Columns</button>
          <button onclick="dashboard.setColumnSize(10)">10 Columns</button>
          <button onclick="dashboard.setColumnSize(12)" class="desktop">
            12 Columns
          </button>
          <button onclick="dashboard.setColumnSize(20)" class="desktop">
            20 Columns
          </button>
        </div>
      </div>

      <div class="banner">
        <div class="middle">
          <h1>BioMaterials Studio</h1>
          <div>
            <img
              class="animated-hue"
              width="250"
              src="https://images.squarespace-cdn.com/content/v1/588b7cc315d5dbdea1425e5e/1570552144192-LKZBXTCCBNBD5IE3NRVM/a1.png?format=250w"
            />
          </div>
          <pre class="poem anim">

 We live in a world of plastics and pollution,
 A world of destruction, of land and of ocean,
 Where our air and water is filled with debris,
 And the future of our planet is unclear to me.

 But biomaterials offer a new solution,
 A future of hope for us all to live in,
 A future of clean air, water, and land,
 A future we can all understand.

 Biomaterials offer a new way,
 A way to reduce our plastic waste,
 A way to restore the Earth’s balance and peace,
 A way to create a future that will never cease.

 Biomaterials are made from renewable sources,
 From plants and animals and more,
 They require less energy to create and use,
 And can help us reduce our global emissions too.

 No longer will our planet suffer
 From the effects of plastic pollution,
 Biomaterials will help us create a better world,
 A world of clean air and water and land,
 A world of hope and new possibilities.

 By Chat GPT. ${version}

          </pre>
        </div>
      </div>

      <main class="main">
${imageTags}
        <script type="module">
          import { setupDashboard } from './js/dashboard.mjs';
          var startTime = window.performance.now();
${imagesAsJS}
          setupDashboard(startTime);
        </script>
      </main>
      <div class="progress-bar"></div>
    </div>
    <!-- page -->
  </body>
</html>

<script type="module">
  import { setColumnSize, togglePoem, setBackground } from './js/dashboard.mjs';

  window.dashboard = {
    setColumnSize,
    togglePoem,
    setBackground
  };
</script>
