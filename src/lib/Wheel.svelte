<script>

  import {onMount} from 'svelte';
  import {entries, formVisible} from '../store';

  const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4C93']

  let wheel;
  let list;

  //let segments = ["Vincent", "Severine", "Pascal", "Benjamin", "Jeremy","Vincent", "Severine", "Pascal", "Benjamin", "Jeremy"];
  let count;
  let segmentHeight;
  let segmentsColors;

  $: {
    count = $entries.length;

    let wheelSize = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--wheel-size')) || 500;

    segmentHeight = `${Math.round(wheelSize * Math.tan((2 * Math.PI) / (count * 2)))}px`;

    segmentsColors = [];
    let i = 0;
    $entries?.forEach((s) => {
      segmentsColors = [...segmentsColors, colors[i]];
      i++;
      if(i >= colors.length) i = 0;
    });

    if(segmentsColors.length > colors.length) {
      if(segmentsColors[0] === segmentsColors[segmentsColors.length - 1])
        segmentsColors[segmentsColors.length - 1] = colors[2];
    }
  }


  onMount(() => {
    let deg;
    wheel.addEventListener('click', routourne);

    wheel.addEventListener('transitionend', (e) => {
      wheel.style.transition = 'none';
      wheel.style.transform = `rotate(${deg % 360}deg)`;
      wheel.classList.remove('blur');
      wheel.addEventListener('click', routourne);
    })

    function routourne() {
      deg = Math.floor(5000 + Math.random() * 5000);
      wheel.style.transition = 'all 10s ease-out';
      wheel.style.transform = `rotate(${deg}deg)`;
      wheel.classList.add('blur');

      wheel.removeEventListener('click', routourne);
    }

  })

  function addClickHandler() {
    formVisible.set(true);
  }

</script>

<div class="container">
<div class="wheel" bind:this="{wheel}">
  <ul style="--count:{count};--segment-height:{segmentHeight}" bind:this="{list}">
    {#each $entries as segment, i}
    <li class="segment" style="--i:{i};--bg:{segmentsColors[i]}"><span>{segment}</span></li>
    {/each}
  </ul>
</div>
<div class="cursor"></div>
<div class="add" on:click="{addClickHandler}">+</div>
</div>


<style>
.container {
  position: relative;
  overflow: hidden;
}

.wheel {
  display: flex;
  width: var(--wheel-size);
  height: var(--wheel-size);
  background-color: rgba(255,255,255,0.1);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  transform-origin: calc(var(--wheel-size) / 2) calc(var(--wheel-size) / 2);
}

ul {
  position: relative;
}

.segment {
  list-style: none;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(var(--wheel-size) / 2);
  height: var(--segment-height);
  border-top: calc(var(--segment-height) / 2) solid transparent;
  border-bottom: calc(var(--segment-height) / 2) solid transparent;
  border-right: calc(var(--wheel-size) / 2) solid var(--bg);
  top: calc(var(--segment-height) / 2 * -1);
  transform-origin: 0 calc(var(--segment-height) / 2);
  transform: rotate(calc(360deg / var(--count) * var(--i)));
}

.segment span {
  position: absolute;
  right: calc(var(--wheel-size) / 2 * -1);
  padding-right: 40px;
  max-width: calc(var(--wheel-size) / 2 - 40px);
  overflow: hidden;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
  text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000,
  1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;
  
}

.cursor {
  display: block;
  position: absolute;
  width: 70px;
  height: 50px;
  top: calc(var(--wheel-size) /2 - 25px);
  right: -20px;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-right: 70px solid #ddd;
  filter: drop-shadow(2px 0px 1px #222) 
          drop-shadow(0px 2px 1px #222) 
          drop-shadow(-2px 0px 1px #222)
          drop-shadow(0px -2px 1px #222);
}

.add {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #444;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: calc(var(--wheel-size) /2 - 25px);;
  left: calc(var(--wheel-size) /2 - 25px);;
  z-index: 2;
  cursor: pointer;
  filter: drop-shadow(0px 0px 4px #222) 
}

:global(.blur) {
  animation: blur 10s;
}

@keyframes blur {
  0% {
    filter: blur(1px);
  }
  80% {
    filter: blur(.5px);
  }
  100% {
    filter: blur(0px);
  }
}


</style>