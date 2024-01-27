function lerp (a: number, b: number, alpha: number) {
    return a + alpha * (b - a)
}
function isGrounded (sprite: Sprite) {
    return sprite.isHittingTile(CollisionDirection.Bottom)
}
effects.blizzard.startScreenEffect()
scene.setBackgroundColor(6)
tiles.setCurrentTilemap(tilemap`level`)
let playerSpr = sprites.create(assets.image`redPlr`, SpriteKind.Player)
playerSpr.ay = 150
game.onUpdate(function () {
    // Move camera to player
    scene.centerCameraAt(lerp(scene.cameraProperty(CameraProperty.X), playerSpr.x, 0.25), lerp(scene.cameraProperty(CameraProperty.Y), playerSpr.y, 0.25))
    playerSpr.fx = isGrounded(playerSpr)?500:150
    playerSpr.vx += controller.dx(isGrounded(playerSpr)?600:250)
    if (controller.A.isPressed() && isGrounded(playerSpr)) {
        playerSpr.vy += -100
    }
})
