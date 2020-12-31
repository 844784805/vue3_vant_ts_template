import { App } from 'vue'
import { NavBar } from 'vant'

const plugins = [NavBar]

const vant = {
  install: function (app: App<Element>) {
    plugins.forEach(item => {
      app.component(item.name, item)
    })
  }
}

export default vant
