<template>
  <ul class="tabs">
    <li v-for = " item in dataSource" :key="item.value" 
    @click="select(item)"
    class="tabs-item"
    :class="liClass(item)">
    {{item.text}}
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from "vue/";
  import {Component,Prop} from "vue-property-decorator";

  type DataSourceItem = { text: string, value: string }

  @Component
  export default class Tabs extends Vue {
    @Prop({required: true, type: Array}) 
    dataSource!: DataSourceItem[];
    @Prop(String) readonly value!: string;
    @Prop(String) classPrefix?: string;

    liClass(item: DataSourceItem){
      return {
        'selected': this.value === item.value,
        [this.classPrefix + '-tabs-item']: this.classPrefix 
      };
    }

    select(item: DataSourceItem){
      this.$emit('update:value',item.value)
    }
  }
</script>

<style lang="scss" scoped>
  .tabs {
    display: flex;
    background: #c4c4c4;
    font-size: 24px;
    text-align: center;
    &-item {
      position: relative;
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      &.selected::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 4px;
        background: #333;
      }
    }
  }
</style>