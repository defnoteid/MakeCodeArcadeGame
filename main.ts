function createAnimations () {
    characterAnimations.loopFrames(
    playerSpr,
    assets.animation`idle`,
    1000,
    characterAnimations.rule(Predicate.FacingRight, Predicate.HittingWallDown, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    playerSpr,
    assets.animation`idleL`,
    1000,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.HittingWallDown, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    playerSpr,
    assets.animation`walk`,
    50,
    characterAnimations.rule(Predicate.FacingRight, Predicate.HittingWallDown, Predicate.Moving)
    )
    characterAnimations.loopFrames(
    playerSpr,
    assets.animation`walkL`,
    50,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.HittingWallDown, Predicate.Moving)
    )
    characterAnimations.loopFrames(
    playerSpr,
    assets.animation`walk`,
    1,
    characterAnimations.rule(Predicate.FacingRight, Predicate.Moving)
    )
    characterAnimations.loopFrames(
    playerSpr,
    assets.animation`walkL`,
    1,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.Moving)
    )
}
function lerp (a: number, b: number, alpha: number) {
    return a + alpha * (b - a)
}
function isGrounded (sprite: Sprite) {
    return sprite.isHittingTile(CollisionDirection.Bottom)
}
let playerSpr: Sprite = null
effects.blizzard.startScreenEffect()
scene.setBackgroundColor(6)
tiles.setCurrentTilemap(tilemap`level`)
playerSpr = sprites.create(assets.image`hitbox`, SpriteKind.Player)
createAnimations()
playerSpr.ay = 150
tiles.placeOnRandomTile(playerSpr, assets.tile`spawn`)
playerSpr.setScale(2, ScaleAnchor.Bottom)
game.onUpdate(function () {
    // Move camera to player
    scene.centerCameraAt(lerp(scene.cameraProperty(CameraProperty.X), playerSpr.x, 0.25), lerp(scene.cameraProperty(CameraProperty.Y), playerSpr.y, 0.25))
    playerSpr.fx = isGrounded(playerSpr)?500:150
    playerSpr.vx += controller.dx(isGrounded(playerSpr)?600:250)
    if (controller.A.isPressed() && isGrounded(playerSpr)) {
        playerSpr.vy += -100
    }
})
