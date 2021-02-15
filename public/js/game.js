(() => {
  const socket = io()  
 
  

  let cursors
  let player

  function preload() {
    
  }

  function create() {
    cursors = this.input.keyboard.createCursorKeys()
    this.otherPlayers = this.physics.add.group()
    socket.on('currentPlayers', players => renderPlayers(players, this))
  }

  function update() {
    if (!player) return
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

  function renderPlayers(players, context) {
    Object.entries(players).forEach(([id, data]) => {
      const {r,g,b} = new Phaser.Display.Color().random(80, 200);
      let newPlayer = context.add.circle(data.x, data.y, 20, `0x${r}${g}${b}`)
      if (socket.id === id) {
        context.physics.add.existing(newPlayer, false);
        newPlayer.body.setCollideWorldBounds(true);
        newPlayer.body.setBounce(1)
        player = newPlayer
        context.physics.add.collider(player, context.otherPlayers)
      } else {
        context.otherPlayers.add(newPlayer)
      }
    })
  }

  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { 
      default: 'arcade',
      arcade: { debug: false }
    },
    scene: {
      preload,
      create,
      update,
    } 
  }

  const game = new Phaser.Game(config)

})()
