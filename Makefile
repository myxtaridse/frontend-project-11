install:
	npm ci

lint:
	npx oxlint .

lint-fix:
	npx oxlint . --fix

fmt:
	npx oxfmt .

fmt-check:
	npx oxfmt . --check