import IGIconButton from '../components/ui/IGIconButton.vue'
import IGIcon from '../components/ui/IGIcon.vue'
import IGSideDrawer from '../components/ui/IGSideDrawer.vue'
import IGToolbar from '../components/ui/IGToolbar.vue'
import IGList from '../components/ui/IGList.vue'
import IGMenuItem from '../components/ui/IGMenuItem.vue'
import IGListItem from '../components/ui/IGListItem.vue'
import IGInput from '../components/ui/IGInput.vue'
import IGPaper from '../components/ui/IGPaper.vue'
import IGProgressBar from '../components/ui/IGProgressBar.vue'

export default {
  install:
    function (Vue) {
      Vue.component('ig-iconbutton', IGIconButton)
      Vue.component('ig-icon', IGIcon)
      Vue.component('ig-sidedrawer', IGSideDrawer)
      Vue.component('ig-toolbar', IGToolbar)
      Vue.component('ig-list', IGList)
      Vue.component('ig-menuitem', IGMenuItem)
      Vue.component('ig-listitem', IGListItem)
      Vue.component('ig-input', IGInput)
      Vue.component('ig-paper', IGPaper)
      Vue.component('ig-progressbar', IGProgressBar)
    }
}
