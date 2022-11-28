<template>
  <Layout>
    <Tabs :data-source="recordTypeList" :value.sync='type' class-prefix="type" />
    <Tabs :data-source="intervalList" :value.sync='interval' class-prefix="interval" />
    <div>
      type: {{type}}
      <br/>
      interval: {{interval}}
    </div>
  </Layout>
</template>

<script lang="ts">
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue{
    intervalList = intervalList;
    recordTypeList = recordTypeList;
    type = '-';
    interval = 'day';
  }
</script>

<style scoped lang="scss">
  ::v-deep {
    .type-tabs-item {
      background: #FFF;
      &.selected {
        background: #C4C4C4;
        &::after {
          display: none;
        }
      }
    }
    .interval-tabs-item {
      height: 48px;
    }
  }


</style>