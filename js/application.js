var updateItemTotal = function(e) {
  var itemPrice = parseFloat($(e).find('.price span').text());
  var itemQuantity = parseFloat($(e).find('.quantity input').val());
  var itemTotal = itemPrice * itemQuantity;

  $(e).find('.total span').text(itemTotal.toFixed(2));

  return itemTotal;
}

var sum = function(acc, x) { return acc + x; }

var updateTotalPrice = function() {
  var itemTotals = [];

  $('tr:not(:last)').each(function(i, e) {
    var itemTotal = updateItemTotal(e);
    itemTotals.push(itemTotal);
  });

  var totalPrice = itemTotals.reduce(sum);

  return totalPrice;
}

showTotalPrice = function(totalPrice) {
  console.log(totalPrice);
  $('#totalPrice').text(totalPrice.toFixed(2));
}

var addItemToTable = function() {
  var itemName = $('#createNewItemAndPrice').find('.name input').val();
  var itemPrice = parseFloat($('#createNewItemAndPrice').find('.price input').val());
  var newItemHTML = '<tr>' +
    '<td class="name">' + itemName + '</td>' +
    '<td class="price">$<span>' + itemPrice.toFixed(2) + '</span></td>' +
    '<td class="quantity">QTY<input type="number" value="0" min="0"/><button class="btn btn-light btn-sm cancel">cancel</button></td>' +
    '<td class="total">$<span></span></td>' +
  '</tr>'

  // add new table data to table
  $(newItemHTML).insertBefore('#createNewItemAndPrice');

  updateTotalPrice();
  // clear inputs
  itemName = $('#createNewItemAndPrice').find('.name input').val('');
  itemPrice = parseFloat($('#createNewItemAndPrice').find('.price input').val(''));
}

$(document).ready(function() {

  $(document).on('click', '.btn.calculate', function() {
    console.log('button works!');
    var totalPrice = updateTotalPrice()
    showTotalPrice(totalPrice);
  });

  updateTotalPrice();

  // remove quantity total when button is clicked
  $('.btn.cancel').on('click', function() {
    $(this).prev().val(0);
  });

  // add debounce
  var timeout;
  $(document).on('input', 'tr', function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      updateTotalPrice();
    }, 1000);
  });

  // add values to table
  $('.btn.create').on('click', addItemToTable);
});