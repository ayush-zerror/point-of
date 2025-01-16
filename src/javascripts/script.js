var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1.2,
  spaceBetween: 10,
  loop: true, // Enable infinite loop
  freeMode: true, // Allow free dragging
  centeredSlides: false, // Don't center the slides
  freeModeMomentum: true, // Enable smooth momentum
  freeModeMomentumRatio: 0.5, // Control the momentum speed (lower = slower, smoother)
  freeModeMomentumBounce: false, // Prevent bounce effect
  speed: 600, // Adjust slide transition speed
});


const cursor = document.querySelector("#cursor")
window.addEventListener("mousemove", function (e) {
  gsap.to(cursor, {
    top: e.clientY,
    left: e.clientX,
    scale: 1
  })
  gsap.to("#playCur", {
    top: e.clientY,
    left: e.clientX,
    duration: 0
  })
})

document.querySelector("#page6").addEventListener("mouseenter", function (e) {
  gsap.to(cursor, {
    width: "4vw",
    height: "4vw",
    backgroundColor: "white",
  })
  cursor.innerHTML = "Drag"
})
document.querySelector("#page6").addEventListener("mouseleave", function (e) {
  gsap.to(cursor, {
    width: "1.5vw",
    height: "1.5vw",
    backgroundColor: "transparent",
  })
  cursor.innerHTML = ""
})

var muted = true
document.querySelectorAll("#page6 .video-container video").forEach(function (vid) {
  vid.addEventListener("mouseenter", function (e) {
    gsap.to("#playCur", {
      opacity: 1,
      duration: .2
    })
    cursor.innerHTML = ""
    if (muted) {
      document.querySelector("#playCur").classList.add("ri-play-fill")
      document.querySelector("#playCur").classList.remove("ri-pause-fill")
    }
    else {
      document.querySelector("#playCur").classList.add("ri-pause-fill")
      document.querySelector("#playCur").classList.remove("ri-play-fill")
    }
  })
})
document.querySelectorAll("#page6 .video-container video").forEach(function (vid) {
  vid.addEventListener("mouseleave", function (e) {
    gsap.to("#playCur", {
      opacity: 0,
      duration: .2
    })
    cursor.innerHTML = "Drag"
  })
})


document.querySelectorAll("#page6 .video-container video").forEach(function (vid) {
  vid.addEventListener("click", function (e) {
    if (muted) {
      vid.muted = false
      muted = false
    }
    else {
      vid.muted = true
      muted = true
    }
  })
})

function page1Animation() {

  const words = document.querySelectorAll(".word-style");

  let index = 0;
  setInterval(function () {
    gsap.to(words[index], {
      top: "-100%",
      duration: 0.8,
      onComplete: function () {
        gsap.set(this._targets[0], { top: "100%" });
      }
    });

    // Increment index before checking if it's the last element
    index = index === words.length - 1 ? 0 : index + 1;

    gsap.to(words[index], {
      top: "0%",
      duration: 0.8,
    });
  }, 3000);


  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page1",
      scroller: "body",
      start: "top 0%",
      end: "top -100%",
      scrub: 1,
      pin: true,
      // pinSpacing: false,
    }
  });

  tl1
    .to("#page1 h1", {
      transform: "rotateY(4deg) rotateX(2deg) scale(15) translateX(-10%)", // Simplified transform
      duration: 1.2,
      ease: "power3.out", // Less taxing easing function
    }, "a")
    .to("#page1 h4", {
      transform: "scale(1.8) rotateY(8deg) rotateX(2deg) translateX(-10%)", // Simplified transform
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    }, "a")
    .to("#hero-video", {
      top: "0%",
      // delay: -.5
    });


}
page1Animation()


function page2Animation() {


  var clutter = ""
  document.querySelector("#page2-text").textContent.split(" ").forEach((w) => {
    clutter += `<span> ${w}</span>`
  })

  document.querySelector("#page2-text").innerHTML = clutter

  gsap.to(document.querySelectorAll("#page2-text span"), {
    opacity: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#page2",
      scroller: "body",
      start: "top 0%",
      end: "top -100%",
      scrub: 1,
      pin: true,
      anticipatePin: 1, // Helps smooth out pin transitions

    }
  })


}
page2Animation()


