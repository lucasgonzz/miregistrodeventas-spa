import moment from 'moment'
moment.locale('es')
import numeral from 'numeral'
export default {
	methods: {
		date(d) {
			return moment(d).format('DD/MM/YY')
		},
		hour(d) {
			return moment(d).format('HH:mm')
		},
		price(p) {
			return numeral(p).format('$0,0.00')
		},
		getMonth(d) {
			return moment(d).format('MMMM')
		},
		getDay(d) {
			return moment(d).format('dddd')
		},
		since(date) {
			return moment(date).fromNow()
		},
		diff(d, formated = false) {
			var date = moment().diff(d, 'days')+''
			date = date.replace('-', '')
			if (formated) {
				// console.log('a: '+date)
				if (date == '0') {
					date = 'hoy'
				} else if (date == '1') {
					date = 'mañana'
				} else if (date == '2') {
					date = 'pasado mañana'
				} else {
					date = 'en ' + date + ' días'
				}
			} 
			return date
		},
		diff_(d) {
			var date = moment().diff(d, 'days')
			return date
		},
	}
}