// dynamicly creates a quiz form for computer science students
var quiz = {

	quizForm: false,
	activeQuestion: false,

	// create a new tag object in the end of the parent tag
	newTag: function(tagParam) {

		var tag = document.createElement(tagParam.name);
		if (tagParam.className) {
			tag.className = tagParam.className;
		}
		if (tagParam.content) {
			tag.innerHTML = tagParam.content;
		}
		if (tagParam.parentTag) {
			tagParam.parentTag.appendChild(tag);
		} else {
			console.log('Parent Element is not defined!')
		}

		return tag;
	},

	// create form conteiner with h3 heading and return the form object
	newForm: function(heading) { 

		if (this.quizForm) {
			console.log('Form already created!');
			return this;
		}
		if (typeof(heading) !== 'string') {
			heading = '' + heading;
		}

		var tag = this.newTag({name: 'div', className: 'conteiner', parentTag: document.body});
		tag = this.newTag({name: 'div', className: 'row', parentTag: tag});
		tag = this.newTag({name: 'form', className: 'col-lg-6 col-lg-offset-3 col-sm-8 col-sm-offset-2', parentTag: tag});
		tag.setAttribute('role', 'form');
		tag.setAttribute('id', 'quizForm');
		this.quizForm = tag;
		this.newTag({name: 'h3', className: 'text-center', content: heading, parentTag: this.quizForm});
		return this; 
	},

	// add a new question form group
	addQuestion: function(question) {

		if (typeof(question) !== 'string') {
			question = 'Default question:';
		}
		this.activeQuestion = this.newTag({name: 'fieldset', className: 'form-group', parentTag: this.quizForm});
		this.newTag({name: 'legend', content: question, parentTag: this.activeQuestion});
		return this;
	},

	// add a new answers to question element, checkbox by default 
	addAnswers: function(answersObj) {

		if (!this.activeQuestion) {
			console.log('Question is not created!');
			console.log(this.activeQuestion);
			return null;
		}

		if (!((answersObj.type === 'checkbox') || (answersObj.type === 'radio'))) {
			answersObj.type = 'checkbox';
		}

		// check for already generated answers (delete all if true)
		var answersCheck = this.activeQuestion.querySelectorAll('div');
		if (answersCheck.length > 0) {
			for (var i = 0; i < answersCheck.length; i++) {
				this.activeQuestion.removeChild(answersCheck[i]);
			}
		}

		for (var ind in answersObj.answers) {
			var tag = this.newTag({name: 'div', className: answersObj.type, parentTag: this.activeQuestion});
			tag = this.newTag({name: 'label', parentTag: tag});
			var tempInp = this.newTag({name: 'input', parentTag: tag});
			tempInp.setAttribute('type', answersObj.type);
			tempInp.setAttribute('name', answersObj.name);
			tempInp.setAttribute('value', ind);
			tag.appendChild(document.createTextNode(answersObj.answers[ind]));
		}
		return this;
	},

	addCheckButton: function(text) {
		var tag = this.newTag({name: 'div', className: 'text-center', parentTag: this.quizForm});
		this.newTag({name: 'button', className: 'btn btn-primary', content: text, parentTag: tag});
		return null;
	}
};

// helper function. Question generator
function generateQuestions(n, name, type) {

	var result = {
		name: name,
		type: type,
		answers: {}
	}

	for (var i = 1; i < (n + 1); i++) {
		result.answers[('ans' + i)] = 'Вариант ответа №' + i;
	}
	return result;
}

var newQuiz = quiz.newForm('Тест по программированию');
newQuiz.addQuestion('1. Вопрос №1').addAnswers(generateQuestions(3, 'que1', 'checkbox'));
newQuiz.addQuestion('2. Вопрос №2').addAnswers(generateQuestions(4, 'que2', 'radio'));
newQuiz.addQuestion('3. Вопрос №3').addAnswers(generateQuestions(5, 'que3', 'checkbox'));
newQuiz.addCheckButton('Проверить мои результаты');