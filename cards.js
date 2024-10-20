'use strict';

class Carousel {
  constructor(el) {
    this.el = el;
    this.carouselOptions = ['previous', 'add', 'play', 'next'];
    this.carouselData = [
      {
        'id': '1',
        'name': 'MURUGAN',
        'role': 'FRONT-END DEVELOPER',
        'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae possimus veritatis eligendi est nam voluptate, delectus voluptatem adipisci praesentium, id cum. Reprehenderit quaerat ut neque. Vel vero quae deleniti dignissimos?',
        'imgSrc': 'user-img.png.jpg'
      },
      {
        'id': '2',
        'name': 'JANE DOE',
        'role': 'BACK-END DEVELOPER',
        'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae possimus veritatis eligendi est nam voluptate, delectus voluptatem adipisci praesentium, id cum. Reprehenderit quaerat ut neque. Vel vero quae deleniti dignissimos?',
        'imgSrc': 'user-img.png.jpg'
      },
      {
        'id': '3',
        'name': 'JOHN SMITH',
        'role': 'FULL STACK DEVELOPER',
        'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae possimus veritatis eligendi est nam voluptate, delectus voluptatem adipisci praesentium, id cum. Reprehenderit quaerat ut neque. Vel vero quae deleniti dignissimos?',
        'imgSrc': 'user-img.png.jpg'
      },
      {
        'id': '4',
        'name': 'ALICE JONES',
        'role': 'UI/UX DESIGNER',
        'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae possimus veritatis eligendi est nam voluptate, delectus voluptatem adipisci praesentium, id cum. Reprehenderit quaerat ut neque. Vel vero quae deleniti dignissimos?',
        'imgSrc': 'user-img.png.jpg'
      },
      {
        'id': '5',
        'name': 'BOB BROWN',
        'role': 'DEVOPS ENGINEER',
        'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae possimus veritatis eligendi est nam voluptate, delectus voluptatem adipisci praesentium, id cum. Reprehenderit quaerat ut neque. Vel vero quae deleniti dignissimos?',
        'imgSrc': 'user-img.png.jpg'
      }
    ];
    this.carouselInView = [1, 2, 3, 4, 5];
    this.carouselContainer;
    this.carouselPlayState = null;
    this.autoPlayInterval = 4000;
  }

  mounted() {
    this.setupCarousel();
    this.startAutoPlay();
    this.addTouchEvents();
  }

  setupCarousel() {
    const container = document.createElement('div');
    const controls = document.createElement('div');
    const dotsContainer = document.createElement('div');

    this.el.append(container, controls, dotsContainer);
    container.className = 'carousel-container';
    controls.className = 'carousel-controls';
    dotsContainer.className = 'carousel-dots';

    this.carouselData.forEach((item, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.className = `carousel-item carousel-item-${index + 1}`;

      carouselItem.innerHTML = `
        <div class="white-div">
          <div class="feedback-img">
            <img src="${item.imgSrc}" alt="">
          </div>
          <h2>${item.name}</h2>
          <h4>${item.role}</h4>
          <p style="line-height: 1.5;">${item.description}</p>
        </div>
      `;

      container.append(carouselItem);
    });

    // Create dots in reverse order
    for (let i = this.carouselData.length - 1; i >= 0; i--) {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot';
      dot.setAttribute('data-index', i + 1);
      dotsContainer.append(dot);
    }

    this.carouselOptions.forEach((option) => {
      const btn = document.createElement('button');
      const axSpan = document.createElement('span');
      axSpan.innerText = option;
      axSpan.className = 'ax-hidden';
      btn.append(axSpan);

      btn.className = `carousel-control carousel-control-${option}`;
      btn.setAttribute('data-name', option);

      controls.append(btn);
    });

    this.setControls([...controls.children]);
    this.setDotListeners([...dotsContainer.children]);
    this.carouselContainer = container;
  }

  setControls(controls) {
    controls.forEach(control => {
      control.onclick = (event) => {
        event.preventDefault();
        this.controlManager(control.dataset.name);
      };
    });
  }

  setDotListeners(dots) {
    dots.forEach(dot => {
      dot.onclick = (event) => {
        const index = parseInt(dot.dataset.index);
        this.gotoItem(index);
      };
    });
  }

  controlManager(control) {
    if (control === 'previous') return this.previous();
    if (control === 'next') return this.next();
    if (control === 'add') return this.add();
    if (control === 'play') return this.play();
  }

