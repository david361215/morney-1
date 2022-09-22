<template>
  <div>
    <label class="formItem">
      <span class="name">{{fieldName}}</span>
      <input 
        type="text" 
        :value="value" 
        :placeholder="placeholder"
      >
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Prop,Watch} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue {
    @Prop({default: ''}) readonly value!: string;
    @Prop ({required: true}) fieldName!: string;
    @Prop () placeholder?: string;
  }
</script>

<style lang="scss" scoped>
  .formItem {
    padding-left: 16px;
    display: flex;
    align-items: center;
    font-size: 14px;
    .name {
      padding-right: 16px;
    }
    input {
      flex-grow: 1;
      line-height: 40px;
      padding-right: 16px;
      border: none;
      background: transparent;
    }
  }
</style>