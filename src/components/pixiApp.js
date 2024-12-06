// public/pixiApp.js
import { Application, Sprite, Assets, Texture, AnimatedSprite } from "pixi.js";

export async function createPixiApp() {
  const app = new Application();

  await app.init({ resizeTo: window });

  // Add the view to the DOM
  document.body.appendChild(app.canvas);

  // ex, add display objects
  await Assets.load("/laptop.png");
  let laptop = Sprite.from("/laptop.png");

  await Assets.load("/bird-big.json");

  // Create an array of textures from the sprite sheet
  const frames = [];

  for (let i = 0; i < 7; i++) {
    // Magically works since the spritesheet was loaded with the pixi loader
    frames.push(Texture.from(`Bird${i}.png`));
  }

  // Create an AnimatedSprite (brings back memories from the days of Flash, right ?)
  const anim = new AnimatedSprite(frames);

  /*
   * An AnimatedSprite inherits all the properties of a PIXI sprite
   * so you can change its position, its anchor, mask it, etc
   */
  anim.x = app.screen.width / 3;
  anim.y = app.screen.height / 3;
  anim.anchor.set(0.5);
  anim.animationSpeed = 0.1;
  anim.scale.set(0.7);
  anim.play();

  anim.eventMode = "static";
  anim.on("pointerdown", onClick);
  anim.on("pointerover", onOver);
  anim.on("pointerout", onOut);

  app.stage.addChild(anim);

  function onClick() {
    location.href = "/about/";
    // anim.scale.x *= 1.25;
    // anim.scale.y *= 1.25;
  }

  function onOver() {
    anim.tint = "yellow";
  }

  function onOut() {
    anim.tint = "0xFFFFFF";
  }

  app.stage.addChild(laptop);

  laptop.anchor.set(0.5);
  laptop.scale.set(0.7);

  const initial_height = app.screen.height;
  const initial_width = app.screen.width;

  laptop.x = anim.x + 0.75 * laptop.width;
  laptop.y = anim.y + 0.075 * laptop.height;

  const resize = () => {
    console.log("resizig");
    // Adjust animated sprite
    anim.x = app.screen.width / 3;
    anim.y = app.screen.height / 3;
    anim.scale.set(Math.min(app.screen.width / initial_width, app.screen.height / initial_height) * 0.7);

    // Adjust laptop sprite
    laptop.x = anim.x + 0.75 * laptop.width;
    laptop.y = anim.y + 0.075 * laptop.height;
    laptop.scale.set(Math.min(app.screen.width / initial_width, app.screen.height / initial_height) * 0.7);
    // const { width, height } = app.renderer.screen;

    // // Adjust animated sprite
    // anim.x = width / 3;
    // anim.y = height / 3;
    // anim.scale.set(Math.min(width / 800, height / 600) * 0.7);

    // // Adjust laptop sprite
    // laptop.x = anim.x + 0.75 * laptop.width;
    // laptop.y = anim.y + 0.075 * laptop.height;
    // laptop.scale.set(Math.min(width / 800, height / 600) * 0.7);
  };

  window.addEventListener("resize", resize);
}

// // Call the function after importing
// createPixiApp();
