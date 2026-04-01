// All quiz questions organized by topic and level
const TOPICS = {
  arrays: {
    id: 'arrays',
    name: 'Масиви',
    icon: '📦',
    color: '#00d4ff',
    levels: [
      {
        name: 'Початковий',
        desc: 'Основи масивів: створення, індекси, push/pop',
        questions: [
          {
            question: "Як створити порожній масив у JavaScript?",
            code: null,
            options: ["let arr = []", "let arr = {}", "let arr = ()", "let arr = <>"],
            correct: 0
          },
          {
            question: "Що виведе цей код?",
            code: "const fruits = ['apple', 'banana', 'cherry'];\nconsole.log(fruits[1]);",
            options: ["apple", "banana", "cherry", "undefined"],
            correct: 1
          },
          {
            question: "Який метод додає елемент в кінець масиву?",
            code: null,
            options: [".shift()", ".unshift()", ".push()", ".pop()"],
            correct: 2
          },
          {
            question: "Що виведе цей код?",
            code: "const nums = [10, 20, 30, 40];\nconsole.log(nums.length);",
            options: ["3", "4", "5", "undefined"],
            correct: 1
          },
          {
            question: "Який метод видаляє останній елемент масиву?",
            code: null,
            options: [".push()", ".shift()", ".pop()", ".delete()"],
            correct: 2
          },
          {
            question: "Що виведе цей код?",
            code: "const arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr);",
            options: ["[1, 2, 3]", "[4, 1, 2, 3]", "[1, 2, 3, 4]", "[1, 2, 4]"],
            correct: 2
          },
          {
            question: "Який метод об'єднує елементи масиву в рядок?",
            code: null,
            options: [".concat()", ".join()", ".merge()", ".combine()"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const colors = ['red', 'green', 'blue'];\nconsole.log(colors.includes('green'));",
            options: ["1", "true", "false", "'green'"],
            correct: 1
          },
          {
            question: "Який метод створює новий масив з результатами функції?",
            code: null,
            options: [".forEach()", ".filter()", ".map()", ".reduce()"],
            correct: 2
          },
          {
            question: "Що виведе цей код?",
            code: "const nums = [5, 10, 15];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);",
            options: ["[5, 10, 15]", "[10, 20, 30]", "[2, 2, 2]", "[7, 12, 17]"],
            correct: 1
          }
        ]
      },
      {
        name: 'Середній',
        desc: 'splice, slice, sort, spread, пошук',
        questions: [
          {
            question: "Чим відрізняється .slice() від .splice()?",
            code: null,
            options: [
              "slice змінює масив, splice — ні",
              "splice змінює масив, slice — ні",
              "Вони ідентичні",
              "slice працює з рядками, splice — з масивами"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const arr = [1, 2, 3, 4, 5];\nconsole.log(arr.slice(1, 3));",
            options: ["[1, 2, 3]", "[2, 3]", "[2, 3, 4]", "[1, 2]"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const arr = [3, 1, 4, 1, 5];\narr.sort();\nconsole.log(arr);",
            options: ["[1, 1, 3, 4, 5]", "[5, 4, 3, 1, 1]", "[3, 1, 4, 1, 5]", "Error"],
            correct: 0
          },
          {
            question: "Як правильно відсортувати числа за зростанням?",
            code: null,
            options: [
              "arr.sort()",
              "arr.sort((a, b) => a - b)",
              "arr.sort((a, b) => b - a)",
              "arr.numSort()"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const arr = [1, 2, 3];\nconst copy = [...arr];\ncopy.push(4);\nconsole.log(arr.length);",
            options: ["3", "4", "undefined", "Error"],
            correct: 0
          },
          {
            question: "Що робить метод .findIndex()?",
            code: null,
            options: [
              "Знаходить елемент за значенням",
              "Повертає індекс першого елемента, що задовольняє умову",
              "Повертає останній індекс елемента",
              "Перевіряє чи існує індекс"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const arr = ['a', 'b', 'c', 'd'];\narr.splice(1, 2);\nconsole.log(arr);",
            options: ["['a', 'd']", "['b', 'c']", "['a', 'b']", "['a', 'c', 'd']"],
            correct: 0
          },
          {
            question: "Що виведе цей код?",
            code: "const arr = [1, 2, 3];\narr.reverse();\nconsole.log(arr);",
            options: ["[1, 2, 3]", "[3, 2, 1]", "[3, 1, 2]", "Error"],
            correct: 1
          },
          {
            question: "Що виведе .indexOf() якщо елемент не знайдено?",
            code: null,
            options: ["0", "null", "-1", "undefined"],
            correct: 2
          },
          {
            question: "Що виведе цей код?",
            code: "const a = [1, 2];\nconst b = [3, 4];\nconsole.log([...a, ...b]);",
            options: ["[1, 2, 3, 4]", "[[1, 2], [3, 4]]", "[1, 2, [3, 4]]", "Error"],
            correct: 0
          }
        ]
      },
      {
        name: 'Просунутий',
        desc: 'reduce, деструктуризація, ланцюжки методів',
        questions: [
          {
            question: "Що виведе цей код?",
            code: "const nums = [1, 2, 3, 4];\nconst sum = nums.reduce((acc, n) => acc + n, 0);\nconsole.log(sum);",
            options: ["10", "24", "[1, 2, 3, 4]", "0"],
            correct: 0
          },
          {
            question: "Що виведе цей код?",
            code: "const [a, , b] = [1, 2, 3, 4];\nconsole.log(a, b);",
            options: ["1 2", "1 3", "1 4", "Error"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const arr = [[1, 2], [3, 4], [5]];\nconsole.log(arr.flat());",
            options: ["[[1, 2], [3, 4], [5]]", "[1, 2, 3, 4, 5]", "[1, 2, 3, 4, [5]]", "Error"],
            correct: 1
          },
          {
            question: "Що робить метод .every()?",
            code: null,
            options: [
              "Перевіряє чи хоча б один елемент відповідає умові",
              "Перевіряє чи всі елементи відповідають умові",
              "Повертає всі елементи, що відповідають умові",
              "Застосовує функцію до кожного елемента"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const nums = [1, 2, 3, 4, 5, 6];\nconst result = nums\n  .filter(n => n % 2 === 0)\n  .map(n => n * 10);\nconsole.log(result);",
            options: ["[20, 40, 60]", "[10, 20, 30, 40, 50, 60]", "[2, 4, 6]", "[10, 30, 50]"],
            correct: 0
          },
          {
            question: "Що виведе цей код?",
            code: "console.log(Array.isArray([1, 2, 3]));\nconsole.log(Array.isArray('hello'));",
            options: ["true, true", "true, false", "false, true", "false, false"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const arr = [1, 2, 3];\nconst [first, ...rest] = arr;\nconsole.log(rest);",
            options: ["[1]", "[2, 3]", "[1, 2, 3]", "3"],
            correct: 1
          },
          {
            question: "Що виведе .some() для порожнього масиву?",
            code: "console.log([].some(x => x > 0));",
            options: ["true", "false", "undefined", "Error"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const arr = Array.from({length: 3}, (_, i) => i * 2);\nconsole.log(arr);",
            options: ["[0, 2, 4]", "[2, 4, 6]", "[0, 1, 2]", "[undefined, undefined, undefined]"],
            correct: 0
          },
          {
            question: "Що виведе цей код?",
            code: "const nums = [1, 2, 3];\nconst result = nums.flatMap(n => [n, n * 2]);\nconsole.log(result);",
            options: ["[[1, 2], [2, 4], [3, 6]]", "[1, 2, 2, 4, 3, 6]", "[1, 2, 3, 2, 4, 6]", "Error"],
            correct: 1
          }
        ]
      }
    ]
  },

  variables: {
    id: 'variables',
    name: 'Змінні та типи',
    icon: '🏷️',
    color: '#7b2ff7',
    levels: [
      {
        name: 'Початковий',
        desc: 'let/const/var, типи даних, typeof',
        questions: [
          {
            question: "Яке ключове слово створює змінну, яку НЕ можна перезаписати?",
            code: null,
            options: ["let", "var", "const", "static"],
            correct: 2
          },
          {
            question: "Що виведе typeof 42?",
            code: "console.log(typeof 42);",
            options: ["'integer'", "'number'", "'Number'", "'int'"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "let name = 'Anna';\nconsole.log(`Hello, ${name}!`);",
            options: ["Hello, ${name}!", "Hello, Anna!", "Hello, name!", "Error"],
            correct: 1
          },
          {
            question: "Чим відрізняється null від undefined?",
            code: null,
            options: [
              "Нічим — це одне й те саме",
              "null — навмисно порожнє, undefined — не присвоєно значення",
              "undefined — помилка, null — правильне значення",
              "null — для чисел, undefined — для рядків"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "console.log('5' + 3);",
            options: ["8", "'53'", "NaN", "Error"],
            correct: 1
          },
          {
            question: "Що таке NaN?",
            code: null,
            options: [
              "Порожнє значення",
              "Нескінченність",
              "Not a Number — результат невдалої числової операції",
              "Null And Nothing"
            ],
            correct: 2
          },
          {
            question: "Що виведе цей код?",
            code: "let x;\nconsole.log(x);",
            options: ["0", "null", "undefined", "Error"],
            correct: 2
          },
          {
            question: "Як перетворити рядок '100' на число?",
            code: null,
            options: ["int('100')", "Number('100')", "toNumber('100')", "parse('100')"],
            correct: 1
          },
          {
            question: "Що виведе typeof true?",
            code: null,
            options: ["'boolean'", "'Boolean'", "'bool'", "'true'"],
            correct: 0
          },
          {
            question: "Що виведе цей код?",
            code: "const greeting = 'Hello';\nconst world = 'World';\nconsole.log(greeting + ' ' + world);",
            options: ["HelloWorld", "Hello World", "'Hello' 'World'", "Error"],
            correct: 1
          }
        ]
      },
      {
        name: 'Середній',
        desc: 'scope, hoisting, truthy/falsy, порівняння',
        questions: [
          {
            question: "Що виведе цей код?",
            code: "console.log(5 === '5');",
            options: ["true", "false", "undefined", "Error"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "console.log(5 == '5');",
            options: ["true", "false", "undefined", "Error"],
            correct: 0
          },
          {
            question: "Яке з цих значень є falsy?",
            code: null,
            options: ["'0' (рядок)", "[] (порожній масив)", "0 (число нуль)", "'false' (рядок)"],
            correct: 2
          },
          {
            question: "Що виведе цей код?",
            code: "var x = 10;\nif (true) {\n  var x = 20;\n}\nconsole.log(x);",
            options: ["10", "20", "undefined", "Error"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "let x = 10;\nif (true) {\n  let x = 20;\n}\nconsole.log(x);",
            options: ["10", "20", "undefined", "Error"],
            correct: 0
          },
          {
            question: "Що таке hoisting?",
            code: null,
            options: [
              "Оптимізація коду браузером",
              "Підняття оголошень змінних та функцій до верху їх scope",
              "Перетворення типів даних",
              "Видалення невикористаних змінних"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "console.log(Boolean(''));\nconsole.log(Boolean('hello'));",
            options: ["true, true", "false, false", "false, true", "true, false"],
            correct: 2
          },
          {
            question: "Що виведе цей код?",
            code: "const age = 0;\nconsole.log(age || 'невідомо');",
            options: ["0", "'невідомо'", "false", "null"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const age = 0;\nconsole.log(age ?? 'невідомо');",
            options: ["0", "'невідомо'", "false", "null"],
            correct: 0
          },
          {
            question: "Що виведе parseInt('42abc')?",
            code: null,
            options: ["NaN", "42", "0", "Error"],
            correct: 1
          }
        ]
      },
      {
        name: 'Просунутий',
        desc: 'closures, деструктуризація, optional chaining',
        questions: [
          {
            question: "Що виведе цей код?",
            code: "function outer() {\n  let count = 0;\n  return function() { return ++count; };\n}\nconst fn = outer();\nconsole.log(fn(), fn(), fn());",
            options: ["1 1 1", "1 2 3", "0 1 2", "Error"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const user = { name: 'Anna', address: { city: 'Kyiv' } };\nconsole.log(user?.address?.city);",
            options: ["undefined", "'Kyiv'", "null", "Error"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const user = null;\nconsole.log(user?.name);",
            options: ["null", "undefined", "Error: Cannot read property", "'name'"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const { name, age = 25 } = { name: 'Bob' };\nconsole.log(name, age);",
            options: ["'Bob' undefined", "'Bob' 25", "'Bob' null", "Error"],
            correct: 1
          },
          {
            question: "Що виведе typeof null?",
            code: null,
            options: ["'null'", "'undefined'", "'object'", "'boolean'"],
            correct: 2
          },
          {
            question: "Що виведе цей код?",
            code: "const obj = Object.freeze({ x: 1, y: 2 });\nobj.x = 10;\nconsole.log(obj.x);",
            options: ["10", "1", "undefined", "Error"],
            correct: 1
          },
          {
            question: "Що таке Temporal Dead Zone (TDZ)?",
            code: null,
            options: [
              "Час між оголошенням let/const та їх ініціалізацією",
              "Зона де JavaScript не працює",
              "Час після видалення змінної",
              "Частина коду, де var недоступний"
            ],
            correct: 0
          },
          {
            question: "Що виведе цей код?",
            code: "const a = { x: 1 };\nconst b = { x: 1 };\nconsole.log(a === b);",
            options: ["true", "false", "undefined", "Error"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const x = 0;\nconst result = x ?? 'default';\nconst result2 = x || 'default';\nconsole.log(result, result2);",
            options: ["0 0", "'default' 'default'", "0 'default'", "'default' 0"],
            correct: 2
          },
          {
            question: "Що виведе цей код?",
            code: "console.log(typeof typeof 42);",
            options: ["'number'", "'string'", "'typeof'", "Error"],
            correct: 1
          }
        ]
      }
    ]
  },

  functions: {
    id: 'functions',
    name: 'Функції',
    icon: '⚡',
    color: '#ff6b6b',
    levels: [
      {
        name: 'Початковий',
        desc: 'Оголошення, параметри, return, стрілкові',
        questions: [
          {
            question: "Як оголосити функцію в JavaScript?",
            code: null,
            options: [
              "func greet() {}",
              "function greet() {}",
              "def greet() {}",
              "fn greet() {}"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "function add(a, b) {\n  return a + b;\n}\nconsole.log(add(3, 5));",
            options: ["35", "8", "undefined", "Error"],
            correct: 1
          },
          {
            question: "Що повертає функція без return?",
            code: "function doSomething() {\n  let x = 5;\n}\nconsole.log(doSomething());",
            options: ["5", "null", "undefined", "0"],
            correct: 2
          },
          {
            question: "Як записати стрілкову функцію?",
            code: null,
            options: [
              "const fn = (x) -> x * 2",
              "const fn = (x) => x * 2",
              "const fn = (x) >> x * 2",
              "const fn = function=> (x) x * 2"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const greet = (name) => `Hello, ${name}!`;\nconsole.log(greet('World'));",
            options: ["Hello, World!", "Hello, name!", "undefined", "Error"],
            correct: 0
          },
          {
            question: "Що таке параметр за замовчуванням?",
            code: "function greet(name = 'Guest') {\n  return `Hi, ${name}`;\n}\nconsole.log(greet());",
            options: ["Hi, undefined", "Hi, Guest", "Hi, null", "Error"],
            correct: 1
          },
          {
            question: "Скільки параметрів може мати функція?",
            code: null,
            options: [
              "Максимум 5",
              "Максимум 10",
              "Скільки завгодно",
              "Максимум 255"
            ],
            correct: 2
          },
          {
            question: "Що виведе цей код?",
            code: "function multiply(a, b) {\n  return a * b;\n}\nconsole.log(multiply(4));",
            options: ["0", "4", "NaN", "Error"],
            correct: 2
          },
          {
            question: "Чи можна зберегти функцію у змінну?",
            code: null,
            options: [
              "Ні, функції не є значеннями",
              "Так, за допомогою const fn = function() {}",
              "Тільки стрілкові функції",
              "Тільки з ключовим словом var"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const square = x => x * x;\nconsole.log(square(7));",
            options: ["14", "49", "7", "Error"],
            correct: 1
          }
        ]
      },
      {
        name: 'Середній',
        desc: 'Callbacks, this, рекурсія, rest-параметри',
        questions: [
          {
            question: "Що таке callback-функція?",
            code: null,
            options: [
              "Функція, що повертає іншу функцію",
              "Функція, передана як аргумент в іншу функцію",
              "Функція, що викликає сама себе",
              "Функція без параметрів"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "setTimeout(() => console.log('A'), 0);\nconsole.log('B');",
            options: ["A потім B", "B потім A", "Тільки B", "Тільки A"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "function sum(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\nconsole.log(sum(1, 2, 3, 4));",
            options: ["[1, 2, 3, 4]", "10", "4", "Error"],
            correct: 1
          },
          {
            question: "Що таке рекурсія?",
            code: null,
            options: [
              "Цикл for...of",
              "Виклик функції з callback",
              "Функція, яка викликає сама себе",
              "Функція з кількома return"
            ],
            correct: 2
          },
          {
            question: "Що виведе цей код?",
            code: "function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\nconsole.log(factorial(5));",
            options: ["5", "15", "120", "25"],
            correct: 2
          },
          {
            question: "Що таке IIFE?",
            code: null,
            options: [
              "Функція, що виконується одразу після оголошення",
              "Функція, що виконується з затримкою",
              "Вбудована функція JavaScript",
              "Функція без імені"
            ],
            correct: 0
          },
          {
            question: "Що виведе цей код?",
            code: "const obj = {\n  name: 'JS',\n  greet() {\n    return `Hello, ${this.name}`;\n  }\n};\nconsole.log(obj.greet());",
            options: ["Hello, undefined", "Hello, JS", "Error", "Hello, this.name"],
            correct: 1
          },
          {
            question: "Чим стрілкова функція відрізняється щодо this?",
            code: null,
            options: [
              "Стрілкова має свій this",
              "Стрілкова не має свого this — бере з зовнішнього scope",
              "this завжди undefined у стрілкових",
              "Різниці немає"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const nums = [1, 2, 3];\nnums.forEach((n, i) => {\n  console.log(i + ': ' + n);\n});",
            options: [
              "0: 1 потім 1: 2 потім 2: 3",
              "1: 1 потім 2: 2 потім 3: 3",
              "1 2 3",
              "0 1 2"
            ],
            correct: 0
          },
          {
            question: "Що таке функція вищого порядку?",
            code: null,
            options: [
              "Функція з великою кількістю коду",
              "Функція, яка приймає або повертає іншу функцію",
              "Функція, оголошена першою в файлі",
              "Асинхронна функція"
            ],
            correct: 1
          }
        ]
      },
      {
        name: 'Просунутий',
        desc: 'Closures, каррінг, async/await, генератори',
        questions: [
          {
            question: "Що виведе цей код?",
            code: "function makeCounter() {\n  let count = 0;\n  return {\n    inc: () => ++count,\n    get: () => count\n  };\n}\nconst c = makeCounter();\nc.inc(); c.inc(); c.inc();\nconsole.log(c.get());",
            options: ["0", "1", "3", "undefined"],
            correct: 2
          },
          {
            question: "Що таке каррінг (currying)?",
            code: null,
            options: [
              "Перетворення функції з N аргументів у ланцюжок функцій з одним аргументом",
              "Об'єднання кількох функцій в одну",
              "Кешування результатів функції",
              "Виклик функції без аргументів"
            ],
            correct: 0
          },
          {
            question: "Що виведе цей код?",
            code: "const add = a => b => a + b;\nconsole.log(add(3)(7));",
            options: ["Error", "37", "10", "undefined"],
            correct: 2
          },
          {
            question: "Що виведе цей код?",
            code: "async function getData() {\n  return 42;\n}\nconsole.log(typeof getData());",
            options: ["'number'", "'object'", "'promise'", "'undefined'"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "async function test() {\n  const result = await Promise.resolve('done');\n  return result;\n}\ntest().then(console.log);",
            options: ["undefined", "'done'", "Promise", "Error"],
            correct: 1
          },
          {
            question: "Що таке мемоізація?",
            code: null,
            options: [
              "Збереження функції в пам'яті",
              "Кешування результатів функції для уникнення повторних обчислень",
              "Копіювання функції",
              "Запам'ятовування порядку аргументів"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "function* gen() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\nconst g = gen();\nconsole.log(g.next().value, g.next().value);",
            options: ["1 1", "1 2", "undefined undefined", "Error"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const compose = (f, g) => x => f(g(x));\nconst double = x => x * 2;\nconst inc = x => x + 1;\nconsole.log(compose(double, inc)(5));",
            options: ["11", "12", "10", "Error"],
            correct: 1
          },
          {
            question: "Що робить .bind()?",
            code: null,
            options: [
              "Викликає функцію з певним this",
              "Створює нову функцію з прив'язаним this",
              "Видаляє this з функції",
              "Прив'язує функцію до DOM-елемента"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
            options: ["0, 1, 2", "3, 3, 3", "undefined, undefined, undefined", "Error"],
            correct: 1
          }
        ]
      }
    ]
  },

  objects: {
    id: 'objects',
    name: "Об'єкти",
    icon: '🧩',
    color: '#ffd700',
    levels: [
      {
        name: 'Початковий',
        desc: "Створення, доступ, keys/values, for...in",
        questions: [
          {
            question: "Як створити об'єкт в JavaScript?",
            code: null,
            options: [
              "const obj = []",
              "const obj = {}",
              "const obj = ()",
              "const obj = new Array()"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const user = { name: 'Anna', age: 20 };\nconsole.log(user.name);",
            options: ["'name'", "'Anna'", "undefined", "Error"],
            correct: 1
          },
          {
            question: "Як отримати значення через змінну-ключ?",
            code: "const key = 'age';\nconst user = { name: 'Bob', age: 25 };",
            options: ["user.key", "user[key]", "user{key}", "user->key"],
            correct: 1
          },
          {
            question: "Що виведе Object.keys()?",
            code: "const car = { brand: 'BMW', year: 2024 };\nconsole.log(Object.keys(car));",
            options: ["['BMW', 2024]", "['brand', 'year']", "{ brand, year }", "2"],
            correct: 1
          },
          {
            question: "Як додати нову властивість до об'єкта?",
            code: "const obj = { a: 1 };",
            options: ["obj.add('b', 2)", "obj.b = 2", "obj.push(b: 2)", "obj.insert('b', 2)"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const obj = { x: 10, y: 20, z: 30 };\nconsole.log(Object.values(obj));",
            options: ["['x', 'y', 'z']", "[10, 20, 30]", "{ 10, 20, 30 }", "60"],
            correct: 1
          },
          {
            question: "Як видалити властивість об'єкта?",
            code: null,
            options: ["obj.remove('key')", "delete obj.key", "obj.key = delete", "obj.drop('key')"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const user = { name: 'Anna' };\nconsole.log('name' in user);\nconsole.log('age' in user);",
            options: ["true, true", "true, false", "false, true", "'Anna', undefined"],
            correct: 1
          },
          {
            question: "Що таке метод об'єкта?",
            code: null,
            options: [
              "Будь-яка властивість об'єкта",
              "Функція, яка є властивістю об'єкта",
              "Ключ об'єкта",
              "Вкладений об'єкт"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const person = {\n  name: 'Bob',\n  address: { city: 'Kyiv', country: 'UA' }\n};\nconsole.log(person.address.city);",
            options: ["'address'", "'Kyiv'", "{ city: 'Kyiv' }", "undefined"],
            correct: 1
          }
        ]
      },
      {
        name: 'Середній',
        desc: 'Spread, деструктуризація, JSON, this',
        questions: [
          {
            question: "Що виведе цей код?",
            code: "const a = { x: 1, y: 2 };\nconst b = { ...a, z: 3 };\nconsole.log(b);",
            options: ["{ x: 1, y: 2 }", "{ z: 3 }", "{ x: 1, y: 2, z: 3 }", "Error"],
            correct: 2
          },
          {
            question: "Що виведе цей код?",
            code: "const { name, age } = { name: 'Anna', age: 20, city: 'Kyiv' };\nconsole.log(name, age);",
            options: ["'Anna' 20", "undefined undefined", "'name' 'age'", "Error"],
            correct: 0
          },
          {
            question: "Що виведе JSON.stringify()?",
            code: "const obj = { a: 1, b: 'hello' };\nconsole.log(typeof JSON.stringify(obj));",
            options: ["'object'", "'string'", "'json'", "'array'"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const obj = { a: 1, b: 2 };\nconst entries = Object.entries(obj);\nconsole.log(entries);",
            options: ["[['a', 1], ['b', 2]]", "['a', 'b']", "[1, 2]", "{ a: 1, b: 2 }"],
            correct: 0
          },
          {
            question: "Що таке shorthand properties?",
            code: "const name = 'Anna';\nconst age = 20;\nconst user = { name, age };",
            options: [
              "Це скорочення для { name: name, age: age }",
              "Це масив зі змінних",
              "Це деструктуризація",
              "Це помилка синтаксису"
            ],
            correct: 0
          },
          {
            question: "Що виведе цей код?",
            code: "const a = { x: 1 };\nconst b = a;\nb.x = 99;\nconsole.log(a.x);",
            options: ["1", "99", "undefined", "Error"],
            correct: 1
          },
          {
            question: "Як створити справжню копію об'єкта?",
            code: null,
            options: [
              "const copy = obj",
              "const copy = Object.assign({}, obj)",
              "const copy = obj.clone()",
              "const copy = obj.copy()"
            ],
            correct: 1
          },
          {
            question: "Що таке computed property name?",
            code: "const key = 'color';\nconst obj = { [key]: 'red' };",
            options: [
              "Обчислюване ім'я властивості зі змінної",
              "Властивість, що обчислюється автоматично",
              "Приватна властивість",
              "Це помилка синтаксису"
            ],
            correct: 0
          },
          {
            question: "Чому {} !== {}?",
            code: null,
            options: [
              "Тому що об'єкти порівнюються за посиланням, а не за вмістом",
              "Тому що {} — це не об'єкт",
              "Це баг JavaScript",
              "Тому що === не працює з об'єктами"
            ],
            correct: 0
          },
          {
            question: "Що виведе цей код?",
            code: "const obj = { a: 1, b: 2, c: 3 };\nconst { a, ...rest } = obj;\nconsole.log(rest);",
            options: ["{ a: 1 }", "{ b: 2, c: 3 }", "[2, 3]", "Error"],
            correct: 1
          }
        ]
      },
      {
        name: 'Просунутий',
        desc: 'Class, прототипи, Proxy, приватні поля',
        questions: [
          {
            question: "Що виведе цей код?",
            code: "class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    return `${this.name} makes a sound`;\n  }\n}\nconst dog = new Animal('Rex');\nconsole.log(dog.speak());",
            options: ["'Rex'", "'Rex makes a sound'", "undefined", "Error"],
            correct: 1
          },
          {
            question: "Що таке прототипне наслідування?",
            code: null,
            options: [
              "Копіювання всіх властивостей з одного об'єкта в інший",
              "Об'єкт може наслідувати властивості та методи від іншого об'єкта через ланцюжок прототипів",
              "Створення класів як в Java",
              "Імпорт модулів"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "class Counter {\n  #count = 0;\n  inc() { this.#count++; }\n  get() { return this.#count; }\n}\nconst c = new Counter();\nc.inc(); c.inc();\nconsole.log(c.get());",
            options: ["0", "2", "undefined", "Error — # не валідний"],
            correct: 1
          },
          {
            question: "Що робить static метод?",
            code: null,
            options: [
              "Метод, доступний тільки на класі, а не на екземплярі",
              "Метод, що не може змінювати this",
              "Метод, що виконується один раз",
              "Приватний метод"
            ],
            correct: 0
          },
          {
            question: "Що виведе цей код?",
            code: "const obj = Object.freeze({ x: 1, nested: { y: 2 } });\nobj.nested.y = 99;\nconsole.log(obj.nested.y);",
            options: ["2", "99", "undefined", "Error"],
            correct: 1
          },
          {
            question: "Чому freeze не захистив вкладений об'єкт?",
            code: null,
            options: [
              "Object.freeze() робить тільки поверхневу заморозку",
              "freeze не працює з вкладеними об'єктами",
              "Це баг JavaScript",
              "Потрібно використовувати Object.deepFreeze()"
            ],
            correct: 0
          },
          {
            question: "Що таке Proxy?",
            code: null,
            options: [
              "Об'єкт-обгортка для перехоплення операцій з іншим об'єктом",
              "Серверний проксі в JavaScript",
              "Клон об'єкта",
              "Асинхронний об'єкт"
            ],
            correct: 0
          },
          {
            question: "Що виведе цей код?",
            code: "const handler = {\n  get(target, prop) {\n    return prop in target ? target[prop] : 'не знайдено';\n  }\n};\nconst obj = new Proxy({ a: 1 }, handler);\nconsole.log(obj.b);",
            options: ["undefined", "'не знайдено'", "null", "Error"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "class Parent {\n  greet() { return 'Hello'; }\n}\nclass Child extends Parent {\n  greet() { return super.greet() + ' World'; }\n}\nconsole.log(new Child().greet());",
            options: ["'Hello'", "'Hello World'", "'World'", "Error"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const sym = Symbol('id');\nconst obj = { [sym]: 42, name: 'test' };\nconsole.log(Object.keys(obj));",
            options: ["['Symbol(id)', 'name']", "['name']", "['id', 'name']", "[]"],
            correct: 1
          }
        ]
      }
    ]
  },

  loops: {
    id: 'loops',
    name: 'Цикли та умови',
    icon: '🔄',
    color: '#69f0ae',
    levels: [
      {
        name: 'Початковий',
        desc: 'if/else, for, while, break, continue',
        questions: [
          {
            question: "Що виведе цей код?",
            code: "const x = 10;\nif (x > 5) {\n  console.log('більше');\n} else {\n  console.log('менше');\n}",
            options: ["'більше'", "'менше'", "10", "Error"],
            correct: 0
          },
          {
            question: "Скільки разів виконається цей цикл?",
            code: "for (let i = 0; i < 5; i++) {\n  console.log(i);\n}",
            options: ["4", "5", "6", "Нескінченно"],
            correct: 1
          },
          {
            question: "Що робить break?",
            code: null,
            options: [
              "Пропускає поточну ітерацію",
              "Повністю зупиняє цикл",
              "Перезапускає цикл",
              "Видаляє змінну циклу"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "for (let i = 0; i < 5; i++) {\n  if (i === 3) break;\n  console.log(i);\n}",
            options: ["0 1 2 3", "0 1 2", "0 1 2 3 4", "3"],
            correct: 1
          },
          {
            question: "Що робить continue?",
            code: null,
            options: [
              "Зупиняє цикл",
              "Пропускає поточну ітерацію і переходить до наступної",
              "Продовжує виконання після циклу",
              "Перезапускає цикл з початку"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "let count = 0;\nwhile (count < 3) {\n  count++;\n}\nconsole.log(count);",
            options: ["0", "2", "3", "4"],
            correct: 2
          },
          {
            question: "Що виведе цей код?",
            code: "const arr = ['a', 'b', 'c'];\nfor (const item of arr) {\n  console.log(item);\n}",
            options: ["0 1 2", "a b c", "'a' 'b' 'c'", "Error"],
            correct: 1
          },
          {
            question: "Яка різниця між > та >=?",
            code: null,
            options: [
              "> — строго більше, >= — більше або дорівнює",
              "Різниці немає",
              "> працює з числами, >= — з рядками",
              ">= — це подвійне порівняння"
            ],
            correct: 0
          },
          {
            question: "Що виведе цей код?",
            code: "const x = 5;\nconsole.log(x > 3 && x < 10);",
            options: ["true", "false", "5", "Error"],
            correct: 0
          },
          {
            question: "Що виведе цей код?",
            code: "for (let i = 1; i <= 3; i++) {\n  for (let j = 1; j <= 2; j++) {\n    if (i === 2) break;\n  }\n}\nconsole.log('done');",
            options: ["Error", "'done'", "Нескінченний цикл", "undefined"],
            correct: 1
          }
        ]
      },
      {
        name: 'Середній',
        desc: 'switch, do...while, for...in, тернарний оператор',
        questions: [
          {
            question: "Що виведе цей код?",
            code: "const day = 'Monday';\nswitch (day) {\n  case 'Monday': console.log('Work'); break;\n  case 'Sunday': console.log('Rest'); break;\n  default: console.log('Other');\n}",
            options: ["'Work'", "'Rest'", "'Other'", "Error"],
            correct: 0
          },
          {
            question: "Що станеться без break у switch?",
            code: "switch (1) {\n  case 1: console.log('A');\n  case 2: console.log('B');\n  case 3: console.log('C');\n}",
            options: ["Тільки A", "A потім B потім C", "Error", "A потім B"],
            correct: 1
          },
          {
            question: "Чим do...while відрізняється від while?",
            code: null,
            options: [
              "Нічим — це одне й те саме",
              "do...while виконується мінімум один раз",
              "do...while швидший",
              "do...while не має умови"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "let i = 10;\ndo {\n  console.log(i);\n  i++;\n} while (i < 10);",
            options: ["Нічого", "10", "10 11 12...", "Error"],
            correct: 1
          },
          {
            question: "Що виведе for...in для об'єкта?",
            code: "const obj = { a: 1, b: 2 };\nfor (const key in obj) {\n  console.log(key);\n}",
            options: ["1 2", "a b", "a: 1 b: 2", "[a, b]"],
            correct: 1
          },
          {
            question: "Що виведе тернарний оператор?",
            code: "const age = 18;\nconst status = age >= 18 ? 'adult' : 'minor';\nconsole.log(status);",
            options: ["'minor'", "'adult'", "true", "18"],
            correct: 1
          },
          {
            question: "Коли краще використовувати forEach замість for?",
            code: null,
            options: [
              "Завжди — forEach швидший",
              "Коли потрібен break",
              "Коли потрібно просто пройтися по масиву без break/continue",
              "forEach застарів, використовуй тільки for"
            ],
            correct: 2
          },
          {
            question: "Як уникнути нескінченного циклу?",
            code: null,
            options: [
              "Завжди використовувати for замість while",
              "Переконатися що умова циклу стане false",
              "Додати setTimeout",
              "Використовувати тільки forEach"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const value = null;\nconsole.log(value ?? 'default');",
            options: ["null", "'default'", "undefined", "false"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const nums = [1, 2, 3, 4, 5];\nconst found = nums.find(n => n > 3);\nconsole.log(found);",
            options: ["[4, 5]", "4", "3", "true"],
            correct: 1
          }
        ]
      },
      {
        name: 'Просунутий',
        desc: 'Ітератори, генератори, for await, reduce',
        questions: [
          {
            question: "Що таке ітератор у JavaScript?",
            code: null,
            options: [
              "Цикл for",
              "Об'єкт з методом next(), що повертає {value, done}",
              "Масив з індексами",
              "Функція-генератор"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "function* range(start, end) {\n  for (let i = start; i <= end; i++) {\n    yield i;\n  }\n}\nconsole.log([...range(1, 4)]);",
            options: ["[1, 4]", "[1, 2, 3, 4]", "[1, 2, 3]", "Error"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const nums = [1, 2, 3, 4, 5];\nconst sum = nums.reduce((acc, n) => {\n  if (n % 2 === 0) return acc + n;\n  return acc;\n}, 0);\nconsole.log(sum);",
            options: ["15", "6", "9", "2"],
            correct: 1
          },
          {
            question: "Як зробити об'єкт ітерабельним?",
            code: null,
            options: [
              "Додати метод .iterate()",
              "Реалізувати Symbol.iterator",
              "Успадкувати від Array",
              "Використати Object.iterate()"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const arr = Array.from({ length: 5 }, (_, i) => i * i);\nconsole.log(arr);",
            options: ["[0, 1, 2, 3, 4]", "[0, 1, 4, 9, 16]", "[1, 4, 9, 16, 25]", "Error"],
            correct: 1
          },
          {
            question: "Що таке guard clause?",
            code: null,
            options: [
              "Захист від XSS-атак",
              "Ранній вихід з функції при невалідних умовах",
              "Перевірка типів TypeScript",
              "try/catch блок"
            ],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const result = [1, 2, 3]\n  .filter(n => n > 1)\n  .reduce((acc, n) => acc * n, 1);\nconsole.log(result);",
            options: ["6", "2", "5", "3"],
            correct: 0
          },
          {
            question: "Що виведе short-circuit evaluation?",
            code: "const name = '' || 'Anonymous';\nconst name2 = '' ?? 'Anonymous';\nconsole.log(name, name2);",
            options: ["'' ''", "'Anonymous' 'Anonymous'", "'Anonymous' ''", "'' 'Anonymous'"],
            correct: 2
          },
          {
            question: "Що виведе цей код?",
            code: "function process(x) {\n  if (!x) return 'empty';\n  if (x < 0) return 'negative';\n  return x * 2;\n}\nconsole.log(process(0));",
            options: ["0", "'empty'", "'negative'", "NaN"],
            correct: 1
          },
          {
            question: "Що виведе цей код?",
            code: "const obj = {\n  *[Symbol.iterator]() {\n    yield 'a';\n    yield 'b';\n    yield 'c';\n  }\n};\nconsole.log([...obj]);",
            options: ["Error", "['a', 'b', 'c']", "[undefined]", "{ a, b, c }"],
            correct: 1
          }
        ]
      }
    ]
  }
};
