<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" v-model="value" placeholder="在这里添加备注">
    </label>
  </div>    
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Watch} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    value = '';

    @Watch('value')
    onValueChanged(value:string){
      this.$emit('update:value',value)
    }
  }
</script>

<style lang="scss" scoped>
  .notes {
    padding-left: 16px;
    display: flex;
    align-items: center;
    font-size: 14px;
    background: #f5f5f5;
    .name {
      padding-right: 16px;
    }
    input {
      flex-grow: 1;
      line-height: 64px;
      padding-right: 16px;
      border: none;
      background: transparent;
    }
  }
</style>