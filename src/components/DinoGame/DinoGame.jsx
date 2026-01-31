import { useState, useEffect, useRef, useCallback } from 'react'
import './DinoGame.css'

function DinoGame() {
    const canvasRef = useRef(null)
    const gameLoopRef = useRef(null)
    const gameStateRef = useRef(null)

    const [isRunning, setIsRunning] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false)
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem('dinoHighScore')
        return saved ? parseInt(saved, 10) : 0
    })

    // Game constants - matching original T-Rex Runner
    const CANVAS_WIDTH = 800
    const CANVAS_HEIGHT = 200
    const GROUND_Y = CANVAS_HEIGHT - 25
    const GRAVITY = 0.6
    const JUMP_VELOCITY = -12
    const INITIAL_SPEED = 6
    const MAX_SPEED = 13
    const SPEED_INCREMENT = 0.001

    // Dino dimensions
    const DINO_WIDTH = 44
    const DINO_HEIGHT = 47
    const DINO_DUCK_HEIGHT = 30
    const DINO_DUCK_WIDTH = 59

    // Obstacle dimensions
    const CACTUS_SMALL_WIDTH = 17
    const CACTUS_SMALL_HEIGHT = 35
    const CACTUS_LARGE_WIDTH = 25
    const CACTUS_LARGE_HEIGHT = 50
    const PTERODACTYL_WIDTH = 46
    const PTERODACTYL_HEIGHT = 40

    function initGameState() {
        return {
            dino: {
                x: 50,
                y: GROUND_Y - DINO_HEIGHT,
                width: DINO_WIDTH,
                height: DINO_HEIGHT,
                velocityY: 0,
                isJumping: false,
                isDucking: false,
                frame: 0,
                frameTimer: 0
            },
            obstacles: [],
            clouds: [],
            ground: { offset: 0 },
            score: 0,
            speed: INITIAL_SPEED,
            lastObstacleTime: 0,
            minObstacleInterval: 1500,
            isNight: false,
            nightTimer: 0,
            frameCount: 0
        }
    }

    // Draw the T-Rex dinosaur
    function drawDino(ctx, dino, frameCount) {
        ctx.save()

        const legOffset = Math.floor(frameCount / 5) % 2

        if (dino.isDucking) {
            // Ducking dino - lower and wider
            ctx.fillStyle = '#535353'
            // Body
            ctx.fillRect(dino.x, dino.y + 17, 55, 20)
            // Head
            ctx.fillRect(dino.x + 40, dino.y + 10, 18, 15)
            // Eye
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(dino.x + 50, dino.y + 12, 4, 4)
            // Legs (animated)
            ctx.fillStyle = '#535353'
            if (legOffset === 0) {
                ctx.fillRect(dino.x + 10, dino.y + 37, 6, 10)
                ctx.fillRect(dino.x + 30, dino.y + 37, 6, 10)
            } else {
                ctx.fillRect(dino.x + 15, dino.y + 37, 6, 10)
                ctx.fillRect(dino.x + 35, dino.y + 37, 6, 10)
            }
        } else {
            // Standing/jumping dino
            ctx.fillStyle = '#535353'

            // Body
            ctx.fillRect(dino.x + 10, dino.y + 10, 30, 30)

            // Head
            ctx.fillRect(dino.x + 25, dino.y, 20, 25)

            // Tail
            ctx.fillRect(dino.x, dino.y + 15, 15, 12)
            ctx.fillRect(dino.x - 5, dino.y + 18, 8, 6)

            // Eye
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(dino.x + 37, dino.y + 5, 5, 5)

            // Arms
            ctx.fillStyle = '#535353'
            ctx.fillRect(dino.x + 30, dino.y + 25, 8, 4)

            // Legs (animated when running)
            if (!dino.isJumping) {
                if (legOffset === 0) {
                    ctx.fillRect(dino.x + 15, dino.y + 40, 6, 12)
                    ctx.fillRect(dino.x + 28, dino.y + 40, 6, 8)
                } else {
                    ctx.fillRect(dino.x + 15, dino.y + 40, 6, 8)
                    ctx.fillRect(dino.x + 28, dino.y + 40, 6, 12)
                }
            } else {
                // Static legs when jumping
                ctx.fillRect(dino.x + 15, dino.y + 40, 6, 10)
                ctx.fillRect(dino.x + 28, dino.y + 40, 6, 10)
            }
        }

        ctx.restore()
    }

    // Draw cactus obstacles
    function drawCactus(ctx, obstacle) {
        ctx.fillStyle = '#535353'

        if (obstacle.type === 'cactus_small') {
            // Small cactus
            ctx.fillRect(obstacle.x + 5, obstacle.y, 7, obstacle.height)
            ctx.fillRect(obstacle.x, obstacle.y + 10, 5, 15)
            ctx.fillRect(obstacle.x + 12, obstacle.y + 8, 5, 12)
        } else if (obstacle.type === 'cactus_large') {
            // Large cactus
            ctx.fillRect(obstacle.x + 8, obstacle.y, 10, obstacle.height)
            ctx.fillRect(obstacle.x, obstacle.y + 15, 8, 20)
            ctx.fillRect(obstacle.x + 18, obstacle.y + 12, 8, 18)
        } else if (obstacle.type === 'cactus_group') {
            // Group of cacti
            ctx.fillRect(obstacle.x + 3, obstacle.y + 5, 6, obstacle.height - 5)
            ctx.fillRect(obstacle.x + 15, obstacle.y, 7, obstacle.height)
            ctx.fillRect(obstacle.x + 28, obstacle.y + 8, 6, obstacle.height - 8)
        }
    }

    // Draw pterodactyl
    function drawPterodactyl(ctx, obstacle, frameCount) {
        ctx.fillStyle = '#535353'
        const wingUp = Math.floor(frameCount / 8) % 2 === 0

        // Body
        ctx.fillRect(obstacle.x + 15, obstacle.y + 15, 25, 10)

        // Head
        ctx.fillRect(obstacle.x + 35, obstacle.y + 12, 15, 8)
        ctx.fillRect(obstacle.x + 45, obstacle.y + 15, 8, 5)

        // Eye
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(obstacle.x + 42, obstacle.y + 14, 3, 3)

        // Wings (animated)
        ctx.fillStyle = '#535353'
        if (wingUp) {
            ctx.fillRect(obstacle.x + 10, obstacle.y, 20, 15)
            ctx.fillRect(obstacle.x + 5, obstacle.y + 2, 10, 10)
        } else {
            ctx.fillRect(obstacle.x + 10, obstacle.y + 20, 20, 15)
            ctx.fillRect(obstacle.x + 5, obstacle.y + 22, 10, 10)
        }
    }

    // Draw ground
    function drawGround(ctx, offset, isNight) {
        ctx.fillStyle = isNight ? '#ffffff' : '#535353'
        ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, 2)

        // Ground texture
        for (let i = -offset % 30; i < CANVAS_WIDTH; i += 30) {
            ctx.fillRect(i, GROUND_Y + 5, 15, 2)
            ctx.fillRect(i + 8, GROUND_Y + 10, 10, 1)
        }
    }

    // Draw clouds
    function drawCloud(ctx, cloud, isNight) {
        ctx.fillStyle = isNight ? '#444444' : '#f7f7f7'
        ctx.beginPath()
        ctx.arc(cloud.x, cloud.y, 15, 0, Math.PI * 2)
        ctx.arc(cloud.x + 15, cloud.y - 5, 12, 0, Math.PI * 2)
        ctx.arc(cloud.x + 30, cloud.y, 15, 0, Math.PI * 2)
        ctx.arc(cloud.x + 15, cloud.y + 5, 10, 0, Math.PI * 2)
        ctx.fill()
    }

    // Draw score
    function drawScore(ctx, score, highScore, isNight) {
        ctx.fillStyle = isNight ? '#ffffff' : '#535353'
        ctx.font = 'bold 12px "Courier New", monospace'
        ctx.textAlign = 'right'

        const scoreStr = String(Math.floor(score)).padStart(5, '0')
        const hiStr = String(highScore).padStart(5, '0')

        if (highScore > 0) {
            ctx.fillText(`HI ${hiStr}  ${scoreStr}`, CANVAS_WIDTH - 10, 20)
        } else {
            ctx.fillText(scoreStr, CANVAS_WIDTH - 10, 20)
        }
    }

    // Draw background
    function drawBackground(ctx, isNight) {
        if (isNight) {
            ctx.fillStyle = '#1a1a1a'
        } else {
            ctx.fillStyle = '#f7f7f7'
        }
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        // Draw moon/stars in night mode
        if (isNight) {
            ctx.fillStyle = '#ffffff'
            // Moon
            ctx.beginPath()
            ctx.arc(CANVAS_WIDTH - 60, 30, 15, 0, Math.PI * 2)
            ctx.fill()

            // Stars
            const stars = [[50, 25], [120, 40], [200, 20], [350, 35], [450, 25]]
            stars.forEach(([x, y]) => {
                ctx.fillRect(x, y, 2, 2)
            })
        }
    }

    // Spawn obstacles
    function spawnObstacle(gameState, currentTime) {
        const timeSinceLastObstacle = currentTime - gameState.lastObstacleTime
        const minInterval = Math.max(600, gameState.minObstacleInterval - gameState.speed * 50)

        if (timeSinceLastObstacle > minInterval + Math.random() * 500) {
            const canSpawnPterodactyl = gameState.score >= 500
            const rand = Math.random()

            let obstacle
            if (canSpawnPterodactyl && rand > 0.75) {
                // Pterodactyl at different heights
                const heights = [GROUND_Y - 70, GROUND_Y - 50, GROUND_Y - 30]
                const y = heights[Math.floor(Math.random() * heights.length)]
                obstacle = {
                    type: 'pterodactyl',
                    x: CANVAS_WIDTH,
                    y: y,
                    width: PTERODACTYL_WIDTH,
                    height: PTERODACTYL_HEIGHT
                }
            } else {
                // Cactus types
                const cactusTypes = ['cactus_small', 'cactus_large', 'cactus_group']
                const type = cactusTypes[Math.floor(Math.random() * cactusTypes.length)]

                let width, height
                if (type === 'cactus_small') {
                    width = CACTUS_SMALL_WIDTH
                    height = CACTUS_SMALL_HEIGHT
                } else if (type === 'cactus_large') {
                    width = CACTUS_LARGE_WIDTH
                    height = CACTUS_LARGE_HEIGHT
                } else {
                    width = 40
                    height = CACTUS_LARGE_HEIGHT
                }

                obstacle = {
                    type: type,
                    x: CANVAS_WIDTH,
                    y: GROUND_Y - height,
                    width: width,
                    height: height
                }
            }

            gameState.obstacles.push(obstacle)
            gameState.lastObstacleTime = currentTime
        }
    }

    // Spawn clouds
    function spawnCloud(gameState) {
        if (gameState.clouds.length < 3 && Math.random() < 0.01) {
            gameState.clouds.push({
                x: CANVAS_WIDTH,
                y: 20 + Math.random() * 40,
                speed: 1 + Math.random() * 0.5
            })
        }
    }

    // Check collision with padding for fairness
    function checkCollision(dino, obstacle) {
        const padding = 8
        const dinoBox = {
            x: dino.x + padding,
            y: dino.y + padding,
            width: (dino.isDucking ? DINO_DUCK_WIDTH : DINO_WIDTH) - padding * 2,
            height: (dino.isDucking ? DINO_DUCK_HEIGHT : DINO_HEIGHT) - padding * 2
        }

        const obsBox = {
            x: obstacle.x + padding / 2,
            y: obstacle.y + padding / 2,
            width: obstacle.width - padding,
            height: obstacle.height - padding
        }

        return (
            dinoBox.x < obsBox.x + obsBox.width &&
            dinoBox.x + dinoBox.width > obsBox.x &&
            dinoBox.y < obsBox.y + obsBox.height &&
            dinoBox.y + dinoBox.height > obsBox.y
        )
    }

    // Update game state
    function updateGame(gameState, currentTime) {
        const dino = gameState.dino

        // Apply gravity
        dino.velocityY += GRAVITY
        dino.y += dino.velocityY

        // Ground collision
        const groundLevel = dino.isDucking
            ? GROUND_Y - DINO_DUCK_HEIGHT
            : GROUND_Y - DINO_HEIGHT

        if (dino.y >= groundLevel) {
            dino.y = groundLevel
            dino.velocityY = 0
            dino.isJumping = false
        }

        // Update speed (increases over time)
        gameState.speed = Math.min(MAX_SPEED, INITIAL_SPEED + gameState.score * SPEED_INCREMENT)

        // Update obstacles
        gameState.obstacles = gameState.obstacles.filter(obstacle => {
            obstacle.x -= gameState.speed
            return obstacle.x + obstacle.width > -50
        })

        // Update clouds
        gameState.clouds = gameState.clouds.filter(cloud => {
            cloud.x -= cloud.speed
            return cloud.x > -50
        })

        // Update ground offset
        gameState.ground.offset += gameState.speed

        // Update score
        gameState.score += 0.15

        // Day/Night cycle every 700 points
        gameState.nightTimer += 0.15
        if (gameState.nightTimer >= 700) {
            gameState.isNight = !gameState.isNight
            gameState.nightTimer = 0
        }

        // Spawn new obstacles and clouds
        spawnObstacle(gameState, currentTime)
        spawnCloud(gameState)

        // Increment frame count for animations
        gameState.frameCount++

        // Check collisions
        for (const obstacle of gameState.obstacles) {
            if (checkCollision(dino, obstacle)) {
                return true // Game over
            }
        }

        return false
    }

    // Main game loop
    function gameLoop(currentTime) {
        const canvas = canvasRef.current
        if (!canvas || !gameStateRef.current) return

        const ctx = canvas.getContext('2d')
        const gameState = gameStateRef.current

        // Update
        const isCollision = updateGame(gameState, currentTime)

        if (isCollision) {
            setIsGameOver(true)
            setIsRunning(false)
            const finalScore = Math.floor(gameState.score)
            if (finalScore > highScore) {
                setHighScore(finalScore)
                localStorage.setItem('dinoHighScore', finalScore.toString())
            }
            return
        }

        // Update React state for display
        setScore(Math.floor(gameState.score))

        // Draw
        drawBackground(ctx, gameState.isNight)

        // Draw clouds
        gameState.clouds.forEach(cloud => {
            drawCloud(ctx, cloud, gameState.isNight)
        })

        drawGround(ctx, gameState.ground.offset, gameState.isNight)

        // Draw obstacles
        gameState.obstacles.forEach(obstacle => {
            if (obstacle.type === 'pterodactyl') {
                drawPterodactyl(ctx, obstacle, gameState.frameCount)
            } else {
                drawCactus(ctx, obstacle)
            }
        })

        drawDino(ctx, gameState.dino, gameState.frameCount)
        drawScore(ctx, gameState.score, highScore, gameState.isNight)

        // Continue loop
        gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    // Handle jump
    const handleJump = useCallback(() => {
        if (!gameStateRef.current) return

        const dino = gameStateRef.current.dino
        if (!dino.isJumping && !dino.isDucking) {
            dino.velocityY = JUMP_VELOCITY
            dino.isJumping = true
        }
    }, [])

    // Handle duck
    const handleDuck = useCallback((isDucking) => {
        if (!gameStateRef.current) return

        const dino = gameStateRef.current.dino
        if (!dino.isJumping) {
            dino.isDucking = isDucking
            if (isDucking) {
                dino.y = GROUND_Y - DINO_DUCK_HEIGHT
                dino.height = DINO_DUCK_HEIGHT
                dino.width = DINO_DUCK_WIDTH
            } else {
                dino.y = GROUND_Y - DINO_HEIGHT
                dino.height = DINO_HEIGHT
                dino.width = DINO_WIDTH
            }
        }
    }, [])

    // Start/restart game
    function handleStartGame() {
        gameStateRef.current = initGameState()
        setScore(0)
        setIsGameOver(false)
        setIsRunning(true)

        gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    // Keyboard controls
    function handleKeyDown(event) {
        if (event.code === 'Space' || event.code === 'ArrowUp') {
            event.preventDefault()
            if (!isRunning && !isGameOver) {
                handleStartGame()
            } else if (isRunning) {
                handleJump()
            } else if (isGameOver) {
                handleStartGame()
            }
        } else if (event.code === 'ArrowDown') {
            event.preventDefault()
            if (isRunning) {
                handleDuck(true)
            }
        }
    }

    function handleKeyUp(event) {
        if (event.code === 'ArrowDown') {
            event.preventDefault()
            if (isRunning) {
                handleDuck(false)
            }
        }
    }

    // Canvas click handler
    function handleCanvasClick() {
        if (!isRunning && !isGameOver) {
            handleStartGame()
        } else if (isRunning) {
            handleJump()
        } else if (isGameOver) {
            handleStartGame()
        }
    }

    // Set up keyboard listeners
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [isRunning, isGameOver, handleJump, handleDuck])

    // Cleanup game loop on unmount
    useEffect(() => {
        return () => {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current)
            }
        }
    }, [])

    // Initial canvas draw
    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d')
            drawBackground(ctx, false)
            drawGround(ctx, 0, false)

            // Draw idle dino
            const idleDino = {
                x: 50,
                y: GROUND_Y - DINO_HEIGHT,
                width: DINO_WIDTH,
                height: DINO_HEIGHT,
                isJumping: false,
                isDucking: false
            }
            drawDino(ctx, idleDino, 0)

            // Draw "Press Space to Start" text
            ctx.fillStyle = '#535353'
            ctx.font = 'bold 14px "Courier New", monospace'
            ctx.textAlign = 'center'
            ctx.fillText('Press SPACE or Click to Start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
        }
    }, [])

    return (
        <div className="dino-game">
            <div className="dino-game-header">
                <div className="dino-game-title">
                    🦖 T-Rex Runner
                </div>
                <div className="dino-game-score">
                    {highScore > 0 && <span className="hi-score">HI {String(highScore).padStart(5, '0')} </span>}
                    {String(score).padStart(5, '0')}
                </div>
            </div>

            <div className="dino-game-canvas-container">
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="dino-game-canvas"
                    onClick={handleCanvasClick}
                />

                {isGameOver && (
                    <div className="dino-game-overlay">
                        <div className="dino-game-gameover-icon">💀</div>
                        <div className="dino-game-overlay-title">GAME OVER</div>
                        <div className="dino-game-overlay-score">
                            Score: {String(score).padStart(5, '0')}
                        </div>
                        <button
                            className="dino-game-btn"
                            onClick={handleStartGame}
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>

            <div className="dino-game-instructions">
                <div className="dino-game-controls">
                    <span className="dino-game-key">↑ / Space</span>
                    <span className="dino-game-key-label">Jump</span>
                    <span className="dino-game-key">↓</span>
                    <span className="dino-game-key-label">Duck</span>
                </div>
            </div>
        </div>
    )
}

export default DinoGame
