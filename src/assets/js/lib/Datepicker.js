
import Barba from "barba.js";
import flatpickr from "flatpickr";
import { Ja } from "flatpickr/dist/l10n/ja.js"

module.exports = class{

	constructor(){
		var init = function(){
			flatpickr(".datepicker",{
				"locale": "ja",
				dateFormat: "Y年m月d日"
				// mode: "multiple",
			});

			flatpickr(".timepicker",{
				"locale": "ja",
				enableTime: true,
			    noCalendar: true,
			    dateFormat: "H:i"
			});
		}
		Barba.Dispatcher.on('transitionCompleted', init);
	}
};