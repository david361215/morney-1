<template>
  <div>
    <label class="formItem">
      <span class="name">{{this.fieldName}}</span>
      <input type="text" v-model="value" :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Prop,Watch} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue {
    value = '';
    @Prop ({required: true}) fieldName!: string;
    @Prop () placeholder?: string;
    
    @Watch('value')
    onValueChanged(value:string){
      this.$emit('update:value',value)
    }
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