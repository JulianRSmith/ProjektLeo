/************************************************************

    This will be a way to handle console.log calls in a 
    nicer way. 

    This makes it possible to push notifications to the DOM
    while keeping a log of it in the console.

    console.log still works for debugging in general.

************************************************************/

var ConsoleManager = {

	success: function(message, push) {

		console.log(message);

		if(push) {
			toastr.success(message)
		}

	},

	log: function(message, push) {

		console.log(message);

		if(push) {
			toastr.info(message)
		}

	},

	error: function(message, push) { 
		
		console.error(message);

		if(push) {
			toastr.error(message)
		}

	},

	warning: function(message, push) { 
		
		console.error(message);

		if(push) {
			toastr.warning(message)
		}

	}

}