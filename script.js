const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/1.jpg',
    text: "Behenchod Karte kaise ho ye sab"
  },
  {
    image: './img/2.png',
    text: "Sab Betichod"
  },
  {
    image: './img/3.jpg',
    text: "Iski Maa Ka Chut Ye Kya Hogya"
  },
  {
    image: './img/6.gif',
    text: "Neta Neta Har Koi Kehta"
  },
  {
    image: './img/11.jpg',
    text: "Jldi Se maug bol deta hu baad me saree bhi to pehna hai"
  },
  {
    image: './img/13.jpg',
    text: "Bhai aaplog mujhe Chammar Kyu Bulateee ho"
  },
  {
    image: './img/16.jpg',
    text: "Jldi se doodh nikaal leta hu baad me internet pe gyan bhi chodna hai"
  },
  {
    image: './img/20.jpg',
    text: "Are MardehTahiyan"
  },
  {
    image: './img/5.jpg',
    text: 'Guyzz Mai Itna sexy kyu hu'
  },
  {
    image: './img/31.jpg',
    text: 'Haste Haste pet dard derai'
  }
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
