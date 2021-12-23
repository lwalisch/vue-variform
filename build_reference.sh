npx typedoc --out docs/.vuepress/dist/reference src/variform/datatypes.ts
rm docs/.vuepress/dist/reference/index.html
mv docs/.vuepress/dist/reference/modules.html docs/.vuepress/dist/reference/index.html