# Playwright 🎭

## O projekcie

Jest to *demo* projekt oparty na frameworku **Playwirght**, służący do tworzenia i przeprowadzania testów automatycznych. Obecnie zawiera parę testów API strony *Pet Store* (testy endpointu `/v2/store/order/`) oraz parę testów API serwisu ClickUp, w zależności od brancha.

## Uruchomienie projektu

### Wymagania

Do uruchomienia projektu trzeba zainstalować:

- nodejs
- Java 8 lub nowsza (wymagana przez narzędzie *Allure* do generowania raportów)

### Instalacja

1. Pobierz (sklonuj) niniejsze repozytorium do lokalnego folderu
2. Przejdź do pobranego katalogu projektu
3. Przełącz się na odpowiedni branch (polecenie `git checkout <nazwa_brancza>`)
4. Zainstaluj wymagane biblioteki i zależności (polecenie `npm install`, zainstaluje to m.in. Playwrighta)
5. Zainstaluj *przeglądarki Playwright'a* (polecenie `npx playwright install`; Playwright posiada własne implementacje przeglądarek, które są wykorzystywane do testów, również testów API)

### Przed uruchomieniem

- Odczyt danych wrażliwych w projekcie, takich jak dane logowania (login i hasło), odbywa się z wykorzystaniem narzędzia `dotenv` - dane są odczytywane z pliku `.env` znajdującego się w podstawowym folderze projektu. Plik ten ze względów bezpieczeństwa jest ignorowany przez git i nie znajduje się w projekcie. Trzeba dodać go z innego źródła.

### Uruchomienie

Najważniejsze ustawienia znajdują się w pliku `playwright.config.ts`. Tam można ustawić np. wykorzystywane przeglądarki, czy bazowy adres URL. Szczegóły ustawień można znaleźć w dokumentacji Playwrighta. W obecnej wersji niniejszego projektu włączona jest tylko przeglądarka Edge, z jednym workerem (czyli uruchamia jeden test na raz).

Podstawowa komenda do uruchomienia testów to:

    npx playwright test

Może ona przyjmować różne argumenty i parametry - szczegóły znajdują się w dokumentacji Playwrighta.

W pliku `package.json`, w polu `scripts` znajdują się *predefiniowane* skrypty. Są to aliasy dłuższych konfiguracji komend uruchamiających. Należy je podać jako argument komendy `npx run`, i tak jest możliwe:

- Uruchomienie wszystkich testów zawierające w nazwie frazę `@api`:
    
        npm run test:api

<br/>
        
- Uruchomienie wszystkich testów zawierających w nazwie frazę `test:action-log`:

        npm run test:actionLog


<br/>
        
- Wygenerowanie raportu Allure do osobnego pliku (domyślnie raport pojawi się w lokalizacji `./allure-report/index.html`)

        npm run allure-report

<br/>
        
- Wygenerowanie raportu Allure jako "serwer" (wygenerowany raport zostanie otworzony automatycznie w domyślnej przeglądarce, nie będzie osobnym plikiem):

        npm run show-allure-report

<br/>
        
- Uruchomienie testów z podaniem taga `<nazwa_taga>` (zostaną uruchomione tylko te testy, które mają podaną frazę w nazwie; obecnie możliwe jest podanie tylko jednego taga):

        npm run test --tag='<nazwa_taga>'

    Na przykład uruchomienie komendy `npm run test --tag='@examination'` uruchomi tylko te testy, w których nazwie znajduje się fraza `@examination`. Jeżeli podana fraza nie znajdzie się w nazwie któregokolwiek testu, nic się nie uruchomi.

<br/>
        
**❗Uwaga** <br/>W przypadku dwóch pierwszych komend, zmiana ich treści nie wywoła uruchomienia innych testów, np. komenda `npm run test:gui` nie zostanie uruchomiona, bo nie została *na sztywno* zapisana w pliku `package.json`. Komendy te są wciąż w fazie rozwojowej.

