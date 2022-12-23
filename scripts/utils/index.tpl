<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width">
    <title>Biomaterials Club @Genspace</title>
    <link rel="shortcut icon" type="image/png" href="genspace-icon.png"/>

    <link rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Amatic+SC">
  
    <link rel="stylesheet" href="styles.css">
</head>

<body class="dark-bg">

    <div class="page">
        <button class="dashboard" id="dashboard">Dashboard</button>    
        <div class="controls">
            <div class="controls-left">
                <button onclick="setBackground('black')">Background: Black</button>
                <button onclick="setBackground('blue')">Background: Blue lines</button>
                <button onclick="setBackground('green')">Background: Plant</button>
                <button onclick="setBackground('gray')">Background: Stairs</button>
                <button onclick="togglePoem(this)">Show Poem</button>
           </div>
            <div class="controls-right">
                <button onclick="setColumnSize(3)">3 Columns</button>
                <button onclick="setColumnSize(5)">5 Columns</button>
                <button onclick="setColumnSize(7)">7 Columns</button>
                <button onclick="setColumnSize(10)">10 Columns</button>
                <button onclick="setColumnSize(12)">12 Columns</button>
                <button onclick="setColumnSize(20)">20Columns</button>
                <button onclick="setColumnSize(30)">30Columns</button>    
            </div>
        </div>
    
        <div class="banner">
            <div class="middle">
                <h1>
                    BioMaterials Club
                </h1>
                <div>
                    <img class="logo" width="250" src="https://images.squarespace-cdn.com/content/v1/588b7cc315d5dbdea1425e5e/1570552144192-LKZBXTCCBNBD5IE3NRVM/a1.png?format=250w" />
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

    By GPT3 ChatAI
                </pre>
            </div>
        </div>
    
        <div class="container">
            <video controls width="250" preload="metadata">
                <source src="videos/20220728_122356.mp4#t=2.5"
                        type="video/mp4">
            </video>

${images}

        </div>
    </div>
</body>
</html>

<script src="script.js"></script>
