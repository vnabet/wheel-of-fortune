<script>

  import {entries, formVisible} from '../store.js'

  let toAddValue;
  let addInput;

  function deleteClickHandler(index) {
    if($entries.length > 3) {
      entries.set($entries.filter((e, i)=> i !== index));
    }
  }

  function addClickHandler() {
    if(toAddValue) {
      entries.set([...$entries, toAddValue]);
      toAddValue = '';
      addInput.focus();
    }
  }

  function closeClickHandler() {

    localStorage.setItem('entries', JSON.stringify($entries));

    formVisible.set(false);
  }
</script>

<div class="form-container" class:visible={$formVisible}>
  <form>
    {#each $entries as entrie, i}
    <div class="row">
      <input type="text" bind:value="{entrie}">
      <button class="delete" class:hidden="{$entries.length <= 3}" on:click|preventDefault="{() => deleteClickHandler(i)}">-</button>
    </div>      
    {/each}
    <div class="row">
      <input type="text" bind:value="{toAddValue}" bind:this={addInput}>
      <button class="add" on:click|preventDefault="{addClickHandler}">+</button>
    </div>  
    <div class="buttons">
      <button on:click|preventDefault="{closeClickHandler}">Fermer</button>
    </div>
  </form>
</div>


<style>

  .form-container {
    width: 100%;
    height: auto;
    display: flex;
    position: absolute;
    top: -2000px;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    transition: top .5s ease-in-out;
  }


  .form-container.visible {
    top: 0;
  }

  form {
    z-index: 99;
    min-width: 300px;
    margin: 20px auto 0 auto;
    color: black;
    position: relative;
    background-color: antiquewhite;
    border: 4px solid #444;
    border-radius: 10px;
    display: flex;
    flex-direction: column;

  }

  .row, .buttons {
    display: flex;
    padding: 5px;
    gap: 10px;
    align-items: center;
    width: 100%;
    
  }

  .buttons {
    justify-content: center;
  }

  button {
    background-color: #444;
    color: white;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 70px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }

  input {
    background-color: transparent;
    border: 1px solid #222;
    color: #222;
    font-size: 1rem;
    padding: 2px;
    border-radius: 5px;
    width: 100%;
  }

  .delete, .add {
    width: 25px;
    min-width: unset;
    height: 25px;
    border-radius: 100%;
  }

  .delete {
    background-color: red;
  }

  .add {
    background-color: green;
  }

  .delete.hidden {
    visibility: hidden;
  }


</style>