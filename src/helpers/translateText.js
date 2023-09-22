export const translateText = (text, type) => {
  const textConvert = text.trim().toLowerCase();
  let result;

  const conversions = {
    specie: {
      human: "Humano",
      default: "Alien",
    },
    default: {
      unknown: "Desconocido",
      female: "Femenino",
      default: "Masculino",
    },
  };

  if (type in conversions) {
    result = conversions[type][textConvert] || conversions[type].default;
  } else {
    result = conversions.default[textConvert] || conversions.default.default;
  }

  return result;
};
