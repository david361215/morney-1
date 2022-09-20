<template>
  <button class="button" @click="$emit('click',$event)">
    <slot/>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component
  export default class Button extends Vue{

  }
</script>

<style lang="scss" scoped>
  .button {
    line-height: 40px;
    padding:0 17px;
    border: none;
    border-radius: 4px;
    background: #767676;
    color: #fff;
  }
</style>