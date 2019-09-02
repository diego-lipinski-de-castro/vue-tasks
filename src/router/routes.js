import Routes from 'vue-routisan'

Routes.setViewResolver(path => () => {
    path = path.replace(/\./g, '/')
    return import(`./../${path}`)
})

Routes.view('/', 'views.Dashboard')

export default Routes.all()