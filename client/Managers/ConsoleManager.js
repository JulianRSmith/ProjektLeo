/************************************************************

    This will be a way to handle console.log calls in a 
    nicer way. I hope to have this push errors and alerts to
    the DOM so it will make it easier to debug without the
    console/inspector attached to the browser.

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