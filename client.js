Vue.component(
	'todo-item', {
		props: ['todo'],
		template: '<li> {{ todo.text }} </li>'
});

var app = new Vue({
	el: '#app',
	data: {
		message: 'Hello Vue!',
		seen: true,
		todos: [
			{ text: 'Learn JavaScript' },
			{ text: 'Learn Vue' },
			{ text: 'Build something awesome' }
		],
		groceryList: [
			{ id: 0, text: 'Vegetables' },
			{ id: 1, text: 'Cheese' },
			{ id: 2, text: 'Whatever else humans are supposed to eat' }
		]
	},
	methods: {
		reverseMessage: function () {
			this.message = this.message.split('').reverse().join('')
		},
		setMode: function () {
			this.seen = !this.seen;
		}
	}
});

app.message = "I Have chaged the data!";
app.todos.push({ text: 'New item' });
