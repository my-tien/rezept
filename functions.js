const ingredients = document.getElementById('Ingredients');
const ingredientsClone = document.getElementById('IngredientsClone');
const multiplicators = document.getElementsByClassName('portions');
const amounts = document.getElementsByClassName('amount');
var collapsed = true;

function init() {
	for (let multiplicator of multiplicators) {
		multiplicator.addEventListener('click', function(e) {
			if (e.target === multiplicators[1]) {
				e.stopPropagation();
			}
		}, true);
		multiplicator.addEventListener('input', function(e) {
			multiplyIngredients(e.target);
			e.stopPropagation();
		}, true);
	}

	multiplyIngredients(multiplicators[0]);
}

function multiplyIngredients(multiplicator) {
	multiplicators[Number(multiplicator === multiplicators[0])].value = multiplicator.value;
	for (let i = 0; i < amounts.length; ++i) {
		let number = (Number(amounts[i].getAttribute('base')) * Number(multiplicator.value));
		amounts[i].textContent = number.toFixed(!Number.isInteger(number) * 2);
	}
}

document.addEventListener('scroll', function(e) {
	first_data_row = ingredients.querySelector('tr');
	let ingredientsVisible = !(window.scrollY > (ingredients.offsetTop + first_data_row.offsetHeight));
	ingredientsClone.style.visibility = ingredientsVisible? 'hidden' : 'visible';
	if (!collapsed && ingredientsClone.style.visibility == 'hidden') {
		let oldTransition = ingredientsClone.transition;
		ingredientsClone.transition = '0s';
		toggleSideBar();
		ingredientsClone.transition = oldTransition;
	}
}, true);

function toggleSideBar() {
	if (collapsed) {
		ingredientsClone.classList.add('visible');
	} else {
		ingredientsClone.classList.remove('visible');
	}
	collapsed = !collapsed;
}