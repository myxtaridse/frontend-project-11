install:
	npm ci

run:
	npm run dev

build:
	npm run build

preview:
	npm run preview

lint:
	npx oxlint .

lint-fix:
	npx oxlint . --fix

fmt:
	npx oxfmt .

fmt-check:
	npx oxfmt . --check