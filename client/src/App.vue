<template>
  <div>
    <div id="slogan">
      <h1 class="text-center">NameGator</h1>
      <h6 class="text-secondary text-center">Gerador de nomes utilizando Vue js, graphql e node js</h6>
    </div>
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

export default {
  name: "app"
};
</script>

<style>
</style>
