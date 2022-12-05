install:
	npm i

publish: 
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest

test-coverage:

	npm test -- --coverage