<template>
  <div>
    <div class="container">
      <router-link to="/domains">Voltar</router-link>
      <br />
      <br />
      <div class="text-left">
        <h2>{{ domain }}</h2>
      </div>
      <div class="card">
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item" v-for="domain in domains" :key="domain.extension">
              <div class="row">
                <div class="col-md-6">{{ domain.extension }}</div>
                <div class="col-md-3">
                  <span v-if="domain.available" class="badge badge-success">Disponível</span>
                  <span v-else class="badge badge-danger">Indisponível</span>
                </div>
                <div class="col-md-3 text-right">
                  <a class="btn btn-info" :href="domain.checkout" target="_blank">
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
import axios from "axios";

export default {
  props: ["domain"],
  data() {
    return {
      domains: []
    };
  },
  created() {
    axios({
      url: "http://localhost:3000",
      method: "post",
      data: {
        query: `
          mutation($name: String) {
            domains: generateDomain(name: $name){
              name
              extension
              checkout
              available
            }
          }
        `,
        variables: {
          name: this.domain
        }
      }
    }).then(res => {
      const { data } = res.data;
      const { domains } = data;
      this.domains = domains;
    });
  }
};
</script>