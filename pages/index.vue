<template>
  <div>
    <h1>Energy Price Cap Calculator</h1>
    <p>
      Enter your estimated annual <b>electric</b> and <b>gas</b> usage in KWh to generate an
      estimated bill with breakdown
    </p>
    <FormKit
      type="form"
      id="calculator"
      submit-label="Calculate"
      @submit="submitHandler"
      :actions="false"
    >
      <FormKit
        type="number"
        name="eUsage"
        v-model="eUsage"
        label="Electric usage (KWh)"
        validation="required|number"
      />
      <FormKit
        type="number"
        name="gUsage"
        v-model="gUsage"
        label="Gas usage (KWh)"
        validation="required|number"
      />
      <FormKit type="submit" label="Calculate" />
    </FormKit>

    <h2>Annual cost: {{ formatter.format(cCostDiscounted) }}</h2>

    <h3>Breakdown</h3>
    <table>
      <tbody>
        <tr>
          <td>Annual standing charge</td>
          <td>{{ formatter.format(cAnnualStandingCharge) }}</td>
        </tr>
        <tr>
          <td>Annual usage cost</td>
          <td>{{ formatter.format(cCost) }}</td>
        </tr>
        <tr>
          <td>Combined annual cost</td>
          <td>{{ formatter.format(cTotal) }}</td>
        </tr>
        <tr>
          <td>Winter funding</td>
          <td>-{{ formatter.format(funding) }}</td>
        </tr>
        <tr>
          <td>Discounted annual cost</td>
          <td>
            <b>{{ formatter.format(cCostDiscounted) }}</b>
          </td>
        </tr>
        <tr>
          <td>Monthly cost</td>
          <td>{{ formatter.format(cCostMonthly) }}</td>
        </tr>
      </tbody>
    </table>

    <h4>Notes</h4>
    <p>
      Based on figures provided here
      <a
        href="https://www.gov.uk/government/publications/energy-bills-support/energy-bills-support-factsheet-8-september-2022"
        >https://www.gov.uk/government/publications/energy-bills-support/energy-bills-support-factsheet-8-september-2022</a
      >
    </p>
    <p>Electric daily standing charge set at £{{ eDailyStandingCharge }} per day</p>
    <p>Electric per kWh charge set at £{{ ePKW }}</p>
    <p>
      Gas daily standard charge set at £{{ gDailyStandingCharge }}
      per day
    </p>
    <p>Gas per kWh charge set at £{{ gPKW }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

// electric
const eUsage = ref(3742);
const eDailyStandingCharge = ref(0.46);
const eAnnualStandingCharge = ref(0);
const ePKW = ref(0.34);
const eCost = ref(0);

// gas
const gUsage = ref(3524);
const gDailyStandingCharge = ref(0.28);
const gAnnualStandingCharge = ref(0);
const gPKW = ref(0.103);
const gCost = ref(0);

// combined
const cAnnualStandingCharge = ref(0);
const cCost = ref(0.0);
const cTotal = ref(0.0);
const funding = ref(400.0);
const cCostDiscounted = ref(0);
const cCostMonthly = ref(0);

var formatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

const submitHandler = () => {
  // electric
  eAnnualStandingCharge.value = eUsage.value > 0 ? eDailyStandingCharge.value * 365 : 0;
  eCost.value = ePKW.value * eUsage.value;

  // gas
  gAnnualStandingCharge.value = gUsage.value > 0 ? gDailyStandingCharge.value * 365 : 0;
  gCost.value = gPKW.value * gUsage.value;

  // combined
  cAnnualStandingCharge.value = eAnnualStandingCharge.value + gAnnualStandingCharge.value;
  cCost.value = Math.round((eCost.value + gCost.value) * 100) / 100;
  cTotal.value = Math.round((cAnnualStandingCharge.value + cCost.value) * 100) / 100;

  // calcs
  cCostDiscounted.value = cTotal.value - funding.value;
  cCostMonthly.value = Math.round((cCostDiscounted.value / 12) * 100) / 100;
};

onMounted(() => {
  submitHandler();
});
</script>

<style lang="css">
table td:nth-child(1) {
  text-align: end;
}
</style>
