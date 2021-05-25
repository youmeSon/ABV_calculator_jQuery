"use strict";

const SucroseMolarMass = 342;
const EthanolMolarMass = 46;
const EthanolDensity = 1.12669;

$(document).ready(() => {
  let alcohol = $("#alcohol_option").val();
  let beverageAmount = $("#beverage_amount").val();
  let addSugarAmount = $("#sugar_amount").val();
  let finalVolume = $("#final_volume").val() * 1000;
  $("#alcohol_option").on("change", (event) => {
    alcohol = $(event.currentTarget).val();
  });
  $("#beverage_amount").on("change", (event) => {
    beverageAmount = $(event.currentTarget).val();
  });

  $("#sugar_amount").on("change", (event) => {
    addSugarAmount = $(event.currentTarget).val();
  });

  $("#final_volume").on("change", (event) => {
    finalVolume = $(event.currentTarget).val() * 1000;
  });

  function baseSugar(alcohol) {
    switch (alcohol) {
      case "beer":
        return 517.72;
      case "cider":
        return 100;
      case "mead":
        return 81;
      case "wine":
        return 160;
      default:
    }
  }
  const calculateABV = () => {
    let sugarPerLitre = baseSugar(alcohol);
    let baseSugarAmount = beverageAmount * sugarPerLitre;
    let totalSugarMass = baseSugarAmount + parseInt(addSugarAmount);
    let sucroseMoles = totalSugarMass / SucroseMolarMass;

    //C12H22O11 + H2O => 2C6H12O6
    const glucoseMoles = sucroseMoles * 2;

    //C6H12O6 => 2C2H6O + 2CO2
    const ethanolMoles = glucoseMoles * 2;

    const ethanolMass = ethanolMoles * EthanolMolarMass;
    const ethanolVolume = ethanolMass * EthanolDensity;
    return (ethanolVolume / finalVolume) * 100;
  };

  $(".cal_button").on("click", () => {
    const result = calculateABV().toFixed(1);
    $(".cal_result").html(`Result: Your ${alcohol} has ${result}% !`);
  });
});
