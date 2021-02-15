(() => {
  const socket = io()  
 
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { 
      default: 'arcade',
      arcade: { debug: true }
    },
    scene: {
      preload,
      create,
      update,
    } 
  }

  const game = new Phaser.Game(config)

  let cursors
  let player
  let player2

  function preload() {
    
  }

  function create() {
    cursors = this.input.keyboard.createCursorKeys()
    player = this.add.circle(200, 200, 20, 0x6666ff)
    this.physics.add.existing(player, false);
    player.body.setCollideWorldBounds(true);
    player.body.setBounce(1)

    player2 = this.add.circle(400, 400, 20, 0x3333ee)
    this.physics.add.existing(player2, false);
    player2.body.setCollideWorldBounds(true);
    player2.body.setBounce(1)

    this.physics.add.collider(player, player2)

    socket.on('currentPlayers', renderPlayers)
  }

  function update() {
    player.body.setVelocity(0)
    if (cursors.left.isDown) {
      player.body.setVelocityX(-300)
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(300)
    } 
    if (cursors.up.isDown) {
      player.body.setVelocityY(-300)
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(300)
    }
  }

  function renderPlayers(players) {
    console.log(players)
  }
})()
