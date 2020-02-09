<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md">
          <AppItemList
            title="Prefixos"
            type="prefix"
            :items="items.prefix"
            @addItem="addItem"
            @deleteItem="deleteItem"
          ></AppItemList>
        </div>
        <div class="col-md">
          <AppItemList
            title="Sufixos"
            type="sufix"
            :items="items.sufix"
            @addItem="addItem"
            @deleteItem="deleteItem"
          ></AppItemList>
        </div>
      </div>
      <br />
      <h5>
        Domínios
        <span class="badge badge-info">{{ domains.length }}</span>
      </h5>
      <div class="card">
        <div class="card-body">
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="domain in domains"
              :key="domain.name"
            >
              <div class="row">
                <div class="col-md-6">{{ domain.name }}</div>
                <div class="col-md-3">
                  <span v-if="domain.available" class="badge badge-success"
                    >Disponível</span
                  >
                  <span v-else class="badge badge-danger">Indisponível</span>
                </div>
                <div class="col-md-3 text-right">
                  <button class="btn btn-info mr-1" @click="openDomain(domain)">
                    <span class="fa fa-search"></span>
                  </button>
                  <a
                    class="btn btn-info"
                    :href="domain.checkout"
                    target="_blank"
                  >
                    <span class="fa fa-shopping-cart"></span>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppItemList from "./AppItemList";

export default {
  name: "app",
  components: {
    AppItemList
  },
  data: () => {
    return {};
  },
  computed: {
    ...mapState(["items", "domains"])
  },
  methods: {
    ...mapActions(["addItem", "deleteItem", "getItems", "generateDomains"]),

    openDomain(domain) {
      this.$router.push({
        path: `/domains/${domain.name}`
      });
    }
  },
  created() {
    Promise.all([this.getItems("prefix"), this.getItems("sufix")]).then(() => {
      this.generateDomains();
    });
  }
};
</script>

<style>
#slogan {
  margin-top: 30px;
  margin-bottom: 30px;
}
#main {
  background-color: #f1f1f1;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
