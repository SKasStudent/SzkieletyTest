// Baza pytań na egzamin (Szkielety programistyczne)
// correct = lista indeksów poprawnych odpowiedzi (liczone od 0)
// Pytania z wieloma poprawnymi odpowiedziami są obsługiwane automatycznie.
const QUESTIONS = [
  {
    id: "1",
    question: "Co będzie wartością stałej myFunction?",
    code: "const myFunction = () => ({ value: 'test' })",
    options: [
      "wartość w formacie JSON",
      "wartość w formacie JSX",
      "wartość 'test' zawarta w zmiennej value",
      "obiekt"
    ],
    correct: [3]
  },
  {
    id: "2",
    question: "Silniki szablonów, które można użyć w szkielecie Express:",
    options: ["EJS", "Pug", "Handlebars", "żaden z powyższych"],
    correct: [0, 1, 2]
  },
  {
    id: "3",
    question: "Oprogramowanie pośredniczące w Express realizuje następujące zadania:",
    options: [
      "może wywoływać kolejne funkcje oprogramowania pośredniczącego",
      "może dokonywać zmian w obiektach żądania i odpowiedzi",
      "może kończyć cykl żądanie-odpowiedź",
      "przekształca kod JavaScript korzystający z najnowszych możliwości języka na kod, który będzie wykonywany w starszych przeglądarkach"
    ],
    correct: [0, 1, 2]
  },
  {
    id: "4",
    question: "Wskaż cechy Virtual DOM:",
    options: [
      "bezpośrednio modyfikuje HTML",
      "szybko się aktualizuje",
      "tworzy nowy DOM, jeśli zostanie zaktualizowany",
      "występuje duże marnotrawstwo pamięci"
    ],
    correct: [1]
  },
  {
    id: "5",
    question: "Czym jest useState w poniższej konstrukcji?",
    code: "const [state, setState] = useState()",
    options: ["hookiem", "propsem", "stanem", "konstruktorem"],
    correct: [0]
  },
  {
    id: "6",
    question: "Wskaż nieprawdziwe stwierdzenia opisujące platformę Node:",
    options: [
      "domyślnie jest jednowątkowa",
      "jest środowiskiem wykonawczym JavaScript",
      "powstała w celu ułatwienia programowania synchronicznego",
      "jest środowiskiem wieloplatformowym"
    ],
    correct: [2]
  },
  {
    id: "7",
    question: "Wybierz prawidłowe określenia. Plik package.json:",
    options: [
      "jest narzędziem do automatycznego restartowania programu po wprowadzeniu zmian w kodzie",
      "można utworzyć samodzielnie lub za pomocą polecenia: npm init",
      "zawiera szereg zależności niezbędnych do działania aplikacji, które należy pobrać za pomocą polecenia npm install",
      "zawiera informacje o projekcie: wersja, opis, autorzy"
    ],
    correct: [1, 2, 3]
  },
  {
    id: "8",
    question: "Główny komponent w React to:",
    options: ["App", "JSX", "index", "Main"],
    correct: [0]
  },
  {
    id: "9",
    question: "Wskaż polecenie, które uruchomi kod zawarty w pliku hello.js:",
    options: ["npm hello.js", "node hello", "npm hello", "npx hello.js"],
    correct: [1]
  },
  {
    id: "10",
    question: "W instrukcji:",
    code: 'import React, { Component } from "react"',
    options: [
      "React jest możliwością nazwaną",
      "Component jest domyślną możliwością nazwaną",
      "React jest domyślną możliwością nazwaną",
      "Component jest możliwością nazwaną"
    ],
    correct: [2, 3]
  },
  {
    id: "11",
    question: "Hooki w React:",
    options: [
      "wymagają deklaracji konstruktora",
      "muszą być wywoływane na najwyższym poziomie, nie można ich wywoływać wewnątrz zagnieżdżonych funkcji, pętli, warunków",
      "występują w komponentach klasowych",
      "wymagają użycia słowa kluczowego this w deklaracji lub modyfikacji stanu"
    ],
    correct: [1]
  },
  {
    id: "13",
    question: "Wskaż prawidłowe określenia dla REST:",
    options: [
      "API utworzone wg zasad REST nazywane jest RESTful API",
      "REST jest protokołem",
      "REST jest standardem",
      "REST jest zbiorem dobrych praktyk tworzenia architektury rozproszonych aplikacji"
    ],
    correct: [0, 3]
  },
  {
    id: "14",
    question: "Które fragmenty kodu JSX są prawidłowe?",
    options: [
      "return (<div><div>Pierwszy element</div><div>Drugi element</div></div>)",
      "return (<div>Pierwszy element</div><div>Drugi element</div>)  (brak wrappera)",
      "return (<table><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table>)",
      'return (<button class="btn btn-warning">Naciśnij</button>)  (powinno być className)'
    ],
    correct: [0, 2]
  },
  {
    id: "15",
    question: "Wskaż prawidłowe stwierdzenia dotyczące formatu JSON:",
    options: [
      "odpowiedź w formacie JSON ma znacznie większą liczbę znaków niż XML i w związku z tym powoduje większy ruch sieciowy i dłuższy czas transferu danych",
      "nie sprawdza się w opisie i serializacji danych strukturalnych",
      "obsługuje typy strukturalne object i array",
      "lekki, tekstowy, przyjazny format dla języka JavaScript",
      "używa tagów do budowy struktury"
    ],
    correct: [2, 3]
  },
  {
    id: "16",
    question: "Które sformułowania odnośnie MongoDB są nieprawdziwe?",
    options: [
      "MongoDB przechowuje dane w dokumentach i kolekcjach",
      "MongoDB to baza nierelacyjna",
      "językiem MongoDB jest JavaScript",
      "dokumenty w kolekcji nie posiadają unikalnych identyfikatorów",
      "MongoDB przechowuje dane w rekordach i tabelach"
    ],
    correct: [2, 3, 4]
  },
  {
    id: "17",
    question: "W skład stosu MERN wchodzą następujące technologie:",
    options: [
      "MongoDB, Express, React, Node",
      "Microsoft SQL, Exit, Redux, Node",
      "MsSQL, Electron, Ruby on Rails, Node",
      "MySQL, Elixir, Router, Node"
    ],
    correct: [0]
  },
  {
    id: "18",
    question: "Wskaż wynik działania kodu:",
    code: "[2, 3, 4].map(x => x * 2)",
    options: ["[4, 6, 8]", "18", "24", "[4, 9, 16]"],
    correct: [0]
  },
  {
    id: "19",
    question: "Wskaż szablon ciągu tekstowego:",
    options: [
      "`Połowa liczby 20 wynosi ${20 / 2}`",
      "{Połowa liczby 20 wynosi ${20 / 2}}",
      "'Połowa liczby 20 wynosi ${20 / 2}'",
      '"Połowa liczby 20 wynosi ${20 / 2}"'
    ],
    correct: [0]
  },
  {
    id: "20",
    question: "Jakie są rodzaje komponentów w React?",
    options: ["bezstanowe", "stanowe", "funkcjonalne", "klasowe"],
    correct: [0, 1, 2, 3]
  },
  {
    id: "21",
    question: "Punktem wejścia do aplikacji React jest:",
    options: ["index.js", "App.js", "registerServiceWorker.js", "main.js"],
    correct: [0]
  },
  {
    id: "22",
    question: "Co należy użyć, aby przekazać dane z zewnątrz do komponentu?",
    options: ["setState", "funkcji render z argumentami", "BrowserRouter", "props"],
    correct: [3]
  },
  {
    id: "23",
    question: "Jaka liczba elementów może być zwrócona przez prawidłowy komponent Reacta?",
    options: [
      "1 (komponent musi zwracać jeden główny element)",
      "2",
      "3",
      "5"
    ],
    correct: [0]
  },
  {
    id: "24",
    question: "Która z poniższych metod żąda od serwera zaakceptowania danych zawartych w żądaniu modyfikacji istniejącego obiektu identyfikowanego przez URI?",
    options: ["PUT", "GET", "DELETE", "POST"],
    correct: [0]
  },
  {
    id: "25",
    question: "Wskaż wynik działania kodu:",
    code: "[1, 2, 3].map(x => x * x * x)",
    options: ["[1, 8, 27]", "[3, 6, 9]", "[1, 4, 9]", "[1, 4, 6]"],
    correct: [0]
  },
  {
    id: "26",
    question: "Wskaż niepoprawne stwierdzenie:",
    options: [
      "async i await wspomagają wykonywanie operacji asynchronicznych",
      "async i await można dodawać do stałych i zmiennych",
      "async informuje JavaScript, że funkcja korzysta z obietnic",
      "await jest używane podczas wywołania funkcji"
    ],
    correct: [1]
  },
  {
    id: "27",
    question: "Wskaż nieprawdziwe stwierdzenie opisujące platformę Node:",
    options: [
      "jest domyślnie wielowątkowa",
      "powstała w celu ułatwienia programowania asynchronicznego",
      "jest środowiskiem wieloplatformowym",
      "możliwe jest używanie synchronicznych wersji funkcji"
    ],
    correct: [0]
  },
  {
    id: "28",
    question: "Wskaż sformułowanie nieprawidłowe. Plik package.json:",
    options: [
      "jest narzędziem do automatycznego restartowania programu po wprowadzeniu zmian w kodzie",
      'można utworzyć "ręcznie"',
      "zawiera informacje o projekcie: wersja, opis, autorzy itd. oraz o zależnościach, jakie zostały wykorzystane do stworzenia projektu",
      "można utworzyć za pomocą polecenia npm init"
    ],
    correct: [0]
  },
  {
    id: "29",
    question: "Które stwierdzenie dotyczące szkieletu programistycznego Express nie jest prawdziwe:",
    options: [
      "Mocno obciążone witryny oparte na szkielecie Express cechują się niską wydajnością",
      "Express to szkielet działający po stronie serwera",
      "Express upraszcza proces budowania aplikacji internetowej w porównaniu do Node",
      "Express odchodzi od wbudowanych komponentów na rzecz konfigurowalnej warstwy pośredniczącej"
    ],
    correct: [0]
  },
  {
    id: "29.1",
    question: "Wskaż prawdziwe stwierdzenia dotyczące szkieletu Express:",
    options: [
      "Express odchodzi od wbudowanych komponentów na rzecz konfigurowalnej warstwy pośredniczącej",
      "Express to szkielet działający po stronie serwera",
      "Express w porównaniu do Node upraszcza proces budowania aplikacji internetowej",
      "Mocno obciążone witryny oparte na szkielecie Express cechują się niską wydajnością"
    ],
    correct: [0, 1, 2]
  },
  {
    id: "30",
    question: "Wywołanie oprogramowania pośredniczącego odbywa się za pomocą metody:",
    options: ["app.get", "app.post", "app.use", "app.listen"],
    correct: [2]
  },
  {
    id: "31",
    question: "Biblioteka React została opracowana przez firmę:",
    options: ["Google", "Twitter", "Facebook", "Instagram"],
    correct: [2]
  },
  {
    id: "32",
    question: "W React programowanie odbywa się za pomocą:",
    options: ["małych modułów", "dużych modułów", "samodzielnych komponentów", "pakietów"],
    correct: [2]
  },
  {
    id: "33",
    question: "Wykonywane jest renderowanie listy przy użyciu metody map z języka JavaScript. Jaki element jest wymagany podczas renderowania każdego elementu listy?",
    options: ["id", "index", "key", "data"],
    correct: [2]
  },
  {
    id: "34",
    question: "Który hook umożliwia pobieranie danych przez aplikację klienta za pośrednictwem API?",
    options: ["useAxios", "useState", "useFeed", "useEffect"],
    correct: [3]
  },
  {
    id: "35",
    question: "Wskaż niepoprawne stwierdzenie dotyczące platformy Node:",
    options: [
      "Jest językiem programowania, a także frameworkiem",
      "Jest platformą open-source",
      "Jest to platforma działająca jako serwer www",
      "Wykonuje kod JavaScript poza przeglądarką"
    ],
    correct: [0, 2]
  },
  {
    id: "36",
    question: "Dobrą praktyką REST API, mówiącą, że każde wywołanie REST-owego API powinno zmieniać dany zasób maksymalnie jeden raz, nawet gdy jest wykonane wielokrotnie, jest:",
    options: [
      "idempotentność",
      "wersjonowanie",
      "stosowanie paginacji",
      "stosowanie metod HTTP zgodnie z przeznaczeniem"
    ],
    correct: [0]
  },
  {
    id: "37",
    question: "W jaki sposób można zmodyfikować tzw. propsy w React?",
    options: [
      "używając trybu STRICT",
      "używając destrukturyzacji",
      "nie można tego zrobić",
      "używając hooka useState"
    ],
    correct: [2]
  },
  {
    id: "38",
    question: "Który poziom dojrzałości REST API wg modelu Richardsona reprezentują adresy i czasowniki:",
    code: "POST http://localhost:56263/api/pictures\nGET  http://localhost:56263/api/pictures/1",
    options: ["0", "1", "2", "3"],
    correct: [2]
  },
  {
    id: "39",
    question: "Jakie elementy zawiera projekt Reacta?",
    options: [
      "wszystkie wymienione",
      "treści zastępcze",
      "kompletny zestaw narzędzi programistycznych",
      "podstawowy zestaw plików aplikacji"
    ],
    correct: [0]
  },
  {
    id: "40",
    question: "Kody odpowiedzi HTTP, które można zaobserwować w momencie, gdy stara zawartość została zastąpiona i przekierowana do nowej, rozpoczynają się od cyfry:",
    options: ["4", "2", "3", "5"],
    correct: [2]
  },
  {
    id: "41",
    question: "Czym jest biblioteka Puppeteer?",
    options: [
      "Sterowalną wersją przeglądarki Chrome działającą bez renderowania GUI",
      "Interaktywne środowisko Node i przeglądarki, umożliwiające pisanie kodu w JavaScript",
      "Narzędzie do analizy kodu do identyfikacji potencjalnych miejsc wystąpienia błędów",
      "Narzędzie do tworzenia prostego serwera www"
    ],
    correct: [0]
  },
  {
    id: "42",
    question: "Za pomocą jakiego słowa kluczowego w JavaScript deklaruje się zmienne?",
    options: ["int", "new", "let", "set"],
    correct: [2]
  },
  {
    id: "43",
    question: "Jaki będzie wynik wykonania poniższego kodu, gdy w polu adresu przeglądarki wpiszemy: http://localhost:3000/test?first=hello&second=world",
    code: "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res, next) => { req.message = req.query.first; next() })\napp.get('/test', (req, res, next) => { req.message = req.query.second; next() })\napp.post('/test', (req, res, next) => { req.message = req.query.first + ' ' + req.query.second; next() })\napp.use((req, res) => res.send(req.message))\napp.listen(3000)",
    options: ["world", "first=hello&second=world", "hello world", "hello"],
    correct: [0]
  },
  {
    id: "43.1",
    question: "To samo pytanie i kod, inny link: http://localhost:3000/?first=hello&second=world",
    code: "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res, next) => { req.message = req.query.first; next() })\napp.get('/test', (req, res, next) => { req.message = req.query.second; next() })\napp.post('/test', (req, res, next) => { req.message = req.query.first + ' ' + req.query.second; next() })\napp.use((req, res) => res.send(req.message))\napp.listen(3000)",
    options: ["world", "first=hello&second=world", "hello world", "hello"],
    correct: [3]
  },
  {
    id: "44",
    question: "Jaki będzie wynik wykonania poniższego kodu, gdy w polu adresu przeglądarki wpiszemy: localhost:3000/?first=hello&second=world",
    code: "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res, next) => { req.message = req.query.first; next() })\napp.get('/test1', (req, res, next) => { req.message = req.query.second; next() })\napp.get('/test2', (req, res, next) => { req.message = req.message + ' ' + req.query.first; next() })\napp.all('*', (req, res, next) => { req.message = req.message + ' ' + req.query.second; next() })\napp.use((req, res) => res.send(req.message))\napp.listen(3000)",
    options: ["world", "first=hello&second=world", "hello world", "hello"],
    correct: [2]
  },
  {
    id: "45",
    question: "/cars/get - jaki to poziom REST API?",
    options: ["Poziom 1", "Poziom 2", "Poziom 3", "Poziom 0"],
    correct: [0]
  },
  {
    id: "46",
    question: "Babel, JSX – wybierz prawidłowe zdania:",
    options: [
      "Babel przekształca treści JSX",
      "przekształca kod JavaScript korzystający z najnowszych możliwości języka na kod, który będzie wykonywany w starszych przeglądarkach",
      "Format ten nie obsługuje całego standardu HTML",
      "JSX - Format ten nie obsługuje całego standardu HTML",
      "Różnica pomiędzy HTML a JSX – atrybuty HTML takie jak class są zapisywane w JSX jako className",
      "Pliki JSX są przekształcane przez Babel na wywołania API React, dzięki czemu każdy element HTML jest przekształcany na wywołanie metody React.createElement"
    ],
    correct: [0, 1, 2, 3, 4, 5]
  },
  {
    id: "47",
    question: "Błąd serwera (błąd wewnętrzny serwera):",
    options: ["500", "404", "403", "400"],
    correct: [0]
  },
  {
    id: "48",
    question: "Co powinno znaleźć się wewnątrz nawiasów metody Array.map()?",
    options: [
      "nazwa drugiej tablicy, po której elementach będzie następowało iterowanie",
      "ciąg znaków określający co funkcja będzie wykonywała",
      "liczba określająca ile razy będzie wywoływana funkcja map",
      "funkcja zwrotna (ang. callback), która jest wywoływana raz dla każdego elementu tablicy"
    ],
    correct: [3]
  },
  {
    id: "49",
    question: "Czym jest REPL (ang. Read-Eval-Print-Loop)?",
    options: [
      "Wbudowany debugger Node",
      "Platforma testowa ogólnego przeznaczenia",
      "Interaktywne środowisko Node i przeglądarki umożliwiające pisanie kodu w JavaScript",
      "Narzędzie do automatycznej analizy pokrycia testami"
    ],
    correct: [2]
  },
  {
    id: "50",
    question: "Dla klucza głównego MongoDB używa:",
    options: ["wartości INT", "typu Array", "łańcucha STRING", "obiektu ObjectId"],
    correct: [3]
  },
  {
    id: "51",
    question: "Do znajdowania potencjalnych miejsc wystąpienia błędów, identyfikowania obszarów, które stwarzają ryzyko wystąpienia błędów lub wrażliwych konstrukcji służy:",
    options: ["moduł nodemon", "biblioteka puppeteer", "biblioteka jest", "narzędzie ESLint"],
    correct: [3]
  },
  {
    id: "52",
    question: "Idempotentność to dobra praktyka REST API oznaczająca, że...",
    options: [
      "do każdej aktualizacji zasobu należy stosować PUT - w przypadku nadpisywania całego obiektu i PATCH - w przypadku nadpisywania częściowego",
      "należy korzystać z nagłówków do wywołania meta-danych",
      "należy stosować paginację, gdy zwracana jest duża lista książek",
      "każde wywołanie REST-owego API powinno zmieniać dany zasób maksymalnie jeden raz, nawet gdy jest wykonywane wielokrotnie"
    ],
    correct: [3]
  },
  {
    id: "53",
    question: "Jaka biblioteka do wykonywania testów jest najczęściej kojarzona z Reactem?",
    options: ["Jest", "Chai", "Sinon", "Mocha"],
    correct: [0]
  },
  {
    id: "54",
    question: "Jaka jest poprawna składnia zapisu wyrażenia w JSX?",
    options: ["{ expression }", "{{ expression }}", "__expression", "[ expression ]"],
    correct: [0]
  },
  {
    id: "55",
    question: "Jaka jest rola middleware CORS (Cross-Origin Resource Sharing)?",
    options: [
      "parsowania ciała żądania HTTP",
      "do obsługi błędów na etapie rozwijania/debugowania aplikacji",
      "do uwierzytelniania za pomocą OAuth, OpenID i wielu innych",
      "włączenia mechanizmu pozwalającego serwerowi wskazać inne źródła niż jego własne"
    ],
    correct: [3]
  },
  {
    id: "56",
    question: "Jaki będzie wynik poniższego kodu?",
    code: "let sum = 0\nconst a = [1, 2, 3]\na.forEach(getSum)\nconsole.log(sum)\nfunction getSum(elem){ sum += elem }",
    options: ["2", "1", "0", "6"],
    correct: [3]
  },
  {
    id: "57",
    question: "Komponenty stanowe, Hooki – wybierz prawidłowe:",
    options: [
      "Komponenty ze stanem definiuje się przy użyciu klasy lub poprzez zastosowanie w komponentach funkcyjnych hooków",
      "Funkcja useState – stosowana do tworzenia danych stanu, jej argumentem jest początkowa wartość właściwości danych stanu",
      "Funkcja ta zwraca właściwość, za pomocą której można odczytać bieżącą wartość danych stanu oraz funkcję, która zmienia wartość tych danych stanu oraz wyzwala aktualizację aplikacji"
    ],
    correct: [0, 1, 2]
  },
  {
    id: "58",
    question: "Która z metod HTTP zwraca listę metod, które są dostępne na danym zasobie?",
    options: ["PATCH", "OPTIONS", "GET", "HEAD"],
    correct: [1]
  },
  {
    id: "59",
    question: "Która(e) metoda HTTP tworzy nowy zasób (jeśli on jeszcze nie istnieje) na podstawie ładunku podanego w treści żądania?",
    options: ["PATCH", "POST, PUT", "POST", "PUT"],
    correct: [1]
  },
  {
    id: "60",
    question: "Które polecenie służy do uruchomienia serwera MongoDB?",
    options: ["mongod", "mongo", "mongosh", "mongoserver"],
    correct: [0]
  },
  {
    id: "61",
    question: "Które z poniższych jest opartym na GUI narzędziem do debugowania w Node.js?",
    options: ["REPL", "Core node debugger", "Console", "Node Inspector"],
    correct: [3]
  },
  {
    id: "62",
    question: "Którego z poniższych elementów należy użyć do uzyskania dostępu do funkcji fetch() z elementu h1 w JSX?",
    options: ["<h1>{fetch()}</h1>", "<h1>${fetch}</h1>", "<h1>(fetch)</h1>", "<h1>${fetch{}}</h1>"],
    correct: [0]
  },
  {
    id: "63",
    question: "Który z poniższych NIE jest obiektem JS?",
    options: [
      'const obj = {name = "Jan}',
      'const obj = {name: "Jan"}',
      "const obj = {}",
      "const obj = new Object()"
    ],
    correct: [0]
  },
  {
    id: "64",
    question: "Na którym poziomie Richardsona jest dokumentacja API?",
    options: ["Poziom 3", "Poziom 2", "Poziom 1", "Poziom 0"],
    correct: [0]
  },
  {
    id: "65",
    question: "Najniższy poziom Reacta:",
    options: [
      "Elementy",
      "Komponenty",
      "Props",
      "Stan",
      "Lifecycle Methods (Metody cyklu życia)",
      "Hooki",
      "Context API",
      "Fragmenty"
    ],
    correct: [0]
  },
  {
    id: "66",
    question: "W jaki sposób pobrać pierwszy element z tablicy 'cars' przy użyciu destrukturyzacji tablicy?",
    options: [
      "const first = ['fiat','mazda','hunday']",
      "const [] = ['fiat','mazda','hunday']",
      "const {_first} = ['fiat','mazda','hunday']",
      "const [first] = ['fiat','mazda','hunday']"
    ],
    correct: [3]
  },
  {
    id: "67",
    question: "W jakim formacie przechowywane są dane w bazie MongoDB?",
    options: ["JSON", "YML", "BSON", "XML"],
    correct: [2]
  },
  {
    id: "68",
    question: "W REST API punkty końcowe powinny być zgrupowane jako ...",
    options: [
      "żadna odpowiedź nie jest prawidłowa",
      "rzeczowniki w liczbie pojedynczej wokół danych i obiektów",
      "rzeczowniki w liczbie mnogiej wokół danych i obiektów",
      "czasowniki wokół danych i obiektów"
    ],
    correct: [2]
  },
  {
    id: "69",
    question: "Wskaż nieprawidłowe stwierdzenie dotyczące MongoDB:",
    options: [
      "Jedynym wymaganiem jest to, że wszystkie dokumenty muszą mieć unikalny _id",
      "Wszystkie metody operują na kolekcji i przyjmują parametry jako obiekty JavaScript, które określają szczegóły operacji",
      "MongoDB nie wymaga definiowania schematu dla kolekcji",
      "W MongoDB używa się złączeń, aby połączyć kolekcje i otrzymać wynik z wielu kolekcji"
    ],
    correct: [3]
  },
  {
    id: "70",
    question: "Wskaż nieprawidłowe stwierdzenie:",
    options: [
      "API dostarcza informacji nie tylko o możliwości wykonania danej operacji, ale też o sposobie w jaki ją wykonać oraz rezultacie wykonania",
      "Za sprawą API aplikacje „rozmawiają” między sobą bez udziału użytkownika",
      "API jest interfejsem „software-to-software”",
      "API jest interfejsem użytkownika"
    ],
    correct: [3]
  },
  {
    id: "71",
    question: "Wskaż złą praktykę podczas konstruowania punktu końcowego URL:",
    options: [
      "DELETE /surveys/123",
      "POST /surveys/123",
      "GET /surveys/123/responses",
      "PUT /surveys/123"
    ],
    correct: [1]
  }
];
