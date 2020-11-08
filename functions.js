const ingredients = document.getElementById('Ingredients');
const ingredientsClone = document.getElementById('IngredientsClone');
const multiplicators = document.getElementsByClassName('portions');
const amounts = document.getElementsByClassName('amount');
var collapsed = true;

function init() {
	cloneIngredients();

	for (let multiplicator of multiplicators) {
		multiplicator.addEventListener('input', function(e) {
			multiplyIngredients(e.target);
			e.stopPropagation();
		}, true);
	}

	multiplyIngredients(multiplicators[0]);
}

function cloneIngredients() {
	let ingredientsTable = ingredients.firstElementChild;
	let ingredientsTableClone = ingredientsTable.cloneNode(true);
	ingredientsClone.appendChild(ingredientsTableClone);
}

function multiplyIngredients(multiplicator) {
	multiplicators[Number(multiplicator === multiplicators[0])].value = multiplicator.value;
	for (let i = 0; i < amounts.length; ++i) {
		amounts[i].textContent = Number(amounts[i].getAttribute('base')) * Number(multiplicator.value);
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
		ingredientsClone.style.transform = 'translateX(0%)';
	} else {
		ingredientsClone.style.transform = 'translateX(-100%) translateX(1.5rem)';
	}
	collapsed = !collapsed;
}