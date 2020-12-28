import { App } from 'vue'
import { Button } from 'vant'

const plugins = [Button]

const vant = {
  install: function (app: App<Element>) {
    plugins.forEach(item => {
      app.component(item.name, item)
    })
  }
}

export default vant
