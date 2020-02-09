import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import Vuex from "vuex";
import App from "./App.vue";
import DomainList from "./components/DomainList.vue";
import DomainView from "./components/DomainView.vue";

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    items: {
      prefix: [],
      sufix: []
    },
    domains: []
  },
  mutations: {
    addItem(state, payload) {
      const { item, newItem } = payload;
      state.items[item.type].push(newItem);
    },
    deleteItem(state, payload) {
      const { item } = payload;
      state.items[item.type].splice(state.items[item.type].indexOf(item), 1);
    },
    setItems(state, payload) {
      const { type, items } = payload;
      state.items[type] = items;
    }
  },
  actions: {
    async addItem(context, payload) {
      const item = payload;
      axios({
        url: "http://localhost:3000",
        method: "post",
        data: {
          query: `
            mutation ($item: ItemInput){
              newItem: saveItem(item: $item){
                id
                type
                description
              }
            }
        `,
          variables: {
            item
          }
        }
      })
        .then(res => {
          const { data } = res.data;
          const { newItem } = data;

          context.commit("addItem", { item, newItem });
          context.dispatch("generateDomains");
        })
        .catch(error => this.log(error));
    },
    async deleteItem(context, payload) {
      const item = payload;
      axios({
        url: "http://localhost:3000",
        method: "post",
        data: {
          query: `
            mutation ($id: Int) {
              deleted: deleteItem(id: $id)
            }
          `,
          variables: {
            id: item.id
          }
        }
      }).then(() => {
        context.commit("deleteItem", { item });
        context.dispatch("generateDomains");
      });
    },
    async getItems(context, payload) {
      const type = payload;
      return axios({
        url: "http://localhost:3000",
        method: "post",
        data: {
          query: `
            query ($type: String){

              items (type: $type){
                id
                type
                description
              }
        
          }
        `,
          variables: {
            type
          }
        }
      })
        .then(response => {
          const { data } = response.data;
          //console.log(response);
          context.commit("setItems", { type, items: data.items });
        })
        .catch(error => {
          console.log(error);
        });
    },
    async generateDomains(context) {
      axios({
        url: "http://localhost:3000",
        method: "post",
        data: {
          query: `
            mutation {
              domains: generateDomains{
                name
                checkout
                available
              }
            }
          `
        }
      }).then(res => {
        const query = res.data;
        context.state.domains = query.data.domains;
      });
    }
  }
});

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/domains",
      component: DomainList
    },
    {
      path: "/domains/:domain",
      component: DomainView,
      props: true
    }
  ]
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
