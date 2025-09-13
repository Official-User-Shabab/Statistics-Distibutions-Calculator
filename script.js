// maintanence sorta funcs

function showCalc(id) {
  document.getElementById("menu").style.display = "none";
  document.querySelectorAll(".calculator").forEach(c => c.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function goBack() {
  document.querySelectorAll(".calculator").forEach(c => c.style.display = "none");
  document.getElementById("menu").style.display = "block";
}

function showResult(id, text) {
  const box = document.getElementById(id);
  box.style.display = "inline-block";
  box.innerHTML = text;
}

function factorial(n) {
  if (n < 0) return NaN;
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
}

function nCr(n, r) {
  if (r > n || r < 0) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
}



// Binomial


function calcBinomial() {
  const x = parseInt(document.getElementById("binom-x").value);
  const n = parseInt(document.getElementById("binom-n").value);
  const p = parseFloat(document.getElementById("binom-p").value);
  const prob = nCr(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
  
  showResult("binom-result", `P(X=${x}) = ${prob.toFixed(6)}`);
}


function calcBinomialCDF() {
  const x = parseInt(document.getElementById("binom-x").value);
  const n = parseInt(document.getElementById("binom-n").value);
  const p = parseFloat(document.getElementById("binom-p").value);
  
  let cdf = 0;
  for (let k = 0; k <= x; k++) {
    cdf += nCr(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  }
  showResult("binom-result", `P(X ≤ ${x}) = ${cdf.toFixed(6)}`);
}

// normal

function phi(x) {
  return 0.5 * (1 + erf(x / Math.sqrt(2)));
}

function erf(x) {

  // Approximation of error function
  const sign = (x >= 0) ? 1 : -1;
  x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429;
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

function calcNormalPDF() {
  const x = parseFloat(document.getElementById("norm-x").value);
  const sigma = parseFloat(document.getElementById("norm-sigma").value);
  const mu = parseFloat(document.getElementById("norm-mu").value);
  const pdf = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
  
  showResult("norm-result", `f(${x}) = ${pdf.toFixed(6)}`);
}

function calcNormalCDF() {
  const x = parseFloat(document.getElementById("norm-x").value);
  const sigma = parseFloat(document.getElementById("norm-sigma").value);
  const mu = parseFloat(document.getElementById("norm-mu").value);
  const z = (x - mu) / sigma;
  const cdf = phi(z);
  
  showResult("norm-result", `P(X ≤ ${x}) = ${cdf.toFixed(6)}`);
}

function calcNormalArea() {
  const x1 = parseFloat(document.getElementById("norm-x1").value);
  const x2 = parseFloat(document.getElementById("norm-x2").value);
  const sigma = parseFloat(document.getElementById("norm-sigma2").value);
  const mu = parseFloat(document.getElementById("norm-mu2").value);
  const z1 = (x1 - mu) / sigma;
  const z2 = (x2 - mu) / sigma;
  const area = phi(z2) - phi(z1);
  showResult("norm-result", `P(${x1} ≤ X ≤ ${x2}) = ${area.toFixed(6)}`);
}


// Geometric

function calcGeometric() {
  const p = parseFloat(document.getElementById("geom-p").value);
  const k = parseInt(document.getElementById("geom-k").value);
  const prob = Math.pow(1 - p, k - 1) * p;
  
  showResult("geom-result", `P(X=${k}) = ${prob.toFixed(6)}`);
}

function calcGeometricCDF() {
  const p = parseFloat(document.getElementById("geom-p").value);
  const k = parseInt(document.getElementById("geom-k").value);
  const cdf = 1 - Math.pow(1 - p, k);
  
  showResult("geom-result", `P(X ≤ ${k}) = ${cdf.toFixed(6)}`);
}


// Discrete Uniform 


function calcDiscreteUniform() {

  const a = parseInt(document.getElementById("du-a").value);
  const b = parseInt(document.getElementById("du-b").value);
  const x = parseInt(document.getElementById("du-x").value);
  const n = b - a + 1;
  
  let prob = (x >= a && x <= b) ? 1 / n : 0;
  showResult("du-result", `P(X=${x}) = ${prob.toFixed(6)}`);
}

function calcDiscreteUniformCDF() {
  const a = parseInt(document.getElementById("du-a").value);
  const b = parseInt(document.getElementById("du-b").value);
  const x = parseInt(document.getElementById("du-x").value);
  if (x < a) return showResult("du-result", `P(X ≤ ${x}) = 0`);
  if (x >= b) return showResult("du-result", `P(X ≤ ${x}) = 1`);
  const cdf = (x - a + 1) / (b - a + 1);
  showResult("du-result", `P(X ≤ ${x}) = ${cdf.toFixed(6)}`);
}


// Continuous Uniform

function calcContinuousUniform() {
  const a = parseFloat(document.getElementById("cu-a").value);
  const b = parseFloat(document.getElementById("cu-b").value);
  const x = parseFloat(document.getElementById("cu-x").value);
  const pdf = (x >= a && x <= b) ? 1 / (b - a) : 0;
  showResult("cu-result", `f(${x}) = ${pdf.toFixed(6)}`);
}

function calcContinuousUniformCDF() {
  const a = parseFloat(document.getElementById("cu-a").value);
  const b = parseFloat(document.getElementById("cu-b").value);
  const x = parseFloat(document.getElementById("cu-x").value);
  
  let cdf;
  if (x < a) cdf = 0;
  else if (x > b) cdf = 1;
  else cdf = (x - a) / (b - a);
  showResult("cu-result", `P(X ≤ ${x}) = ${cdf.toFixed(6)}`);
}


// Ad-hoc func

function calcAdhoc() {
  const fnStr = document.getElementById("adhoc-fn").value;
  const a = parseFloat(document.getElementById("adhoc-a").value);
  const b = parseFloat(document.getElementById("adhoc-b").value);

  let f;
  try {
    f = new Function("x", "return " + fnStr);
  } catch (e) {
    return showResult("adhoc-result", "Invalid function.");
  }

  // applyin trapezoidal rule
  const n = 1000;
  const h = (b - a) / n;
  
  let sum = 0.5 * (f(a) + f(b));
  for (let i = 1; i < n; i++) sum += f(a + i * h);
  
  const integral = sum * h;

  showResult("adhoc-result", `∫ f(x) dx from ${a} to ${b} ≈ ${integral.toFixed(6)}`);
}

// Poisson 

function calcPoisson() {
  const x = parseInt(document.getElementById("pois-x").value);
  const lambda = parseFloat(document.getElementById("pois-lambda").value);
  const prob = Math.pow(lambda, x) * Math.exp(-lambda) / factorial(x);
  
  showResult("pois-result", `P(X=${x}) = ${prob.toFixed(6)}`);
}

function calcPoissonCDF() {
  const x = parseInt(document.getElementById("pois-x").value);
  const lambda = parseFloat(document.getElementById("pois-lambda").value);
  
  let cdf = 0;
  for (let k = 0; k <= x; k++) {
    cdf += Math.pow(lambda, k) * Math.exp(-lambda) / factorial(k);
  }
  showResult("pois-result", `P(X ≤ ${x}) = ${cdf.toFixed(6)}`);
}
