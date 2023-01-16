//Задача3
// Написать функцию
// promiseReduce(asyncFunctions, reduce, initialValue)
// asyncFunctions - массив асинхронных функций, возвращающих промис
// reduce(memo, value) - функция, которая будет вызвана для каждого успешно завершившегося промиса.
// initialValue - стартовое значение для функции reduce
// promiseReduce последовательно вызывает переданные асинхронные функции
// и выполняет reduce функцию сразу при получении результата до вызова следующей асинхронной функции. Функция promiseReduce должна возвращать промис с конечным результатом.

var fn1 = () => {
	console.log('fn1')
	return Promise.resolve(1)
}
var fn2 = () =>
	new Promise(resolve => {
		console.log('fn2')
		setTimeout(() => resolve(2), 1000)
	})
function promiseReduce(asyncFunctions, reduce, initialValue) {
	async function fn() {
		let result

		async function fn3(promise, memo) {
			return promise().then(value => reduce(memo, value))
		}

		for (i = 0, memo = initialValue; i < asyncFunctions.length; i++) {
			memo = await fn3(asyncFunctions[i], memo)
			result = memo
		}
		return result
	}
	return fn()
}
promiseReduce(
	[fn1, fn2],
	function (memo, value) {
		console.log('reduce')
		return memo * value
	},
	1
).then(console.log)
// fn1
// reduce
// fn2
// reduce
// 2git status
