input.onButtonPressed(Button.A, function () {
    astronave.change(LedSpriteProperty.X, -1)
    radio.sendString("anL")
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "an2L") {
        astronave_2.change(LedSpriteProperty.X, -1)
    }
    if (receivedString == "an2R") {
        astronave_2.change(LedSpriteProperty.X, 1)
    }
})
input.onButtonPressed(Button.B, function () {
    astronave.change(LedSpriteProperty.X, 1)
    radio.sendString("anR")
})
function generateAsteroid () {
    asteroid = game.createSprite(randint(0, 4), 0)
    radio.sendNumber(asteroid.get(LedSpriteProperty.X))
}
let asteroid: game.LedSprite = null
let astronave_2: game.LedSprite = null
let astronave: game.LedSprite = null
radio.setGroup(69)
game.setScore(3)
astronave = game.createSprite(2, 4)
astronave_2 = game.createSprite(2, 3)
generateAsteroid()
basic.forever(function () {
    basic.pause(500)
    while (asteroid.get(LedSpriteProperty.Y) <= 3) {
        asteroid.change(LedSpriteProperty.Y, 1)
        radio.sendString("moveAsteroid")
        basic.pause(500)
        if (asteroid.isTouching(astronave_2)) {
            game.addScore(-1)
        }
    }
    if (asteroid.isTouching(astronave)) {
        game.addScore(-1)
    }
    asteroid.delete()
    basic.pause(500)
    generateAsteroid()
})
