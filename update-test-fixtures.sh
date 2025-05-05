#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix all test fixtures after updating the source code.
#
#  B. Usage
#
#    ./update-test-fixtures.sh
#
#---------

# Compile TypeScript
pnpm build

# Update fixtures
rm -r "tests/fixtures/my-app/output"
cp -r "tests/fixtures/my-app/input" "tests/fixtures/my-app/output"

./dist/bin/ember-codemod-sort-invocations.js \
  --root "tests/fixtures/my-app/output"

rm -r "tests/fixtures/my-v2-addon/output"
cp -r "tests/fixtures/my-v2-addon/input" "tests/fixtures/my-v2-addon/output"

./dist/bin/ember-codemod-sort-invocations.js \
  --root "tests/fixtures/my-v2-addon/output"
