const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

function checkMembership(cartTotal, isMember) {
  if (isMember) {
    let discountAmount =
      Number(cartTotal) -
      Number(cartTotal) * (Number(discountPercentage) / 100);
    return discountAmount;
  } else {
    return cartTotal;
  }
}

function calculateTax(cartTotal) {
  let tax = Number(cartTotal) * (taxRate / 100);
  return tax;
}

function estimateDeliveryTime(shippingMethod, distance) {
  if (shippingMethod === 'standard') {
    let estimateTime = Number(distance) / 50;
    return estimateTime;
  } else if (shippingMethod === 'express') {
    let estimateTime = Number(distance) / 100;
    return estimateTime;
  } else {
    return 'Invalid shippingMethod';
  }
}

function calculateShippingCost(weight, distance) {
  let shippingCost = Number(weight) * Number(distance) * 0.1;
  return shippingCost;
}

function calculateLoyalty(purchaseAmount) {
  let loyalty = parseFloat(purchaseAmount) * loyaltyRate;
  return loyalty;
}

function calculateCartTotal(newItemPrice, cartTotal) {
  let totalCartAmount = Number(newItemPrice) + Number(cartTotal);
  return totalCartAmount;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = req.query.newItemPrice;
  let cartTotal = req.query.cartTotal;
  let totalCartAmount = calculateCartTotal(newItemPrice, cartTotal).toString();

  res.send(totalCartAmount);
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = req.query.cartTotal;
  let isMember = req.query.isMember;

  let result = checkMembership(cartTotal, isMember).toString();
  res.send(result);
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = req.query.cartTotal;
  let totalTax = calculateTax(cartTotal).toString();
  res.send(totalTax);
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = req.query.distance;

  let estimatedTime = estimateDeliveryTime(shippingMethod, distance).toString();
  res.send(estimatedTime);
});

app.get('/shipping-cost', (req, res) => {
  let weight = req.query.weight;
  let distance = req.query.distance;

  let totalCost = calculateShippingCost(weight, distance).toString();

  res.send(totalCost);
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = req.query.purchaseAmount;
  let loyaltyPoints = calculateLoyalty(purchaseAmount).toString();

  res.send(loyaltyPoints);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
