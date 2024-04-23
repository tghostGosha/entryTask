<script lang="ts">
  const API_KEY = '09520b8cc5d349b531a05ed9'
  let BASE_CODE = {id: 'RUB', text: 'RUB'}
  let TARGET_CODE ={id: 'USD', text: 'USD'}

  let conversionRateLeft
  let conversionRateRight
  let resultBase=0
  let resultTarget =0

  let currencyValue = [
    { id: `RUB`, text: `RUB` },
    { id: `USD`, text: `USD` },
    { id: `EUR`, text: `EUR` }
  ];

  function fetchData(BASE_CODE = 'RUB', TARGET_CODE = 'USD' ) {
            fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${BASE_CODE}/${TARGET_CODE}`)
            .then(data => {
              return data.json()
            })
            .then(info => {
              return conversionRateLeft = info.conversion_rate
            })
            fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${TARGET_CODE}/${BASE_CODE}`)
            .then(data => {
              return data.json()
            })
            .then(info => {
              return conversionRateRight = info.conversion_rate
            })
  }

  // fetchData()

  function handleSubmit() {
    fetchData(BASE_CODE.text, TARGET_CODE.text)
    resultBase = 0
    resultTarget = 0
  }

  function sumBase() {
    let value= resultTarget*conversionRateRight
    return resultBase=parseFloat(value.toFixed(2))

  }
  function sumTarget() {
    let value = resultBase*conversionRateLeft
      return  resultTarget=parseFloat(value.toFixed(2))
  }
</script>

<main>
  <form  >
    <div>
      <select bind:value={BASE_CODE}  on:change={handleSubmit}>
        {#each currencyValue as value}
          <option value={value}>
            {value.text}
          </option>
        {/each}
      </select>
      <input type="number"  min="0" bind:value={resultBase} on:input={sumTarget}>
    </div>
    <div>
      <select bind:value={TARGET_CODE} on:change={handleSubmit}>
        {#each currencyValue as value}
          <option value={value}>
            {value.text}
          </option>
        {/each}
      </select>
      <input type="number"  min="0" bind:value={resultTarget} on:input={sumBase}>
    </div>

  </form>

</main>

<style>
form {
  display: flex;
  column-gap: 20px;
}
</style>
