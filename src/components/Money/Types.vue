<template>
  <div>
    <ul class="types">
      <li :class="value === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="value === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Prop} from 'vue-property-decorator';

  @Component
  export default class Types extends Vue {
    @Prop() readonly value!: string;
    
    selectType(type: string) {
      if(type !== '-' && type !== '+') {
        throw new Error('type is unknown');
      }
      this.$emit('update:value', type)
    }
  }
</script>

<style lang="scss" scoped>
  .types {
    display: flex;
    background: #c4c4c4;
    font-size: 24px;
    text-align: center;
    li {
      position: relative;
      width: 50%;
      line-height: 64px;
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