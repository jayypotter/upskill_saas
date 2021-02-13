/* global $, Stripe */

// Document ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  // Set stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') )
  
  // When user clicks the submit button
  submitBtn.click(function(event){
     // prevent user default submission
    event.PreventDefault();
    
  // Collect credit card fields
  var ccNum = $('#card_number').val(),
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val(),
  // Send card information to stirpe
  Stripe.createToken({
    number: ccNum,
    cvc: cvcNum,
    exp_month: expMonth,
    exp_year: expYear
  }, stripeResponseHandler);
  
  });
 
  

  // Stripe to return back card token
  // Inject card token as hidden field in to form
  
  // Submit for to Rails app
});