const treeStr = `
|   .editorconfig
|   .eslintrc.cjs
|   .gitignore
|   .prettierrc.json
|   commitlint.config.js
|   deploy.sh
|   env.d.ts
|   index.html
|   package-lock.json
|   package.json
|   README.md
|   tsconfig.app.json
|   tsconfig.json
|   tsconfig.node.json
|   vite.config.ts
|
+---.github
|   ---workflows
|           main.yml
|
+---.husky
|   |   commit-msg
|   |   pre-commit
|   |
|   ---_
|           .gitignore
|           husky.sh
|
+---.vscode
|       extensions.json
|       settings.json
|
+---public
|       favicon.ico
|       login.png
|       xiaoxing.png
|
---src
    |   App.vue
    |   main.ts
    |
    +---assets
    |   +---css
    |   |       base.css
    |   |       dark.ts
    |   |       light.ts
    |   |       theme.css
    |   |
    |   +---img
    |   ---js
    |           package.json.ts
    |
    +---components
    |   |   index.ts
    |   |
    |   +---controlTableColumnsBtn
    |   |       ControlTableColumnsBtn.vue
    |   |
    |   +---customForm
    |   |       CustomForm.vue
    |   |       types.ts
    |   |
    |   +---echarts
    |   |       BaseECharts.vue
    |   |
    |   ---headerTabs
    |           HeaderTabs.vue
    |
    +---global
    |       index.ts
    |       registerProperties.ts
    |
    +---hooks
    |       useECharts.ts
    |       useNotification.ts
    |       useSwitchTheme.ts
    |
    +---layout
    |   |   LayoutFooter.vue
    |   |   LayoutHeader.vue
    |   |   LayoutMenu.vue
    |   |
    |   ---components
    |           Language.vue
    |           SwitchTheme.vue
    |           UserInfo.vue
    |
    +---locals
    |       en.ts
    |       index.ts
    |       zh.ts
    |
    +---router
    |   |   index.ts
    |   |   mapRoutes.ts
    |   |
    |   ---main
    |       +---analysis
    |       |       dashboard.ts
    |       |       overview.ts
    |       |
    |       +---product
    |       |       category.ts
    |       |       goods.ts
    |       |
    |       +---story
    |       |       chat.ts
    |       |       list.ts
    |       |
    |       ---system
    |               department.ts
    |               menu.ts
    |               role.ts
    |               user.ts
    |
    +---service
    |   |   config.ts
    |   |   index.ts
    |   |   request.ts
    |   |   type.ts
    |   |
    |   ---api
    |       |   index.ts
    |       |
    |       +---analysis
    |       |       index.ts
    |       |       types.ts
    |       |
    |       +---login
    |       |       index.ts
    |       |       types.ts
    |       |
    |       +---product
    |       |       index.ts
    |       |       types.ts
    |       |
    |       ---system
    |               index.ts
    |               types.ts
    |
    +---stores
    |       login.ts
    |       system.ts
    |       user.ts
    |
    +---utils
    |       cache.ts
    |       getRoute.ts
    |       httpErrorStatusHandle.ts
    |       init.ts
    |       mapToMenuChildID.ts
    |
    ---views
        +---login
        |   |   LoginBox.vue
        |   |
        |   ---components
        |           AccountForm.vue
        |           PhoneForm.vue
        |
        +---main
        |   |   Main.vue
        |   |
        |   +---analysis
        |   |   |   Dashboard.vue
        |   |   |   Overview.vue
        |   |   |
        |   |   ---components
        |   |           AddressSale.vue
        |   |           AmountList.vue
        |   |           CategoryCount.vue
        |   |           CategoryFavor.vue
        |   |           CategorySale.vue
        |   |
        |   +---product
        |   |       Category.vue
        |   |       config.ts
        |   |       Goods.vue
        |   |
        |   +---story
        |   |       Chat.vue
        |   |       List.vue
        |   |
        |   ---system
        |       |   config.ts
        |       |   Department.vue
        |       |   Menu.vue
        |       |   Role.vue
        |       |   types.ts
        |       |   User.vue
        |       |
        |       ---components
        |               AddRole.vue
        |               AddUser.vue
        |               config.ts
        |
        ---not-found
                404.vue
                `
export default treeStr