function pointMidAnimation() {
  const canvas = document.getElementById("physicsCanvas");
  const engine = Matter.Engine.create();
  const world = engine.world;
  const render = Matter.Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
      background: "transparent"
    }
  });

  // Create ground and walls
  const ground = Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 10, window.innerWidth, 20, {
    isStatic: true
  });

  const walls = [
    Matter.Bodies.rectangle(-10, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true }),
    Matter.Bodies.rectangle(window.innerWidth + 10, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true })
  ];

  Matter.World.add(world, [ground, ...walls]);

  const rootStyles = getComputedStyle(document.documentElement);
  const shapeColor = rootStyles.getPropertyValue("--secondary").trim();

  // Function to create a random shape (circle, rectangle, triangle)
  function createRandomShape(x, y) {
    const size = Math.random() * 30 + 20; // Ensures size is between 20 and 50
    const type = Math.random();

    let shape;
    if (type < 0.4) {
      shape = Matter.Bodies.circle(x, y, size / 2, { restitution: 0.9, render: { fillStyle: shapeColor } });
    } else if (type < 0.7) {
      shape = Matter.Bodies.rectangle(x, y, size, size, { restitution: 0.8, render: { fillStyle: shapeColor } });
    } else {
      shape = Matter.Bodies.polygon(x, y, 3, size, { restitution: 0.8, render: { fillStyle: shapeColor } });
    }

    // Apply a small initial force or velocity to prevent shapes from being stuck
    Matter.Body.applyForce(shape, shape.position, { x: 0, y: -0.05 });

    return shape;
  }

  // Function to create floating text
  function createText(x, y, text) {
    return Matter.Bodies.rectangle(x, y, 100, 50, {
      restitution: 0.8,
      render: {
        sprite: {
          texture: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='50'>
            <text x='10' y='30' font-size='20' font-family='para3' fill='black'>${text}</text>
          </svg>`,
        },
      },
    });
  }

  // Add mouse control for moving the balls
  const mouse = Matter.Mouse.create(render.canvas);
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });
  Matter.World.add(world, mouseConstraint);

  // Ensure mouse resizes with the canvas
  render.mouse = mouse;

  // Enable scrolling by preventing mouse wheel interference
  render.canvas.addEventListener('wheel', (e) => {
    if (!mouseConstraint.mouse.button) {  // Only prevent default if no mouse interaction
      e.preventDefault();
      e.stopPropagation();
    }
  }, { passive: false });

  // Flag to check if shapes have been added
  let shapesAdded = false;

  // Function to add shapes and text dynamically
  function addShapesAndText() {
    if (shapesAdded) {
      return; // Prevent adding shapes again if they have already been added
    }

    const elements = [];
    const words = ["Design", "Innovation", "Friction", "Curiosity", "Inception"];

    // Add random shapes
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * -200;
      elements.push(createRandomShape(x, y));
    }

    // Add text elements
    for (let i = 0; i < words.length; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * -200;
      elements.push(createText(x, y, words[i]));
    }

    // Add elements to the world
    Matter.World.add(world, elements);

    // Set the flag to true once shapes and text have been added
    shapesAdded = true;

    // Cleanup after a while to improve performance
    setTimeout(() => {
      elements.forEach(element => {
        if (element.position.y > window.innerHeight + 100) {
          Matter.Composite.remove(world, element);
        }
      });
    }, 12000);
  }

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page3",
      scroller: "body",
      start: "top top",
      end: "+=4000",
      scrub: true,
      pin: true,
      onEnter: () => {
        // Run render and runner only if it's the first time entering
        Matter.Render.run(render);
        Matter.Runner.run(Matter.Runner.create(), engine);
        addShapesAndText();
      },
    }
  });


  tl
    .to("#circle2", {
      top: "29%",
      transform: "translate(-50%,-50%) scale(1)",
      duration: 1.5,
    })
    .to("#circle-text", {
      opacity: 1,
      duration: .3,
    }, "op")
    .to("#circle2", {
      opacity: 0,
      duration: .3,
    }, "op")
    .to("#right-content > h2", {
      x: 300,
      filter: "blur(4px)",
      opacity: 0,
      duration: .8,
      stagger: {
        amount: 0.2,
      },
      delay: .2
    })
    .to("#right-content-top > h2", {
      transform: "translateX(0%)",
      opacity: 1,
      duration: .8,
      stagger: {
        amount: 0.2,
      }
    }, "bk")
    .to("#circle2", {
      top: "50%",
      transform: "translate(-50%,-50%) scale(1)",
      duration: .8,
    }, "bk")
    .to("#ser2,#ser3,#ser4,#ser5,#ser6", {
      filter: "blur(4px)",
      opacity: .4,
      duration: .5,
    }, "a")
    .to("#para1", {
      opacity: 1,
      duration: .5
    }, "a")

    .to("#circle-text", {
      top: "21%",
      duration: .8,
      delay: 1
    }, "b")
    .to("#ser1,#ser3,#ser4,#ser5,#ser6", {
      filter: "blur(4px)",
      opacity: .4,
      duration: .5,
      delay: 1
    }, "b")
    .to("#ser2", {
      filter: "blur(0px)",
      opacity: 1,
      duration: .5,
      delay: 1
    }, "b")
    .to("#para1", {
      opacity: 0,
      duration: .5,
      delay: 1
    }, "b")
    .to("#para2", {
      opacity: 1,
      duration: .4,
      delay: .5
    })

    .to("#circle-text", {
      top: "37.5%",
      duration: .8,
      delay: 1
    }, "c")
    .to("#ser1,#ser2,#ser4,#ser5,#ser6", {
      filter: "blur(4px)",
      opacity: .4,
      duration: .5,
      delay: 1
    }, "c")
    .to("#ser3", {
      filter: "blur(0px)",
      opacity: 1,
      duration: .5,
      delay: 1
    }, "c")
    .to("#para2", {
      opacity: 0,
      duration: .5,
      delay: 1
    }, "c")
    .to("#para3", {
      opacity: 1,
      duration: .4,
      delay: .5
    })

    .to("#circle-text", {
      top: "53.3%",
      duration: .8,
      delay: 1
    }, "d")
    .to("#ser1,#ser2,#ser3,#ser5,#ser6", {
      filter: "blur(4px)",
      opacity: .4,
      duration: .5,
      delay: 1
    }, "d")
    .to("#ser4", {
      filter: "blur(0px)",
      opacity: 1,
      duration: .5,
      delay: 1
    }, "d")
    .to("#para3", {
      opacity: 0,
      duration: .5,
      delay: 1
    }, "d")
    .to("#para4", {
      opacity: 1,
      duration: .4,
      delay: .5
    })

    .to("#circle-text", {
      top: "69.7%",
      duration: .8,
      delay: 1
    }, "e")
    .to("#ser1,#ser2,#ser3,#ser4,#ser6", {
      filter: "blur(4px)",
      opacity: .4,
      duration: .5,
      delay: 1
    }, "e")
    .to("#ser5", {
      filter: "blur(0px)",
      opacity: 1,
      duration: .5,
      delay: 1
    }, "e")
    .to("#para4", {
      opacity: 0,
      duration: .5,
      delay: 1
    }, "e")
    .to("#para5", {
      opacity: 1,
      duration: .4,
      delay: .5
    })

    .to("#circle-text", {
      top: "85.5%",
      duration: .8,
      delay: 1
    }, "f")
    .to("#ser1,#ser2,#ser3,#ser4,#ser5", {
      filter: "blur(4px)",
      opacity: .4,
      duration: .5,
      delay: 1
    }, "f")
    .to("#ser6", {
      filter: "blur(0px)",
      opacity: 1,
      duration: .5,
      delay: 1
    }, "f")
    .to("#para5", {
      opacity: 0,
      duration: .5,
      delay: 1
    }, "f")
    .to("#para6", {
      opacity: 1,
      duration: .4,
      delay: .5,
      onComplete: () => {
        removeBottomWallAndBalls();
      },
    })

  function removeBottomWallAndBalls() {
    // Remove the bottom wall
    Matter.World.remove(world, ground);

    // Remove balls from the world when they fall out of view
    Matter.Events.on(engine, "afterUpdate", () => {
      const ballsToRemove = [];
      world.bodies.forEach((body) => {
        if (body.label === "Ball" && body.position.y > window.innerHeight + 50) {
          ballsToRemove.push(body);
        }
      });

      ballsToRemove.forEach((ball) => {
        Matter.World.remove(world, ball);
      });
    });
  }
}
pointMidAnimation()

function page4Animation() {

  var tl4e = gsap.timeline({
    scrollTrigger: {
      trigger: "#page4",
      scroller: "body",
      start: "top 82%%",
      end: "top 77%",
      scrub: true,
      // markers: true
    }
  })
  tl4e

    .to("#circle2", {
      opacity: 1,
      transform: "translate(-50%,-50%) scale(1)",
      width: "0.65vw",
      height: "0.65vw",
      backgroundColor: "transparent",
      duration: .8,
    }, "oc")
    .to("#circle-text", {
      opacity: 0,
      duration: .8,
    }, "oc")
    .to("#ser1,#ser2,#ser3,#ser4,#ser5,#ser6", {
      filter: "blur(0px)",
      opacity: 1,
      duration: .8,
    })
    .to("#para6", {
      opacity: 0,
      duration: .8,
    })


  const page4WrapperWidth = document.querySelector("#project-wrapper").scrollWidth
  const slideValue = page4WrapperWidth - window.innerWidth

  var tl4 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page4",
      scroller: "body",
      start: "top top",
      end: "top -180%",
      scrub: 1,
      pin: true,
    }
  })

  tl4
    .to("#project-wrapper", {
      transform: `translateX(-${slideValue}px)`,
      duration: 1.5,
      ease: "linear",
    }, "sl")
    .to("#circle2", {
      left: "-670%",
      duration: 1,
    }, "sl")
    .to(".view-all .cirr", {
      opacity: 1,
      duration: 0
    }, "c")
    .to(".view-all .cirr", {
      width: "2.5vw",
      height: "2.5vw",
      backgroundColor: "var(--secondary)",
      duration: .2,
    }, "s")
    .to(".view-all .cirr i", {
      opacity: 1,
      duration: .1,
      delay: 0.1
    }, "s")
    .to("#circle2", {
      left: "50%",
      width: "2.5vw",
      height: "2.5vw",
      backgroundColor: "var(--secondary)",
      duration: .5,
    })
    .to(".view-all", {
      opacity: 0,
      duration: .3
    })
    .to(".view-all", {
      display: "none",
      delay: .2
    })
}
page4Animation()


function page5Animation() {


  const tl5 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page5",
      scroller: "body",
      start: "top 0%",
      end: "top -400%",
      scrub: 1,
      pin: true,
    }
  })
  tl5
    .to("#page5", {
      opacity: 1,
      duration: .1
    }, "c")
    .to("#page5", {
      maskSize: "200%",
      duration: 4,
      delay: -.2
    })
    .to("#video-container", {
      clipPath: " polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1
    })
    .to("#video-container", {
      transform: "translate(-50%,-50%) scale(.6) rotateY(-20deg) rotateX(-2deg)",
      duration: 1.5
    })
    .to("#video-container", {
      transform: "translate(-50%,-50%) scale(.5) rotateY(-20deg) rotateY(20deg)   rotateX(-2deg) rotateX(2deg)",
      duration: 1.5
    })
    .to("#img-over", {
      top: "-300%",
      duration: 4
    })
    .to("#video-container", {
      transform: "translate(-50%,-50%) scale(.6) rotateY(-20deg) rotateX(-2deg)",
      duration: 1.5
    })
    .to("#video-container", {
      transform: "translate(-50%,-50%)",
      duration: 1.5
    })


}
page5Animation()




