/* Criado por Fernando Galdino Santana Junior, 02/09/2023 */

/* =============================== BASE CONVERTER ===================================== */
let normalBase;
let desiredBase;
let number;
let convertedNumber;

function isBaseValid(base) {
  if (isNaN(base) || base > 10 || base < 2 || isFractionNumber(base)) {
    return false;
  }
  return true;
}

function isNumberValid(number, normalBase) {
  let index = 0;
  if (isNaN(number)) {
    return false;
  } else {
    while (index < number.length) {
      if (
        number.toString().charAt(index) >= normalBase ||
        number.toString().charAt(index) === `-`
      ) {
        return false;
      }
      index++;
    }
  }
  return true;
}

function isFractionNumber(number) {
  const numberCopy = number.toString();
  if (numberCopy.includes(`.`)) {
    return true;
  }
  return false;
}

function splitFractionNumber(number) {
  let numberCopy = number.toString();
  let index = 0;
  while (index < numberCopy.length) {
    if (numberCopy.charAt(index + 1) === `.`) {
      numberCopy = numberCopy.replace(numberCopy.charAt(index), `0`);
      break;
    }
    numberCopy = numberCopy.replace(numberCopy.charAt(index), ``);
  }
  return parseFloat(numberCopy);
}

function getNormalBase() {
  console.log(`AVISO! Meu sistema ainda não suporta base maior que 10!`);
  normalBase = prompt(`Qual a base o número está?`, 10);
  while (!isBaseValid(normalBase)) {
    normalBase = prompt(
      `Favor, digite apenas o número que representa a base`,
      10
    );
  }
  return parseInt(normalBase);
}

function getDesiredBase() {
  console.log(`AVISO! Meu sistema ainda não suporta base maior que 10!`);
  desiredBase = prompt(`Para qual base desja converter?`, 2);
  while (!isBaseValid(desiredBase) || normalBase === desiredBase) {
    desiredBase = prompt(
      `Favor, digite apenas o número que representa a base ou selecione uma base diferente da anterior!`,
      2
    );
  }
  return parseInt(desiredBase);
}

function getNumber() {
  console.log(
    `AVISO! Meu sistema ainda não possui validações se o número está correto conforme a base! E nem funciona com fracionários também`
  );
  number = prompt(`Qual número deseja converter?`);
  while (!isNumberValid(number, normalBase)) {
    //devo pôr ou não os parâmetros se a variável é global?
    number = prompt(`Insira um número válido por favor!`);
  }
  return parseFloat(number);
}

function invertOrder(number) {
  return number.split(``).reverse().join(``);
}

function convertBiggerToLowerBase(desiredBase, number) {
  let fractionNumberBuild = `.`;
  convertedNumber = ``;
  if (isFractionNumber(number)) {
    let fractionNumber = splitFractionNumber(number);
    number = parseInt(number);
    let index = 0;
    while (isFractionNumber(fractionNumber) && index < 10) {
      fractionNumber = fractionNumber * desiredBase;
      fractionNumberBuild += fractionNumber.toString().charAt(0);
      if (isFractionNumber(fractionNumber)) {
        fractionNumber = splitFractionNumber(fractionNumber);
      }
      index++;
    }
  }
  if (number > 1) {
    while (number >= desiredBase) {
      convertedNumber += (number % desiredBase).toString();
      number = parseInt(number / desiredBase);
    }
    convertedNumber = convertedNumber + number.toString();
    convertedNumber = invertOrder(convertedNumber);
    if (fractionNumberBuild.length > 1) {
      convertedNumber += fractionNumberBuild;
    }
  } else {
    convertedNumber = "0" + fractionNumberBuild;
  }
}

function convertLowerToBiggerBase(normalBase, number) {
  let fractionNumberBuild = 0;
  if (isFractionNumber(number)) {
    let fractionNumber = splitFractionNumber(number).toString().slice(2);
    number = parseInt(number);
    let index = 0;
    while (index < fractionNumber.length) {
      fractionNumberBuild +=
        parseInt(fractionNumber.charAt(index)) * normalBase ** -(index + 1);
      index++;
    }
    fractionNumberBuild = fractionNumberBuild.toString().slice(1);
  }
  convertedNumber = 0;
  number = number.toString();
  number = invertOrder(number);
  let index = number.length - 1;
  while (index >= 0) {
    if (parseInt(number.charAt(index)) !== 0) {
      convertedNumber =
        convertedNumber + parseInt(number.charAt(index)) * normalBase ** index;
    }
    index--;
  }
  if (fractionNumberBuild.length > 1) {
    convertedNumber = parseFloat(
      convertedNumber.toString() + fractionNumberBuild
    );
    if (fractionNumberBuild.length > 10) {
      convertedNumber = convertedNumber.toFixed(10);
    }
  }
}

function convertNumber(normalBase, desiredBase, number) {
  if (number === 0) {
    return 0;
  }
  if (normalBase !== 10 && desiredBase !== 10) {
    convertLowerToBiggerBase(normalBase, number);
    convertBiggerToLowerBase(desiredBase, convertedNumber);
  } else {
    if (normalBase > desiredBase) {
      convertBiggerToLowerBase(desiredBase, number);
    } else {
      convertLowerToBiggerBase(normalBase, number);
    }
  }
  return convertedNumber;
}

normalBase = getNormalBase();
desiredBase = getDesiredBase();
number = getNumber();
convertedNumber = convertNumber(normalBase, desiredBase, number);
console.log(`O número converitdo é igual à: ${convertedNumber}`);