  previous() {
    this.carouselData.push(this.carouselData.shift());
    this.carouselInView.push(this.carouselInView.shift());
    this.updateCarousel();
  }

  next() {
    this.carouselData.unshift(this.carouselData.pop());
    this.carouselInView.unshift(this.carouselInView.pop());
    this.updateCarousel();
  }

  updateCarousel() {
    this.carouselInView.forEach((item, index) => {
      const carouselItem = this.carouselContainer.children[index];
      carouselItem.className = `carousel-item carousel-item-${item}`;

      if (item === 1) {
        // Hide the left card when at the first item
        carouselItem.classList.add('carousel-item-hidden');
        carouselItem.style.opacity = '0';
      } else if (item === this.carouselData.length) {
        // Hide the right card when at the last item
        carouselItem.classList.add('carousel-item-hidden');
        carouselItem.style.opacity = '0';
      } else {
        // Show other cards
        carouselItem.classList.remove('carousel-item-hidden');
        carouselItem.style.opacity = item === Math.ceil(this.carouselData.length / 2) ? '1' : '1';
      }
    });

    this.updateDots();
  }

  gotoItem(index) {
    const selectedIndex = index - 1; // Convert to zero-based index

    // Update carouselInView based on selected index
    this.carouselInView = [
        index,
        (index % this.carouselData.length) + 1,
        ((index + 1) % this.carouselData.length) + 1,
        ((index + 2) % this.carouselData.length) + 1,
        ((index + 3) % this.carouselData.length) + 1,
    ];

    this.updateCarousel(); // Update the carousel immediately
    this.stopAutoPlay(); // Stop autoplay to prevent rapid sliding
    this.startAutoPlay(); // Restart autoplay after the selection
  }

  updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    const activeIndex = this.carouselInView[0] - 1; // Get the active item's index (0-based)

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === (this.carouselData.length - activeIndex - 1));
    });
  }

  add() {
    const newItem = {
      'id': `${this.carouselData.length + 1}`,
      'name': `NEW USER ${this.carouselData.length + 1}`,
      'role': 'ROLE',
      'description': 'Lorem ipsum dolor sit amet.',
      'imgSrc': 'user-img.png.jpg'
    };
    this.carouselData.push(newItem);
    this.next();
  }

  play() {
    const playBtn = document.querySelector('.carousel-control-play');
    const startPlaying = () => this.next();

    if (playBtn.classList.contains('playing')) {
      playBtn.classList.remove('playing');
      clearInterval(this.carouselPlayState);
      this.carouselPlayState = null;
    } else {
      playBtn.classList.add('playing');
      this.carouselPlayState = setInterval(startPlaying, this.autoPlayInterval);
    }
  }

  startAutoPlay() {
    this.carouselPlayState = setInterval(() => this.next(), this.autoPlayInterval);
  }

  stopAutoPlay() {
    clearInterval(this.carouselPlayState);
    this.carouselPlayState = null;
  }

  addTouchEvents() {
    let startX = 0;
    let isHolding = false;

    this.carouselContainer.addEventListener('touchstart', (event) => {
      startX = event.touches[0].clientX;
      isHolding = true; // User is holding
      this.stopAutoPlay(); // Stop auto play
    });

    this.carouselContainer.addEventListener('touchmove', (event) => {
      if (isHolding) {
        const moveX = event.touches[0].clientX;
        const threshold = 30; // Minimum swipe distance
        const diffX = moveX - startX;

        if (diffX > threshold) {
          // User swiped right
          this.previous();
          isHolding = false; // Reset hold state
          this.startAutoPlay(); // Restart auto play
        } else if (diffX < -threshold) {
          // User swiped left
          this.next();
          isHolding = false; // Reset hold state
          this.startAutoPlay(); // Restart auto play
        }
      }
    });

    this.carouselContainer.addEventListener('touchend', () => {
      if (isHolding) {
        this.startAutoPlay(); // Restart auto play when touch ends
        isHolding = false; // Reset hold state
      }
    });

    this.carouselContainer.addEventListener('touchcancel', () => {
      this.startAutoPlay(); // Restart auto play if touch is cancelled
      isHolding = false; // Reset hold state
    });
  }
}

// Refers to the carousel root element you want to target
const el = document.querySelector('.carousel');
// Create a new carousel object
const exampleCarousel = new Carousel(el);
// Setup carousel and methods
exampleCarousel.mounted();
