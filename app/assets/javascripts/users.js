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
    submitBtn.val("Processing").prop('disabled', true);
    // Collect credit card fields
    var ccNum = $('#card_number').val(),
    cvcNum = $('#card_code').val(),
    expMonth = $('#card_month').val(),
    expYear = $('#card_year').val(),
    // Use Stripe to check for card errors
    var error = false;
    
    // validate card number
    if (!Stripe.card.validateCardNumber(ccNum)) {
      error = true
      alert('The credit card number is incorrect');
    }
    
      // validate cvc number
    if (!Stripe.card.validateCVC(cvcNum)) {
      error = true
      alert('The security number is incorrect');
    }
    
      // validate exp date
    if (!Stripe.card.validateExpiryr(expMonth, expYear)) {
      error = true
      alert('The exp date is incorrect');
    }
    
    if (error) {
      // If error dont send to Stripe
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
      // Send card information to Stripe
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
      
      return false;
  });

  // Stripe to return back card token
  function stripeResponseHandler(status, response) {
    var token = response.id;
    
    // Inject card token to hidden field
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    // Subit to rails app
    theForm.get(0).submit();
  }
  
  // Inject card token as hidden field in to form
  
  // Submit for to Rails app
});